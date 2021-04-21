import axios from "axios";
import { isAlreadyAdded } from "./array-update-functions";

export const getProductsFromServer = async (url) => {
  const res = await axios({ method: "GET", url: url });

  if (res.status === 200 || res.status === 201) {
    return res;
  } else {
    throw new Error("Failed to get products");
  }
};

export const addProductToWishlist = async ({
  state,
  dispatch,
  setMessage,
  setDisableButton,
  product,
  isRendered,
  userId
}) => {
  !isAlreadyAdded(state.itemsInWishlist, product._id)
    ? setMessage({ msg: "adding to wishlist..", msgType: "toast-inform" })
    : setMessage({
        msg: "removing from wishlist..",
        msgType: "toast-inform"
      });
  setDisableButton(true);

  try {
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `https://uandistoreapi.herokuapp.com/wishlists/${userId}/wishlist`,
      data: {
        _id: product._id
      }
    });

    if (status === 200 || status === 201) {
      dispatch({
        type: "SET_WISHLIST",
        payload: response
      });
    }
  } catch (error) {
    console.error(error);
    if (isRendered.current) {
      setMessage({
        msg: "failed!",
        msgType: "toast-error"
      });
    }
  } finally {
    if (isRendered.current) {
      setDisableButton(false);
    }
  }
};

export const addProductToCart = async ({
  setMessage,
  setDisableButton,
  dispatch,
  state,
  product,
  isRendered,
  userId
}) => {
  setMessage({ msg: "adding to cart..", msgType: "toast-inform" });

  try {
    setDisableButton(true);
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `https://uandistoreapi.herokuapp.com/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: 1,
        active: true
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "SET_CART",
        payload: response
      });
      if (isRendered.current) {
        setMessage({ msg: "added!", msgType: "toast-success" });
      }
    }
  } catch (error) {
    console.error(error);
    if (isRendered.current) {
      setMessage({ msg: "failed to add", msgType: "toast-error" });
    }
  } finally {
    if (isRendered.current) {
      setDisableButton(false);
    }
  }
};

export const increaseQtyOfProductInCart = async ({
  setMessage,
  setDisableButton,
  dispatch,
  product,
  isRendered,
  userId
}) => {
  setMessage({ msg: "updating..", msgType: "toast-inform" });

  try {
    setDisableButton(true);
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `https://uandistoreapi.herokuapp.com/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity + 1,
        active: true
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "SET_CART",
        payload: response
      });
      if (isRendered.current) {
        setMessage({ msg: "added!", msgType: "toast-success" });
      }
    }
  } catch (error) {
    console.error(error);
    if (isRendered.current) {
      setMessage({ msg: "failed to add", msgType: "toast-error" });
    }
  } finally {
    if (isRendered.current) {
      setDisableButton(false);
    }
  }
};

export const decreaseQtyOfProductInCart = async ({
  setMessage,
  setDisableButton,
  dispatch,
  product,
  isRendered,
  userId
}) => {
  setMessage({ msg: "updating..", msgType: "toast-inform" });

  try {
    setDisableButton(true);
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `https://uandistoreapi.herokuapp.com/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity - 1,
        active: true
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "SET_CART",
        payload: response
      });
      if (isRendered.current) {
        setMessage({ msg: "added!", msgType: "toast-success" });
      }
    }
  } catch (error) {
    console.error(error);
    if (isRendered.current) {
      setMessage({ msg: "failed to add", msgType: "toast-error" });
    }
  } finally {
    if (isRendered.current) {
      setDisableButton(false);
    }
  }
};

export const removeProductFromCart = async ({
  setMessage,
  setDisableButton,
  dispatch,
  product,
  isRendered,
  userId
}) => {
  setMessage({ msg: "updating..", msgType: "toast-inform" });

  try {
    setDisableButton(true);
    const {
      data: { response },
      status
    } = await axios({
      method: "POST",
      url: `https://uandistoreapi.herokuapp.com/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: 0,
        active: false
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "SET_CART",
        payload: response
      });
      if (isRendered.current) {
        setMessage({ msg: "added!", msgType: "toast-success" });
      }
    }
  } catch (error) {
    console.error(error);
    if (isRendered.current) {
      setMessage({ msg: "failed to add", msgType: "toast-error" });
    }
  } finally {
    if (isRendered.current) {
      setDisableButton(false);
    }
  }
};
