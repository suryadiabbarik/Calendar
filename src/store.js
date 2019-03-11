import { combineReducers, createStore } from 'redux'
import * as reducers from './reducers';

const allReducers = combineReducers(reducers)

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const store = createStore(
//   reducer, /* preloadedState, */
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  );

export default store;