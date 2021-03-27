import { useStateContext } from "../context";

export const CartActionButtons = ({ product }) => {
  const { dispatch } = useStateContext();
  return (
    <>
      <button
        className="btn btn-icon-secondary"
        onClick={() => {
          product.cartQty !== 1
            ? dispatch({
                type: "DECREMENT_CART_QTY",
                payload: product
              })
            : dispatch({
                type: "REMOVE_FROM_CART",
                payload: product
              });
        }}
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
        disabled={false ? true : false}
        className={
          false
            ? "btn btn-icon-secondary btn-disabled"
            : "btn btn-icon-secondary"
        }
        onClick={() => {
          dispatch({
            type: "INCREMENT_CART_QTY",
            payload: product
          });
        }}
      >
        <span className="btn-icon">
          <i className="fas fa-plus"></i>
        </span>
      </button>
    </>
  );
};
