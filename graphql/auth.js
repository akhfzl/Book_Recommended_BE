const {ApolloError } = require('apollo-server-express')
const StudentModel = require('./students/student.model');
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function auth(res, parent, args, ctx){
    try{
        let token = ctx.req.get('Authorization');
        if(!token) throw new ApolloError('Masukkan token');
        token = token.replace('Bearer ', '');
        const verify = jwt.verify(token, process.env.SECRET_TOKEN);
        const student = await StudentModel.findOne({_id: verify._id, email: verify.email});
        if(!student) throw new ApolloError('Pelajar tidak dikenali');
        ctx.user = student;
        ctx.token = token;
        return res()
    }catch(e){
        throw new ApolloError('Pelajar tidak memiliki autorisasi')
    }
}

module.exports = {
    Mutation: {
        UpdateBookToStudent: auth,
        DeleteABook: auth,
        AddBookRecommendation: auth,
        BookRecomended: auth,
        UpdateStudentProfile: auth 
    },
    Query: {
        queries: auth,
        GetOneStudent: auth,
        GetAllBooks: auth
    }
}