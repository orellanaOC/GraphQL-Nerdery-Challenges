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
        "Whether the product is enabled or not"
        enable: Boolean!
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

    type ProductCreated {
        "Unique identifier for the product"
        id: ID!
        "Name of the product"
        name: String!
        "Whether the product is enabled or not"
        enable: Boolean!
        "Price of the product in cents"
        price: Int!
        "Number of units available in stock"
        stock: Int!
        "Description or additional information about the product"
        specification: String
        "Category to which the product belongs"
        category: Category
    }
    
    type Image {
        id: ID!
        productId: ID!
        imageUrl: String!
        createdAt: String
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

    input ProductInput {
        "Name of the product"
        name: String!
        "Price of the product in cents"
        price: Int!
        "Number of units available in stock"
        stock: Int!
        "Description or additional information about the product"
        specification: String
        "Category to which the product belongs"
        category: CategoryInput!
    }

    input ProductToUpdateInput {
        "Unique identifier for the product"
        id: ID!
        "Name of the product"
        name: String
        "Whether the product is enabled or not"
        enable: Boolean!
        "Price of the product in cents"
        price: Int
        "Number of units available in stock"
        stock: Int
        "Description or additional information about the product"
        specification: String
        "Category to which the product belongs"
        category: CategoryInput
    }

    """
    Input type representing an image encoded as a base64 string for upload purposes.
    """
    input Base64ImageInput {
        "The filename of the image, including its extension (e.g., image.jpg, photo.png)."
        filename: String!
        """
        The image content encoded as a base64 string. The string should start with the appropriate prefix, such as 'data:image/jpeg;base64,' or 'data:image/png;base64,'.
        """
        content: String! # Base64 encoded string
    }

    """
    Input type used for uploading one or more base64 encoded images to a specified product.
    """
    input UploadImageInput {
        "The unique identifier of the product for which the images will be uploaded."
        productId: ID!

        """
        An array of Base64ImageInput objects, representing the images to be uploaded.
        """
        images: [Base64ImageInput]!
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

    """
    Pagination metadata for paginated results.
    """
    type PaginationResponse {
        """
        Current page number.
        """
        page: Int!
        """
        Limit of items per page.
        """
        limit: Int!
        """
        Total number of items.
        """
        totalItems: Int!
        """
        Total number of pages.
        """
        totalPages: Int!
    }

    type ProductResponse {
        product: ProductCreated
        errorMessage: String
    }

    type LikeResponse {
        user: User
        product: Product
        status: String
        message: String
        errorMessage: String
    }

    ##################
    # Queries
    ##################
    type Query {
        products(filter: ProductFilterInput!): ProductsListResponse!
        product(identifier: Int!): Product!
    }

    ##################
    # Mutations
    ##################

    type Mutation {
        createProduct(product: ProductInput!): ProductResponse!
        updateProduct(product: ProductToUpdateInput!): Product!
        deleteProduct(id: Int!): AuthResponse!
        likeProduct(id: Int!): LikeResponse!
        uploadProductImages(input: UploadImageInput!): Product!
    }
`;

export const productMocks = {
    // Mock data for Types
    Product: () => ({
        id: () => '1',
        name: () => 'Product A',
        enable: () => true,
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

    ProductCreated: () => ({
        id: () => '1',
        name: () => 'Product A',
        enable: () => true,
        price: () => 1999,
        stock: () => 100,
        specification: () => 'Description of Product A',
        category: {
            id: 2,
            name: 'Fertilizers'
        },
    }),

    Base64ImageInput: () => ({
        filename: 'image1.jpg',
        content: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wCEAAkGBxISEBAQEhISEA8QDw8PFRAPDw8QDxAPFREWFhURExUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0mICYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAIAA4QMBIgACEQEDEQH/xAAbAAEBAAEFAAAAAAAAAAAAAAABAgMEBQYAB//EADoQAAIBAwIEAwUFBAcAAAAAAAECAwAEEQUSITFBEyJRYQYykaGxM0KhsSNC8BUjU5KxM2JzgqLS4UOC... (base64 string continues)'
    }),

    // Mock data for Inputs
    ProductInput: () => ({
        name: () => 'John Doe',
        price: () => '1999',
        stock: () => '30',
        specification: () => 'lorem ipsum',
        category: {
            id: 1,
            name: 'Fertilizers'
        },
    }),

    ProductToUpdateInput: () => ({
        id: () => '1',
        name: () => 'Product A',
        enable: () => true,
        price: () => 1999,
        stock: () => 100,
        specification: () => 'Description of Product A',
        category: {
            id: 2,
            name: 'Fertilizers'
        },
    }),

    UploadImageInput: () => ({
        productId: '123',
        images: [...new Array(6)],
    }),

    // Mock data for Responses
    PaginationResponse: () => ({
        page: 2,
        limit: 2,
        totalItems: 60,
        totalPages: 20,
    }),

    ProductsListResponse: () => ({
        pagination: () => {},
        data: [...new Array(6)],
        errorMessage: () => null,
    }),

    ProductResponse: () => ({
        product: ({}),
        errorMessage: () => null,
    }),

    LikeResponse: () => ({
        user: ({}),
        product: ({}),
        status: "liked",
        message: "Product liked successfully",
        errorMessage: () => null
    }),

    // Mock data for Mutations
    Mutation: () => ({
        createProduct: () => ({}),
        updateProduct: () => ({}),
        deleteProduct: () => ({}),
    }),

    // Mock data for Queries
    Query: () => ({
        products: () => {},
        product: () => {},
    }),
};