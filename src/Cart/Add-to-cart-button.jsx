import { useStateContext } from "../context";
import { isAlreadyAdded } from "../array-update-functions";

export const AddToCartButton = ({ product }) => {
  const { state, dispatch } = useStateContext();

  return (
    <button
      className={
        product.avalQty === 0
          ? "btn btn-text-icon-primary btn-disabled"
          : "btn btn-text-icon-primary"
      }
      onClick={() =>
        isAlreadyAdded(state.itemsInCart, product.id)
          ? dispatch({ type: "ROUTE", payload: "cart" })
          : dispatch({ type: "ADD_TO_CART", payload: product })
      }
    >
      {isAlreadyAdded(state.itemsInCart, product.id)
        ? "Go to Cart"
        : "Add to Cart"}
    </button>
  );
};
