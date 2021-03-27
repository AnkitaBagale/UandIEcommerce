import { isAlreadyAdded } from "../array-update-functions";
import { useStateContext } from "../context";

export const WishlistButton = ({ product }) => {
  const { state, dispatch } = useStateContext();
  return (
    <button
      className="btn btn-outline-secondary"
      onClick={() => {
        if (isAlreadyAdded(state.itemsInWishlist, product.id)) {
          dispatch({
            type: "REMOVE_FROM_CART",
            payload: product
          });
        } else {
          dispatch({
            type: "ADD_OR_REMOVE_TO_WISHLIST",
            payload: product
          });
          dispatch({
            type: "REMOVE_FROM_CART",
            payload: product
          });
        }
      }}
    >
      Move to Wishlist
    </button>
  );
};
