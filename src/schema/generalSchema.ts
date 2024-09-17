import { mergeTypeDefs } from '@graphql-tools/merge';
import { authenticationSchema } from './authenticationSchema';
import { cartSchema } from './cartSchema';
import { orderSchema } from './orderSchema';
import { productSchema } from './productSchema';

export const typeDefs = mergeTypeDefs([
    authenticationSchema, 
    cartSchema,
    orderSchema, 
    productSchema,
]);