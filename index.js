//module
const {
    ApolloServer
} = require('apollo-server-express');
const {
    applyMiddleware
} = require('graphql-middleware');
const {
    makeExecutableSchema
} = require('graphql-tools');
const {
    merge
} = require('lodash');
const mongoose = require('mongoose');
const exp = require('express');
const cors = require('cors');

//loader
const { bookDefault, bookRecommend } = require('./graphql/students/book.loader')
const { rncpTitleLoader } = require('./graphql/rncpTitle/rncp.loader')

require('dotenv').config();
mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vhhfocn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => console.log("Database connect")).catch((err) => console.log("Database disconnected"))

//graphql
const graphql = require('./graphql');
const auth = require('./graphql/auth')

let authMerge = {};
authMerge = merge(auth);

const app = exp()
app.use(cors());

//mongodb setup


const executeTableScheme = makeExecutableSchema({typeDefs: graphql.typeDefs, resolvers: graphql.resolvers});
const protectedSchema = applyMiddleware(executeTableScheme, authMerge)

const server = new ApolloServer({
    schema: protectedSchema,
    context: function ({
        req
    }) {
        req
        return {
            req,
            bookDefault,
            rncpTitleLoader,
            bookRecommend
        }
    }
})

app.listen(8000, ()=> {
    console.log(`App running on ${8000}`)
})
server.applyMiddleware({ app })