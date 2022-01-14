import {
  applyMiddleware, createStore, combineReducers, compose
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import global from './redux/global';

const middleware = [
  thunk,
];

if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger());
}

export default function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      global
    }),
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );
}