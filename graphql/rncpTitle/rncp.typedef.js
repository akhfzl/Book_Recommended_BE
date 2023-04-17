const { gql } = require('apollo-server-express');

module.exports = gql`
    type rncpTitleType {
        short_name: String
        long_name: String
        rncp_code: String
        rncp_level: String
    }
`