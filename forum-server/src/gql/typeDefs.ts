import { gql } from "apollo-server-express";

const typeDefs =gql `
    scalar Date
    
    type EntityResult {
        messages: [String!]
    }
    
    type User {
        id: ID!
        email: String!
        username: String!
        password: String!
        confirmed: Boolean!
        isDisabled: Boolean!
        threads: [Thread!]
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    
    type Thread{
        id: ID!
        views: Int!
        isDisabled: !Boolean
        title: String!
        body: String!
        user: User!
        threadItems: [ThreadItem!]
        category: ThreadCategory
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    
    union ThreadResult = Thread | EntityResult
    
    type ThreadItem {
        id: ID!
        views: Int!
        isDisabled: !Boolean
        title: String!
        body: String!
        user: User!
        thread: Thread!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    
    type Thread Category {
        id: ID!
        name: String!
        description: String
        threads: [Thread!]!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    
    type Query {
        getThreadVyId(id: ID!): ThreadResult
    }
    `;

export default typeDefs;