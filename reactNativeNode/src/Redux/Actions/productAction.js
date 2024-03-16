import {
  ADD_TO_CART,
  GET_PRODUCT_DATA,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  apiEndPoints,
} from '../../helper/actionTypes';
import {makeAPIRequest} from '../../helper/apiGlobal';

export const getProductData = request => async dispatch => {
  return makeAPIRequest({
    method: 'GET',
    url: apiEndPoints.product_data,
  })
    .then(response => {
      if (request.onSuccess) request.onSuccess(response?.data);
      dispatch({type: GET_PRODUCT_DATA, payload: response?.data});
    })
    .catch(error => {
      if (request.onFail) request.onFail(error);
    });
};

export const get_product_data = request => async dispatch => {
  return makeAPIRequest({
    method: 'GET',
    url: apiEndPoints.getAllTours,
  })
    .then(response => {
      if (request.onSuccess) request.onSuccess(response?.data);
      // dispatch({type: GET_PRODUCT_DATA, payload: response?.data});
    })
    .catch(error => {
      if (request.onFail) request.onFail(error);
    });
};

export const addToCart = product => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = productId => async dispatch => {
  dispatch({type: REMOVE_FROM_CART, payload: productId});
};

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: {productId, quantity},
});
