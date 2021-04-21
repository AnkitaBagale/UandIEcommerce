import { useEffect, useRef } from "react";

import { useAuthentication, useStateContext } from "../../context";
import { addProductToWishlist, removeProductFromCart } from "../../utils";

export const MoveToWishlistButton = ({
  product,
  setMessage,
  disableButtonWhileProcessing,
  setDisableButton
}) => {
  const { state, dispatch } = useStateContext();

  let isRendered = useRef(false);
  const { userId } = useAuthentication();

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  return (
    <button
      disabled={disableButtonWhileProcessing}
      className={
        disableButtonWhileProcessing
          ? "btn btn-outline-secondary btn-disabled"
          : "btn btn-outline-secondary"
      }
      onClick={() => {
        addProductToWishlist({
          state,
          dispatch,
          setMessage,
          setDisableButton,
          product,
          isRendered,
          userId
        });
        removeProductFromCart({
          state,
          dispatch,
          setMessage,
          setDisableButton,
          product,
          isRendered,
          userId
        });
      }}
    >
      Move to Wishlist
    </button>
  );
};
