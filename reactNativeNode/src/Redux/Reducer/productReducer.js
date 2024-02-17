import {
  ADD_TO_CART,
  GET_PRODUCT_DATA,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from '../../helper/actionTypes';

const INITIAL_STATE = {
  productData: [],
  cart: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_PRODUCT_DATA:
      return {...state, productData: payload};
    case ADD_TO_CART:
      const existingProductIndex = state.cart.findIndex(
        item => item.id === payload.id,
      );
      if (existingProductIndex !== -1) {
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.totalPrice + payload.price,
            };
          }
          return item;
        });
        return {...state, cart: updatedCart};
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {...payload, quantity: 1, totalPrice: payload.price},
          ],
        };
      }
    case REMOVE_FROM_CART:
      return {...state, cart: state.cart.filter(item => item.id !== payload)};
    case UPDATE_QUANTITY:
      const updatedCart = state.cart.map(item =>
        item.id === payload.productId
          ? {...item, quantity: payload.quantity}
          : item,
      );
      return {...state, cart: updatedCart};
    default:
      return state;
  }
};

export default productReducer;
