import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentication, useStateContext } from "../../context";
import { isAlreadyAdded, addProductToCart } from "../../utils";

export const AddToCartButton = ({
  product,
  setMessage,
  setDisableButton,
  disableButtonWhileProcessing,
  btnSize = "btn-sm-size",
  btnIcon = false
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useStateContext();
  const { isUserLoggedIn, userId } = useAuthentication();

  let isRendered = useRef(false);
  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  return (
    <>
      <button
        disabled={disableButtonWhileProcessing || !product.inStock}
        className={
          disableButtonWhileProcessing || !product.inStock
            ? `btn ${
                btnIcon ? "btn-text-icon-primary" : "btn-outline-primary"
              } btn-disabled ${btnSize}`
            : `btn ${
                btnIcon ? "btn-text-icon-primary" : "btn-outline-primary"
              } ${btnSize}`
        }
        onClick={() => {
          isUserLoggedIn
            ? isAlreadyAdded(state.itemsInCart, product._id)
              ? navigate("/cart")
              : addProductToCart({
                  setMessage,
                  setDisableButton,
                  dispatch,
                  state,
                  product,
                  isRendered,
                  userId
                })
            : navigate("/login");
        }}
      >
        <span
          class="btn-icon"
          style={{ display: btnIcon ? "inline-block" : "none" }}
        >
          <i class="fas fa-shopping-cart"></i>
        </span>
        {!product.inStock
          ? "Out of Stock"
          : isAlreadyAdded(state.itemsInCart, product._id)
          ? "Go to Cart"
          : "Add to Cart"}
      </button>
    </>
  );
};
