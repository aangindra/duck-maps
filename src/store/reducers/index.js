import { combineReducers } from "redux";
import place from "./placeReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  place,
  user,
});

export default rootReducer;
