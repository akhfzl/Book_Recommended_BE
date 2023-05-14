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
        email: String
        civility: String
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
    input BookInputPagination{
        limit: Int 
        page: Int
    }
    input BookInputFilter{
        book_title: String 
        book_author: String 
    }
    type book_recommender{
        _id: ID
        image_url_m: String
        book_author: String
        book_title: String
        image_url_l: String
        publisher: String
        year_publication: Int
        category_type: String
        ISBN: String
        count_document: String 
    }
    type responseBookRecommended{
        book_default: [book_interests]
        book_history: [bookHistory]
        book_recommender: [book_recommender]
    }
    extend type Query{
        queries: String
        GetOneStudent: Student
        GetAllBooks(filter: BookInputFilter, pagination:BookInputPagination): [book_recommender]
    }

    enum studentCivility {
        Mr
        Mrs
    }

    input studentInput {
        email: String 
        civility: studentCivility
        first_name: String 
        last_name: String 
        psw_str: String 
    }

    enum dashboardEnum{
        sains
        soshum
        general 
    }

    input dashboardInput{
        category: dashboardEnum
    }

    type countType {
        count_general: Int 
        count_sains: Int 
        count_soshum: Int
    }

    type outputDashboard{
        title: String
        title_cleaning: String
        counts: countType
    }

    extend type Query{
        dashboardAPI(filter: dashboardInput): [outputDashboard]
    }

    extend type Mutation{
        BookRecomended: responseBookRecommended
        updateAllPassword: String
        studentLogin(email: String, password: String): Auth
        AddBookRecommendation(book_id: ID, book_name: String): [book_interests]
        DeleteABook(book_name: String): [book_interests]
        UpdateStudentProfile(input_student_data: studentInput): Student
        forgetPassword(input_student_data: studentInput): String
    }
`