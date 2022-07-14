import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { toursReducer } from "./tours/tours.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  tours: toursReducer,
});
