import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import profileReducer from "./profile";
import matchesReducer from "./match";
import conversationReducer from "./conversation";
import messageReducer from "./message";

const rootReducer = combineReducers({
  session,
  profiles: profileReducer,
  matches: matchesReducer,
  conversations: conversationReducer,
  messages: messageReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
