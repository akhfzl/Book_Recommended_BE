const StudentModel = require('../students/student.model');
const { SubjectModel, BookModel } = require('./subjects.model');
const subjectUtilities = require('./subjects.utilities');
const fs = require('fs');
const moment = require('moment');

async function UpdateBookToStudent(parent, args, ctx){
    const books = await BookModel.distinct('title')
    const rncp_title = await StudentModel.distinct('rncp_title',{status:'active', rncp_title: {$ne: null} ,$and: [{ psw_string: {$ne: null}, psw_string: {$eq: null}}]})
    const subjects = await SubjectModel.find({status: 'active', rncp_title: { $in: rncp_title }})
    let count = 0;
    for(count; count <= subjects.length; count++){
        const random = Math.floor(Math.random() * books.length);
        const book = await BookModel.findOne({title: books[random]});
        if(!subjects[count].books || !subjects[count].books.length){
            await SubjectModel.updateOne({_id: subjects[count]._id}, { $set: { books: [{title: book.title, category: book.category, book_id: book._id }]}})
            console.log(count, `update -> ${subjects[count]._id}`, books[random])
        }
    }
    return 'Updated';
}

async function writeToCsv(parent, args, ctx){
    const subjects = await SubjectModel.distinct('rncp_title',{ books: {$not: {$size:0}}});
    const students = await StudentModel.countDocuments({rncp_title: {$in: subjects }});
    const limit = 500;
    const pages = Math.ceil(students/limit);
    let header = [
        'student_id',
        'student_name',
        'subject_name',
        'title',
        'category'
    ]

    let finalString = `${header.join(';')}\n`
    for(let count = 0; count <= pages; count++){
        const targets = await subjectUtilities.generateAggregateQuery(limit, count);
        for(const target of targets){
            finalString += `"${target._id}";`;
            finalString += `"${target.full_name}";`,
            finalString += `"${target.subject_name}";`,
            finalString += `"${target.title}";`,
            finalString += `"${target.category}";\n`;
        }
        console.log(`write ${count} of ${8800}`)
    }
    
    const fileName = `exportStudentBooks_${moment().utc().format('DD/MM/YYYY')}.csv`;
    fs.writeFileSync('../ML/dataset/' + fileName, '\uFEFF' + finalString, { encoding: 'utf-8' });
    return 'export success'
}

module.exports = {
    Mutation: {
        UpdateBookToStudent,
        writeToCsv
    }
}