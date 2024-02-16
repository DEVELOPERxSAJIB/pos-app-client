import { combineReducers } from "redux";
import { productReducer } from "./products/productReducer";

// create root redicer
const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
