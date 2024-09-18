import { gql } from 'apollo-server-express';

export const cartSchema = gql`
    ##################
    # Object Types
    ##################
    """
    Represents a line in the shopping cart, containing the product and its quantity.
    """
    type ShoppingCartLine {
        "The unique identifier of the shopping cart line."
        id: ID!
        "The quantity of the product in the cart."
        productQuantity: Int!
        "The product associated with this line in the cart."
        product: Product!
    }

    ##################
    # Response Types
    ##################
    """
    Response type containing the details of a shopping cart, including the cart ID and the list of items in the cart.
    """
    type CartDetailResponse {
        "The unique identifier of the cart."
        cartId: ID

        """
        A list of shopping cart lines, each containing the product and its quantity.
        """
        lines: [ShoppingCartLine]
        "User-friendly error message if applicable"
        errorMessage: String
    }

    ##################
    # Queries
    ##################

    """
    Retrieve the details of the authenticated user's shopping cart, including the list of products and their quantities.
    """
    type Query {
        """
        Get the details of the current user's cart, including the products and their quantities.
        """
        myCart: CartDetailResponse!
    }

    ##################
    # Mutations
    ##################

    type Mutation {
        addOrUpdateProductInCart(productId: ID!, quantity: Int!): CartDetailResponse!
    }
`;

export const cartMocks = {
    // Mock data for Types
    ShoppingCartLine: () => ({
        id: () => '123',
        productQuantity: 23,
        product: {},
    }),

    // Mock data for Responses
    CartDetailResponse: () => ({
        cartId: () => '123',
        lines: () => [...new Array(3)],
        errorMessage: () => null,
    }),

    // Mock data for Mutations
    Mutation: () => ({
        addOrUpdateProductInCart: () => ({}),
    }),

    // Mock data for Queries
    Query: () => ({
        myCart: () => ({}),
    }),
};