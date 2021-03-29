import { useStateContext } from "../context";
import { serverRequest } from "../server-request";
import { useEffect, useRef } from "react";

export const CartActionButtons = ({
  product,
  setMessage,
  disableButtonWhileProcessing,
  setDisableButton
}) => {
  let isRendered = useRef(false);
  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  const { dispatch } = useStateContext();
  const cartQtyHandler = async (incOrDec) => {
    setDisableButton(true);
    setMessage({ msg: "updating...", msgType: "toast-inform" });
    try {
      if (!incOrDec && product.cartQty === 1) {
        await serverRequest({
          requestType: "PUT",
          url: "api/carts",
          dataToOperateId: product.id,
          dataToOperate: { cart: { ...product, status: { exists: false } } }
        });
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: product
        });
      } else {
        await serverRequest({
          requestType: "PUT",
          url: "api/carts",
          dataToOperateId: product.id,
          dataToOperate: {
            cart: {
              ...product,
              cartQty: incOrDec ? product.cartQty + 1 : product.cartQty - 1
            }
          }
        });
        incOrDec
          ? dispatch({
              type: "INCREMENT_CART_QTY",
              payload: product
            })
          : dispatch({
              type: "DECREMENT_CART_QTY",
              payload: product
            });
      }
    } catch {
      if (isRendered.current)
        setMessage({ msg: "failed to update!", msgType: "toast-failure" });
    } finally {
      if (isRendered.current) setDisableButton(false);
      setMessage("");
    }
  };

  return (
    <>
      <button
        className={
          disableButtonWhileProcessing
            ? "btn btn-icon-secondary btn-disabled"
            : "btn btn-icon-secondary"
        }
        onClick={() => cartQtyHandler(false)}
        disabled={disableButtonWhileProcessing}
      >
        <span className="btn-icon">
          <i
            className={
              product.cartQty !== 1 ? "fas fa-minus" : "fas fa-trash-alt"
            }
          ></i>
        </span>
      </button>
      <span
        style={{
          padding: "0.5rem",
          background: "pink"
        }}
      >
        {product.cartQty}
      </span>

      <button
        className={
          disableButtonWhileProcessing
            ? "btn btn-icon-secondary btn-disabled"
            : "btn btn-icon-secondary"
        }
        disabled={disableButtonWhileProcessing}
        onClick={() => cartQtyHandler(true)}
      >
        <span className="btn-icon">
          <i className="fas fa-plus"></i>
        </span>
      </button>
    </>
  );
};
