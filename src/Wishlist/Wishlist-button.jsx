import { checkStatus, isAlreadyAdded } from "../array-update-functions";
import { useStateContext } from "../context";
import { serverRequest } from "../server-request";
import { useEffect, useRef } from "react";

export const WishlistButton = ({
  product,
  setMessage,
  disableButtonWhileProcessing,
  setDisableButton
}) => {
  const { state, dispatch } = useStateContext();

  let isRendered = useRef(false);

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  const addWishlistHandler = async () => {
    setMessage({ msg: "adding to wishlist..", msgType: "toast-inform" });

    setDisableButton(true);

    try {
      if (isAlreadyAdded(state.itemsInWishlist, product.id)) {
        if (!checkStatus(state.itemsInWishlist, product.id)) {
          await serverRequest({
            requestType: "PUT",
            url: "api/wishlists",
            dataToOperateId: product.id,
            dataToOperate: {
              wishlist: {
                ...product,
                status: { exists: true }
              }
            }
          });
          dispatch({
            type: "ADD_OR_REMOVE_TO_WISHLIST",
            payload: product
          });
        }
      } else {
        await serverRequest({
          requestType: "POST",
          url: "api/wishlists",
          dataToOperate: {
            wishlist: { ...product, status: { exists: true } }
          }
        });
        dispatch({
          type: "ADD_OR_REMOVE_TO_WISHLIST",
          payload: product
        });
      }
      await serverRequest({
        requestType: "PUT",
        url: "api/carts",
        dataToOperateId: product.id,
        dataToOperate: {
          cart: {
            ...product,
            status: { exists: false }
          }
        }
      });
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: product
      });
    } catch {
      if (isRendered.current)
        setMessage({ msg: "failed to add", msgType: "toast-error" });
    } finally {
      if (isRendered.current) setDisableButton(false);
    }
  };

  return (
    <button
      disabled={disableButtonWhileProcessing}
      className={
        disableButtonWhileProcessing
          ? "btn btn-outline-secondary btn-disabled"
          : "btn btn-outline-secondary"
      }
      onClick={addWishlistHandler}
    >
      Move to Wishlist
    </button>
  );
};
