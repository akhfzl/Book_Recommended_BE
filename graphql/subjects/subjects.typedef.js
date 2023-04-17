const { gql } = require('apollo-server-express');

module.exports = gql`
    type books{
        title: String
        author: String
        google_id: String
        recommender: String
        recommender_count: Int
        category: String
        publication_date: Int
        pages: Int
        category_type: String 
        url_image: String
    } 
    extend type Mutation{
        UpdateBookToStudent: String
        writeToCsv: String
    }
`