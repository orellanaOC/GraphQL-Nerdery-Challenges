import { gql } from 'apollo-server-express';

export const typeDefs = gql(`
    # Enum Types
    enum Role {
        client
        manager
    }

    # Types
    type User {
        id: ID!
        role: Role!
        name: String!
        email: String!
        shoppingCart: String
        createdAt: String!
        updatedAt: String!
    }

    # Queries
    type Query {
        users: [User!]!
    }
`);
