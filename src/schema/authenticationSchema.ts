import { gql } from 'apollo-server-express';

export const authenticationSchema = gql`
    ##################
    # Object Types
    ##################

    type User {
        "Unique identifier for the user, used as the primary key."
        id: ID!
        "Reference to the user's role, which can either be 'client' or 'manager'."
        role: Role!
        "Full name of the user."
        name: String!
        "Email address of the user, used for login and communication."
        email: String!
        "The shopping cart ID associated with the user, containing the products they are interested in purchasing."
        shoppingCartId: ID!
    }

    type Role {
        "Unique identifier for the role, used as the primary key."
        id: ID!
        "Name of the role, either 'manager' or 'client'. A 'manager' can manage products and orders, while a 'client' can browse and make purchases."
        name: String!
    }

    ##################
    # Response Types
    ##################

    type SignUpResponse {
        "Indicates whether the sign-up was successful"
        user: User        
        "User-friendly error message"
        errorMessage: String
    }

    type SignInResponse {
        "Indicates whether the sign-in was successful"
        user: User
        "The token issued for the authenticated user"
        token: String
        "User-friendly error message"
        errorMessage: String
    }

    type ForgotPasswordResponse {
        "Token generated to allow the user to reset their password."
        resetToken: String
        "The date and time when the reset password token will expire."
        expiresAt: String
        "User-friendly error message"
        errorMessage: String
    }

    type AuthResponse {
        "Indicates whether the authentication was successful"
        message: String
        "User-friendly error message"
        errorMessage: String
    }

    ##################
    # Mutations
    ##################

    type Mutation {
        "Sign Up (creates user and shopping cart)"
        signUp(name: String!, email: String!, password: String!): SignUpResponse!

        "Sign In (authenticates a user and returns a session token)"
        signIn(email: String!, password: String!): SignInResponse!  

        "Sign Out (invalidates the current user session based on the token provided in headers)"
        signOut: AuthResponse!           

        "Forgot Password (sends instructions to reset the password for the specified email)"
        forgotPassword(email: String!): ForgotPasswordResponse!  

        "Reset Password (resets the user's password using the reset token)"
        resetPassword(currentPassword: String!, newPassword: String!): AuthResponse!    

        "New Password (allows a logged-in user to set a new password)"
        newPassword(newPassword: String!): AuthResponse!     
    }
`;

export const authenticationMocks = {
    // Mock data for Types
    Role: () => ({
        id: () => '1',
        name: () => 'client',
    }),

    User: () => ({
        id: () => '1',
        role: () => ({
        id: '1',
        name: 'client'
    }),
        name: () => 'John Doe',
        email: () => 'john.doe@example.com',
        shoppingCartId: () => '1',
    }),

    // Mock data for Inputs
    SignUpInput: () => ({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
    }),

    SignInInput: () => ({
        email: 'john.doe@example.com',
        password: 'password123',
    }),

    ForgotPasswordInput: () => ({
        email: 'john.doe@example.com',
    }),

    NewPasswordInput: () => ({
        newPassword: 'newPassword123',
    }),

    ResetPasswordInput: () => ({
        currentPassword: 'currentPassword123',
        newPassword: 'newPassword123',
    }),

// Mock data for Responses
SignUpResponse: () => ({
    user: () => ({
        id: '1',
        role: {
            id: '1',
            name: 'client',
        },
        name: 'John Doe',
        email: 'john.doe@example.com',
        shoppingCartId: '1',
    }),
    errorMessage: () => null, 
}),

// SignUpResponseWithError: () => ({
//   user: () => null, 
//   errorMessage: () => 'The email address is already in use.', 
// }),

    SignInResponse: () => ({
    user: () => ({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: {
        id: '1',
        name: 'client',
        },
        shoppingCartId: '1',
    }),
    token: () => 'mock-token-123456',
    errorMessage: () => null,
    }),

    // Mock data for AuthResponse (for signOut, resetPassword, newPassword)
    AuthResponse: () => ({
        message: () => 'Action completed successfully.',
        errorMessage: () => null,
    }),

    ForgotPasswordResponse: () => ({
        resetToken: () => 'd4f5e6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y',
        expiresAt: () => '2024-09-11T12:34:56Z',
        errorMessage: () => `The email doesn't exist. Please choose a different email.`,
    }),

    // Mock data for Mutations
    Mutation: () => ({
        SignUp: () => ({}),
        signIn: () => ({}),
        signOut: () => ({}),
        forgotPassword: () => ({}),
        resetPassword: () => ({}),
        newPassword: () => ({}),
    }),
};