import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "remote-redux-devtools";
import pageReducer from "./reducers/pageReducer";

const rootReducer = combineReducers({
  page: pageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
