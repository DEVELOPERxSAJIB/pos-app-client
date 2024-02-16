import {
  ADDTO_CART_SUCCESS,
  DELETE_FROM_CART,
  QUANTITY_DECREASE,
  QUANTITY_INCREASE,
} from "./actionTypes";

// add to cart
export const addToCart = (item) => async (dispatch) => {
  try {
    dispatch({ type: ADDTO_CART_SUCCESS, payload: { ...item, quantity: 1 } });
  } catch (error) {
    console.log(error.message);
  }
};

// quantity increase cart
export const quantityIncrease = (data) => async (dispatch) => {
  try {
    if (data.quantity !== 99) {
      dispatch({
        type: QUANTITY_INCREASE,
        payload: { ...data, quantity: data.quantity + 1 },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// qunatity Decrease
export const qunatityDecrease = (data) => (dispatch) => {
  try {
    if (data.quantity !== 1) {
      dispatch({
        type: QUANTITY_DECREASE,
        payload: { ...data, quantity: data.quantity - 1 },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// delete from cart
export const deleteFromCart = (id) => (dispatch) => {
  try {
    dispatch({ type: DELETE_FROM_CART, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};


