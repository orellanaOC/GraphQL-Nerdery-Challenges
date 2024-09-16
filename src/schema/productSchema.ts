import { gql } from 'apollo-server-express';

export const productSchema = gql`
    ##################
    # Object Types
    ##################
    type Category {
        "Unique identifier for the category"
        id: ID!
        "Name of the category"
        name: String!
    }

    type Picture {
        "Unique identifier for the picture"
        id: ID!
        "URL of the picture"
        imageUrl: String!
        "Timestamp when the picture was created"
        createdAt: String
    }

    type Product {
        "Unique identifier for the product"
        id: ID!
        "Name of the product"
        name: String!
        "Price of the product in cents"
        price: Int!
        "Number of units available in stock"
        stock: Int!
        "Description or additional information about the product"
        specification: String
        "Category to which the product belongs"
        category: Category
        "List of pictures associated with the product"
        pictures: [Picture]
    }

    ##################
    # Input Types
    ##################
    input CategoryInput {
        "Unique identifier for the category"
        id: ID!
        "Name of the category"
        name: String!
    }

    input ProductFilterInput { 
        "Page number for pagination (e.g., 1)"
        page: Int!
        "Number of products per page (e.g., 10)"
        limit: Int!
        "Optional filter for the category"
        category: CategoryInput
    }

    ##################
    # Response Types
    ##################
    type ProductsListResponse {
        "Contains pagination details"
        pagination: PaginationResponse
        "List of products returned by the query"
        data: [Product]
        "User-friendly error message if applicable (e.g., ~ No products found)"
        errorMessage: String
    }

    type PaginationResponse {
        page: Int!
        limit: Int!
        total: Int!
    }

    ##################
    # Queries
    ##################
    type Query {
        products(filter: ProductFilterInput!): ProductsListResponse!
    }

    ##################
    # Mutations
    ##################

    # type Mutation {
    # }
`;

export const productMocks = {
    // Mock data for Types
    Product: () => ({
        id: () => '1',
        name: () => 'Product A',
        price: () => 1999,
        stock: () => 100,
        specification: () => 'Description of Product A',
        category: () => ({
            id: 2,
            name: 'Fertilizers'
        }),
        pictures: () => [
            {
                id: '234',
                imageUrl: 'https://example.com/image1.jpg',
                createdAt: '2024-09-08T12:00:00Z',
            },
        ],
    }),
    
    Picture: () => ({
        id: () => '234',
        imageUrl: () => 'https://example.com/image1.jpg',
        createdAt: () => '2024-09-08T12:00:00Z',
    }),
    
    Category: () => ({
        id: () => '2',
        name: () => 'Fertilizers',
    }),

    // Mock data for Inputs


    // Mock data for Responses
    PaginationResponse: () => ({
        page: () => '2',
        limit: () => '2',
        total: () => '20',
    }),

    ProductsListResponse: () => ({
        pagination: {},
        data: () => [{}],
        errorMessage: () => null,
    }),

    // Mock data for Mutations
    Mutation: () => ({
        
    }),

    // Mock data for Queries
    Query: () => ({
        products: () => ({
            pagination: ({}),  
            data: [...new Array(6)],
            errorMessage: ({}), 
        }),
    }),
};