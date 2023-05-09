const studentModel = require("./student.model");
const { BookModel, SubjectModel, BookRecommenderModel } = require("../subjects/subjects.model");
const { RunScriptPython, randomArray, randomArrays } = require('./student.utilities');

const Moment = require('moment')
const { hash, compare } = require("bcrypt");
const { ApolloError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function queries(args, parent, context) {
  let saintech = ['dummies', 'dummy', 'html', 'css', 'js', 'framework','analys', 'herbal','relativity','develop','robot','Extrasensory','Psycho', 'Disease','Medical', 'Aids','Computers', 'Computer', 'Math', 'unix','Technology', 'Math', 'Health', 'Computa', 'Probabil','latex','Physical','computer','Astronomi','radiograph','Math','syndrome','Big data', 'mining', 'Chemistry','Discoveries' ,'Geometry','chemistry','Engineering', 'Cancer', 'geograph','network','Animals','Electronic', 'Physi', 'forensic','Brainwashing', 'clinic','Memori', 'memory', 'climate','Nuclear', 'Alchemy', 'Liquid', 'Techno', 'Distraction', 'astronaut','Archi', 'Database', 'Data', 'programming', 'earth']
  let soshum = ['police','Law', 'Bussines', 'e-commerce', 'e-commercial', 'social', 'history', 'art', 'economic', 'Holocaust', 'Advertis', 'finance', 'market', 'Bankers', 'Politic', 'Physiology','human', 'adapt', 'histories', 'literature', 'graphic', 'Biographies', 'Biography', 'Relationship', 'financial', 'cultur', 'war', 'manage','sale', 'seller', 'design', 'government', 'philosoph', 'issue', 'Hieroglyphic', 'translat', 'culture']
  let books = await BookRecommenderModel.find({ status: "active" });
  for (const book of books) {
    let setUpdate = {};
    const sains = saintech.some(val => book.book_title.match(new RegExp(val, 'i')))
    const social = soshum.some((val) => book.book_title.match(new RegExp(val, "i")));
    if (sains) {
      setUpdate = {
        category_type: "sains-tech",
      };
      console.log("sains");
      await BookRecommenderModel.updateOne({ _id: book._id, status: "active" }, { $set: setUpdate });
    } else if (social) {
      setUpdate = {
        category_type: "social-humanaria",
      };
      console.log("soshum");
      await BookRecommenderModel.updateOne({ _id: book._id, status: "active" }, { $set: setUpdate });
    } else {
      setUpdate = {
        category_type: "general",
      };
      console.log("general");
      await BookRecommenderModel.updateOne({ _id: book._id, status: "active" }, { $set: setUpdate });
    }
  }

  return "halo";
}

async function BookRecomended(parent, args, context){
  let runScript
  let book_history;
  let book_default = [];
  let studentLogin = await studentModel.findById(context.user._id);
  let subject = await SubjectModel.find({rncp_title:studentLogin.rncp_title}).select('books');

  if(studentLogin.book_interest && studentLogin.book_interest.length){
    book_history = studentLogin.book_interest;
  }
  if (subject && subject.length){
    for(const sub of subject){
      for(const book of sub.books){
        let obj = {}
        const bookData = await BookModel.findOne({status:'active', _id: book.book_id});
        if(bookData){
          obj.title = book.title
          obj.book_id = book.book_id 
          book_default.push(obj)
        }
      }
    }
  }else {
    throw new ApolloError('Tidak ada buku yang perlu di rekomendasi')
  }
  if(!book_history){
    book_default = await randomArrays(book_default)
    runScript = await RunScriptPython('test.py', book_default[0].title);
  }else{
    runScript = await RunScriptPython('test.py', book_history[0].title);
  }
  if(!runScript){
    throw new ApolloError('Rekomendasi gagal')
  }

  let book_recommender = await BookRecommenderModel.find({status:'active', category_type: runScript}).lean();
  book_recommender = await randomArrays(book_recommender);
  book_recommender = book_recommender.slice(0, 5)
  return {
    book_default: book_default ? book_default : [],
    book_history: book_history ? book_history : [],
    book_recommender
  }
}

async function updateAllPassword(parent, args, context) {
  let total = await studentModel.countDocuments({ status: "active" });
  let limit = 100;
  let pages = Math.ceil(total / limit);
  let totalUpdate = 0;

  for (let studIndex = 0; studIndex <= pages; studIndex++) {
    let students = await studentModel
      .find({ status: "active" })
      .skip(limit * studIndex)
      .limit(limit)
      .lean();
    for (const student of students) {
      student.psw_str = `student-${Math.floor(Math.random() * students.length)}`;
      student.psw_hash = await hash(student.psw_str, 10);
      await studentModel.findByIdAndUpdate(student._id, { $set: student });
      totalUpdate += 1;
    }
    console.log(totalUpdate);
    if (totalUpdate === 400) {
      break;
    }
  }
  return `Done, ${totalUpdate} is updated`;
}

async function studentLogin(parent, { email, password }, context) {
  const student = await studentModel.findOne({ email, status: "active" });

  if (!student) {
    throw new ApolloError("Pelajar tidak memiliki autentikasi");
  }

  const token = jwt.sign(
    {
      _id: student._id,
      email: student.email,
    },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "1d",
    }
  );

  const passwordValidation = await compare(password, student.psw_hash);

  if (passwordValidation) {
    return {
      token,
      user_id: student._id,
    };
  } else {
    throw new GraphQLError("Password salah");
  }
}

async function DeleteABook(parent, { book_name }, ctx) {
  if (!book_name) {
    throw new ApolloError("Parameter buku perlu untuk menghapus buku.");
  }

  const books = await studentModel.findOneAndUpdate(
    { _id: ctx.user._id },
    {
      $pull: {
        book_interest: {
          title: book_name,
        },
      },
    },
    { new: true }
  );
  return books.book_interest;
}

async function GetOneStudent(parent, args, ctx){
  const student = await studentModel.findById(ctx.user._id)
  if(!student){
    throw new ApolloError('Token sudah kadaluarsa')
  }
  let subject = await SubjectModel.find({rncp_title: student.rncp_title, status: 'active'}).select('subject_name');
  subject = subject.map(sub => sub.subject_name)
  return {
    first_name: student.first_name,
    last_name: student.last_name,
    full_name: `${student.civility ? student.civility : ''} ${student.first_name ? student.first_name: ''} ${student.last_name ? student.last_name : ''}`,
    subjects: subject && subject.length ? subject : [],
    rncp_title: student.rncp_title ? student.rncp_title : '',
    email: student.email ? student.email : '',
    civility: student.civility ? student.civility: ''
  }
}

async function AddBookRecommendation(parent, { book_name, book_id }, ctx) {
  if (!book_name || !book_id) {
    throw new ApolloError("Parameter book_id atau book_name diperlukan");
  }

  let book_input = {
    book_id,
    title: book_name,
    createdAt: new Date(),
  };

  const books = await studentModel.findOneAndUpdate(
    { _id: ctx.user._id },
    {
      $push: {
        book_interest: book_input,
      },
    },
    {
      new: true,
    }
  );

  return books.book_interest;
}

async function GetAllBooks(parent, {filter, pagination}, ctx){
  let aggregateQuery = []
  let queryFilter = {$match: {$and: [{status: 'active'}]}}
  if(filter && filter.book_title){
    queryFilter.$match.$and.push({
      book_title: {
        $regex: new RegExp(filter.book_title, 'i')
      }
    })
  }
  if(filter && filter.book_author){
    queryFilter.$match.$and.push({
      book_author: {
        $regex: new RegExp(filter.book_author, 'i')
      }
    })
  }

  aggregateQuery.push(queryFilter, {$sort: {book_title:1}});
  if(pagination){
    aggregateQuery.push({
      $facet: {
        data: [{ $skip: pagination.limit * pagination.page }, { $limit: pagination.limit }],
        countData: [{ $group: { _id: null, count: { $sum: 1 } } }],
      },
    });
    let books = await BookRecommenderModel.aggregate(aggregateQuery).collation({ locale: 'fr_CA' }).allowDiskUse(true);

    return books[0].data.map((task) => {
      return {
        ...task,
        count_document: books[0].countData[0].count,
      };
    });
  }else{
    return await BookRecommenderModel.aggregate(aggregateQuery).collation({ locale: 'fr_CA' }).allowDiskUse(true);
  }
}

async function UpdateStudentProfile(parent, {input_student_data}, ctx){
  if(input_student_data){
    let inputProvider = {}
    if(input_student_data.email){
      inputProvider.email = input_student_data.email
    }
    if(input_student_data.civility){
      inputProvider.civility = input_student_data.civility
    }
    if(input_student_data.first_name){
      inputProvider.first_name = input_student_data.first_name
    }
    if(input_student_data.last_name){
      inputProvider.last_name = input_student_data.last_name
    }
    if(input_student_data.psw_str){
      inputProvider.psw_str = input_student_data.psw_str 
      inputProvider.psw_hash = await hash(input_student_data.psw_str, 10)
    }

    const updateStudent = await studentModel.findOneAndUpdate({status:'active', _id: ctx.user._id}, {$set: inputProvider}, {new: true})
    return updateStudent
  } else {
    throw ApolloError('Tidak ada data yang diinput untuk di update')
  }
}

async function forgetPassword(parent, {input_student_data}, ctx){
  try{
    let obj = {}
    
    if(input_student_data && !input_student_data.email){
      throw new ApolloError('Email dibutuhkan untuk identifikasi')
    }

    const findEmail = await studentModel.findOne({status:'active', email: input_student_data.email});
    if(!findEmail){
      throw new ApolloError('Email tidak ditemukan')
    }
    
    if(input_student_data && input_student_data.psw_str){
      obj.psw_str = input_student_data.psw_str 
      obj.psw_hash = await hash(input_student_data.psw_str, 10)
    }

    await studentModel.findOneAndUpdate({status:'active', email:input_student_data.email}, {$set: obj});
    return 'Password berhasil update'
  }catch(e){
    console.log(e)
    throw new ApolloError('Kesalahan sistem update data')
  }
}

//loader
async function book_loaders(parent, args, ctx){
  if(parent.book_id){
    return await ctx.bookDefault.load(parent.book_id)
  }
}

async function book_recommends(parent, args, ctx){
  if(parent.book_id){
    return await ctx.bookRecommend.load(parent.book_id)
  }
}

module.exports = {
  Query: {
    queries,
    GetOneStudent,
    GetAllBooks
  },
  Mutation: {
    BookRecomended,
    updateAllPassword,
    studentLogin,
    DeleteABook,
    AddBookRecommendation,
    UpdateStudentProfile,
    forgetPassword
  },
  book_interests: {
    book_id: book_loaders
  },
  bookHistory: {
    book_id: book_recommends
  }
};
