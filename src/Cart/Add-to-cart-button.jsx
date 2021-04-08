import { useStateContext } from "../context";
import { isAlreadyAdded, checkStatus } from "../array-update-functions";
import { serverRequest } from "../server-request";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const AddToCartButton = ({
  product,
  setMessage,
  setDisableButton,
  disableButtonWhileProcessing
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useStateContext();

  let isRendered = useRef(false);
  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  const addToCartHandler = async () => {
    setMessage({ msg: "adding to cart..", msgType: "toast-inform" });

    try {
      if (checkStatus(state.itemsInCart, product.id)) {
        navigate("/cart");
      } else {
        setDisableButton(true);
        if (isAlreadyAdded(state.itemsInCart, product.id)) {
          await serverRequest({
            requestType: "PUT",
            url: "api/carts",
            dataToOperateId: product.id,
            dataToOperate: { cart: { ...product, status: { exists: true } } }
          });
        } else {
          await serverRequest({
            requestType: "POST",
            url: "api/carts",
            dataToOperate: { cart: { ...product, status: { exists: true } } }
          });
        }
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...product, status: { exists: true } }
        });

        if (isRendered.current) {
          setMessage({ msg: "added!", msgType: "toast-success" });
        }
      }
    } catch {
      if (isRendered.current) {
        setMessage({ msg: "failed to add", msgType: "toast-error" });
      }
    } finally {
      if (isRendered.current) {
        setDisableButton(false);
      }
    }
  };

  return (
    <>
      <button
        style={{ display: !product.inStock ? "none" : "block" }}
        disabled={disableButtonWhileProcessing}
        className={
          disableButtonWhileProcessing
            ? "btn btn-outline-primary btn-disabled btn-sm-size"
            : "btn btn-outline-primary btn-sm-size"
        }
        onClick={addToCartHandler}
      >
        {checkStatus(state.itemsInCart, product.id)
          ? "Go to Cart"
          : "Add to Cart"}
      </button>
    </>
  );
};
