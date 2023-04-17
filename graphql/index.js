//module
const { gql } = require('apollo-server-express');
const { merge } = require('lodash');

//feature
const students = require('./students/student.index');
const subjects = require('./subjects/subjects.index')
const rncp = require('./rncpTitle/rncp.index')

const typeDef = gql`
    type Query
    type Mutation
`

const typeDefs = [
    typeDef,
    students.typedef,
    subjects.typeDef,
    rncp.typedef
]


let resolvers = {};

resolvers = merge(
    resolvers,
    students.resolver,
    subjects.resolver,
    rncp.resolver
)

module.exports = { typeDefs, resolvers }