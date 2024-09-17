import { gql } from 'apollo-server-express';

export const orderSchema = gql`
    ##################
    # Enum Types
    ##################
    """
    Enum representing the order status.
    """
    enum OrderStatus {
        pending
        paid
        rejected
    }

    ##################
    # Object Types
    ##################
    """
    Order object representing a specific order placed by a client.
    """
    type Order {
        """
        Unique identifier for the order.
        """
        id: ID!
        """
        User who placed the order.
        """
        user: User!
        """
        Current status of the order.
        """
        status: OrderStatus!
        """
        Total amount of the order.
        """
        total: Int!
        """
        List of order lines, representing the products in the order.
        """
        orderLines: [OrderLine!]!
        """
        Timestamp when the order was created.
        """
        createdAt: String!
    }

    """
    An order line representing a product and its details within an order.
    """
    type OrderLine {
        """
        Product associated with the order line.
        """
        product: Product!
        """
        Quantity of the product ordered.
        """
        productQuantity: Int!
        """
        Price per item of the product.
        """
        pricePerItem: Int!
        """
        Subtotal for the product line.
        """
        subTotal: Int!
        """
        Timestamp when the order line was created.
        """
        createdAt: String!
    }

    ##################
    # Input Types
    ##################
    """
    Input type for filtering orders by status and pagination.
    """
    input OrderFilter {
        """
        Filter orders by their current status.
        """
        status: OrderStatus
        """
        The page number for pagination.
        """
        page: Int!
        """
        The number of items per page.
        """
        limit: Int!
    }

    ##################
    # Response Types
    ##################
    """
    Response type for an order.
    """
    type OrderResponse {
        order: Order
        "User-friendly error message if applicable"
        errorMessage: String
    }

    type OrderListResponse {
        """
        Pagination metadata for the order list.
        """
        pagination: PaginationResponse
        """
        The list of orders that match the filter criteria.
        """
        data: [Order]
        "User-friendly error message if applicable"
        errorMessage: String
    }

    ##################
    # Queries
    ##################
    """
    Retrieve a list of orders, optionally filtered by status, with pagination.
    Orders are ordered by the creation date from most recent to oldest.
    """
    type Query {
        """
        Get all orders with optional filtering by status.
        Managers can access all orders, while clients can only access their own orders.
        """
        orders(filter: OrderFilter!): OrderListResponse!
        """
        Retrieve details of a specific order by its unique identifier.
        """
        order(id: Int!): OrderResponse!
    }

    ##################
    # Mutations
    ##################

    type Mutation {
        """
        Process a checkout for a user's cart.
        Finalizes the purchase process for the items in the user's cart and processes payment using Stripe.
        """
        processCheckout: OrderResponse!
    }
`;

export const orderMocks = {
    // Mock data for Types
    OrderLine: () => ({
        productQuantity: 13,
        pricePerItem: 1999,
        subTotal: 5997,
        createdAt: '2024-09-18T12:00:00Z',
        product: {},
    }),

    Order: () => ({
        id: 3,
        user: {},
        status: 'pending',
        total: 5997,
        createdAt: '2024-09-18T12:00:00Z',
        orderLines: [...new Array(2)],
    }),

    // Mock data for Responses
    OrderListResponse: () => ({
        pagination: () => {},
        data: [...new Array(2)],
        errorMessage: () => null,
    }),

    OrderResponse: () => ({
        order: {},
        errorMessage: () => null,
    }),
    
    // Mock data for Mutations
    Mutation: () => ({
        processCheckout: () => {},
    }),

    // Mock data for Queries
    Query: () => ({
        order: () => {},
        orders: () => {},
        myOrders: () => {},
    }),
};