import { authenticationMocks } from './schema/authenticationSchema'
import { cartMocks } from './schema/cartSchema';
import { orderMocks } from './schema/orderSchema';
import { productMocks } from './schema/productSchema';

export const mocks = {
  ...authenticationMocks,
  // ...cartMocks,
  // ...orderMocks,
  ...productMocks,
};