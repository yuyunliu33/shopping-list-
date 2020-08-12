// rootReducer is to bring together all of our other reducers
// Reducer: function that takes a state and an action and returns a NEW state
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

export default combineReducers({
  item: itemReducer,
});
