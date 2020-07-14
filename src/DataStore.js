import todoReducer from "./Reducers";
import { createStore, applyMiddleware, compose  } from "redux";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(todoReducer, storeEnhancers(applyMiddleware(thunk)));
export default store;