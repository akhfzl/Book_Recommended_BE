const { gql } = require('apollo-server-express');

module.exports = gql`
    type Auth{
        token: String 
        user_id: ID
    }
    type Student{
        first_name: String
        last_name: String
        full_name: String
        rncp_title: rncpTitleType
        subjects: [String]
    }
    type book_interests{
        category: String
        title: String 
        book_id: books
    }
    type bookHistory{
        title: String 
        book_id: book_recommender
    }
    type book_recommender{
        image_url_m: String
        book_author: String
        book_title: String
        image_url_l: String
        publisher: String
        year_publication: Int
        category_type: String
        ISBN: String
    }
    type responseBookRecommended{
        book_default: [book_interests]
        book_history: [bookHistory]
        book_recommender: [book_recommender]
    }
    extend type Query{
        queries: String
        GetOneStudent: Student
    }

    extend type Mutation{
        BookRecomended: responseBookRecommended
        updateAllPassword: String
        studentLogin(email: String, password: String): Auth
        AddBookRecommendation(book_id: ID, book_name: String): [book_interests]
        DeleteABook(book_name: String): [book_interests]
    }
`