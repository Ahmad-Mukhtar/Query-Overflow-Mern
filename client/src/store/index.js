import { createStore, applyMiddleware, compose } from "redux";
// import {createStore} from 'react-redux
import reduxThunk from "redux-thunk";
import reducer from "./reducers";

// ==============================|| REDUX - MAIN STORE ||============================== //
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export { store };
