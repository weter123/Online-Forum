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

    union UserResult = User | EntityResult
    
    type Thread{
        id: ID!
        views: Int!
        isDisabled: Boolean!
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

    type ThreadArray {
        threads: [Thread!]
    }

    union ThreadArrayResult = ThreadArray | EntityResult
    
    type ThreadItem {
        id: ID!
        views: Int!
        isDisabled: Boolean!
        title: String!
        body: String!
        user: User!
        thread: Thread!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    
    type ThreadCategory {
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
        getThreadById(id: ID!): ThreadResult
        getThreadsByCategoryId(categoryId: ID!) : ThreadArrayResult!
        getThreadsLatest: ThreadArrayResult!
        getAllCategories: [ThreadCategory!]
        me: UserResult!
    }

    type Mutation {
        createThread(
            userId: ID!
            categoryId: ID!
            title: String
            body: String!
        ): EntityResult
        register(email: String!, userName: String!, password: String!): String!
        login(userName: String!, password: String!) : String!
        logout(userName: String!): String!
        updateThreadPoint(userId: ID!, threadId: ID!, increment: Boolean): String!
        updateThreadItemPoint(userId: ID!, threadItemId: ID!, increment: Boolean): String!
    }
    `;

export default typeDefs;
