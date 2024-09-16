import { gql } from 'apollo-server-express';

export const orderSchema = gql`
    ##################
    # Enum Types
    ##################

    enum OrderStatus {
        pending
        reject
        success
    }

    ##################
    # Object Types
    ##################



    ##################
    # Input Types
    ##################



    ##################
    # Response Types
    ##################



    ##################
    # Queries
    ##################



    ##################
    # Mutations
    ##################

    # type Mutation {
    # }
`;

export const orderMocks = {
    // Mock data for Types


    // Mock data for Inputs


    // Mock data for Responses


    // Mock data for Mutations
    Mutation: () => ({
        
    }),

    // Mock data for Queries
    Query: () => ({
        
    }),
};