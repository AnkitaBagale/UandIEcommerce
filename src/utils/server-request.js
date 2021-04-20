import axios from "axios";
import { checkStatus } from "../utils";

class ApiError extends Error {}

export const serverRequest = async ({
  url,
  requestType,
  dataToOperate,
  dataToOperateId
}) => {
  switch (requestType) {
    case "GET": {
      const res = await axios.get(url);

      if (res.status === 200 || res.status === 201) {
        return res;
      } else {
        throw new ApiError("Failed to get products");
      }
    }
    case "POST": {
      const res = await axios.post(url, dataToOperate);
      console.log("above if", res.status);
      return res;
    }

    default:
      return null;
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
  !checkStatus(state.itemsInWishlist, product._id)
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
      url: `http://localhost:3000/wishlists/${userId}/wishlist`,
      data: {
        _id: product._id
      }
    });

    if (status === 200 || status === 201) {
      dispatch({
        type: "ADD_OR_REMOVE_TO_WISHLIST",
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
    if (checkStatus(state.itemsInCart, product._id)) {
      navigate("/cart");
    } else {
      setDisableButton(true);
      const {
        data: { response },
        status
      } = await axios({
        method: "POST",
        url: `http://localhost:3000/carts/${userId}/cart`,
        data: {
          _id: product._id,
          quantity: 1,
          active: true
        }
      });
      if (status === 200 || status === 201) {
        dispatch({
          type: "ADD_TO_CART",
          payload: response
        });
        if (isRendered.current) {
          setMessage({ msg: "added!", msgType: "toast-success" });
        }
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
      url: `http://localhost:3000/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity + 1,
        active: true
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "UPDATE_CART_QTY",
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
      url: `http://localhost:3000/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: product.quantity - 1,
        active: true
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "UPDATE_CART_QTY",
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
      url: `http://localhost:3000/carts/${userId}/cart`,
      data: {
        _id: product._id,
        quantity: 0,
        active: false
      }
    });
    if (status === 200 || status === 201) {
      dispatch({
        type: "UPDATE_CART_QTY",
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
