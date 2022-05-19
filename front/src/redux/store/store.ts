import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "remote-redux-devtools";
import userReducer from "./reducers/userReducer";
import localisationReducer from "@/redux/store/reducers/localisationReducer";

const rootReducer = combineReducers({
  user: userReducer,
  localisation: localisationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
