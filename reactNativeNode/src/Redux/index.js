import {createStore, applyMiddleware, combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import productReducer from './Reducer/productReducer';

const rootReducer = combineReducers({
  productData: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export {store};
