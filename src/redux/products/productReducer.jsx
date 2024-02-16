import {
  ADDTO_CART_SUCCESS,
  DELETE_FROM_CART,
  HIDE_LOADING,
  QUANTITY_DECREASE,
  QUANTITY_INCREASE,
  SHOW_LOADING,
} from "./actionTypes";
import { initialState } from "./initialState";

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDTO_CART_SUCCESS:
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, action.payload])
      );

      return {
        ...state,
        loader: false,
        cartItems: [...state.cartItems, action.payload],
      };

    case QUANTITY_INCREASE:
     
      return {
        ...state,
        loader: false,
        cartItems: state.cartItems.map((item) =>
        
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case QUANTITY_DECREASE:
      return {
        ...state,
        loader: false,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        loader: false,
        cartItems: state.cartItems.filter(
          (data) => data._id !== action.payload
        ),
      };

    case SHOW_LOADING:
      return {
        ...state,
        loader: true,
      };

    case HIDE_LOADING:
      return {
        ...state,
        loader: false,
      };

    default:
      return state;
  }
};
