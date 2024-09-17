# Tiny Store - GraphQL Challenge

This project is part of a **GraphQL Challenge**, built using **Node.js** and **Express**. It demonstrates the creation of a basic GraphQL API with mock data, using the Apollo Server, and several tools from the GraphQL ecosystem.

## Technologies Used

- **Node.js**: A JavaScript runtime for building the server-side logic.
- **Express**: A minimal web framework for Node.js.
- **GraphQL**: Query language for APIs to handle data fetching.
- **Apollo Server**: A library to simplify building a GraphQL server in Node.js.
- **TypeScript**: Provides static typing for JavaScript, used for development.
- **Nodemon**: Automatically restarts the application when changes are detected in development mode.

## Features

- Mock data responses for GraphQL queries and mutations.
- Apollo Server integration with Express.
- Basic CRUD operations for a simple store using GraphQL.
- Development environment setup with TypeScript and nodemon for easy testing and development.

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16+ recommended)
- **npm** (Node package manager)

### Setup

1. Clone this repository and navigate to the project folder:

   ```bash
   git clone <repository_url>
   cd tiny-store
   ```
2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run start:dev
    ```
  
 Open the URL that appears in the console (usually http://localhost:4000/) in your browser to access the GraphQL playground, where you can test available queries and mutations.

## Available Scripts
npm start: Starts the server in production mode.
npm run start:dev: Starts the server in development mode with live reloading (using nodemon).
Example Queries
Once the server is running, you can use the GraphQL playground to test mock data. Some example queries:

    # Example query for fetching orders
    query {
      orders(filter: { status: "pending", page: 1, limit: 10 }) {
        pagination {
          page
          limit
          totalItems
          totalPages
        }
        orders {
          id
          status
          total
          user {
            id
            name
          }
          orderLines {
            productQuantity
            pricePerItem
            subTotal
            product {
              name
            }
          }
        }
      }
    }

## License
This project is licensed under the ISC License.
