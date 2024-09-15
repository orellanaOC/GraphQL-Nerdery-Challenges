export const mocks = {
    User: () => ({
      id: () => '1', 
      role: () => 'client',
      name: () => 'John Doe',
      email: () => 'john.doe@example.com',
      shoppingCart: () => 'Mock shopping cart info',
      createdAt: () => new Date().toISOString(),
      updatedAt: () => new Date().toISOString(),
    }),

    Query: () => ({
      users: () =>  [...new Array(10)],
    }),
};  