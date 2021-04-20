import { useAuthentication, useStateContext } from "../context";
import {
  increaseQtyOfProductInCart,
  decreaseQtyOfProductInCart
} from "../utils";
import { useEffect, useRef } from "react";
import { removeProductFromCart } from "../utils/server-request";

export const CartActionButtons = ({
  product,
  setMessage,
  disableButtonWhileProcessing,
  setDisableButton
}) => {
  let isRendered = useRef(false);
  const { userId } = useAuthentication();

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  const { dispatch } = useStateContext();

  return (
    <>
      <button
        className={
          disableButtonWhileProcessing
            ? "btn btn-icon-secondary border-1px-square btn-disabled"
            : "btn btn-icon-secondary border-1px-square"
        }
        onClick={() =>
          product.quantity !== 1
            ? decreaseQtyOfProductInCart({
                setMessage,
                setDisableButton,
                dispatch,
                product,
                isRendered,
                userId
              })
            : removeProductFromCart({
                setMessage,
                setDisableButton,
                dispatch,
                product,
                isRendered,
                userId
              })
        }
        disabled={disableButtonWhileProcessing}
      >
        <span className="btn-icon">
          <i
            className={
              product.quantity !== 1 ? "fas fa-minus" : "fas fa-trash-alt"
            }
          ></i>
        </span>
      </button>
      <span className="border-1px-square cart-qty-style">
        {product.quantity}
      </span>

      <button
        className={
          disableButtonWhileProcessing
            ? "btn btn-icon-secondary border-1px-square btn-disabled"
            : "btn btn-icon-secondary border-1px-square"
        }
        disabled={disableButtonWhileProcessing}
        onClick={() =>
          increaseQtyOfProductInCart({
            setMessage,
            setDisableButton,
            dispatch,
            product,
            isRendered,
            userId
          })
        }
      >
        <span className="btn-icon">
          <i className="fas fa-plus"></i>
        </span>
      </button>
    </>
  );
};
