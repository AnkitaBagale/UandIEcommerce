import { useStateContext } from "../context";
import { CartItemCard } from "./CartItem-card";
import { filterDataOnStatus } from "../Product-listing";

export const Cart = () => {
  const { state } = useStateContext();

  const cartTotal = (data) =>
    data.reduce((sum, { price, cartQty }) => sum + price * cartQty, 0);

  const dataToMap = filterDataOnStatus(state.itemsInCart);

  console.log({ dataToMap });
  console.log(state);

  return (
    <>
      <h1 className="text-center h6 page-title">My Cart</h1>
      <div className="display-flex width-600px">
        <ul className="column-60-pc list-style-none styled-list">
          {state.itemsInCart.length === 0 ? (
            <h3 className="text-center">Cart is empty</h3>
          ) : (
            dataToMap.map((product) => {
              return (
                <li key={product.id}>
                  <CartItemCard key={product.id} product={product} />
                </li>
              );
            })
          )}
        </ul>
        <div className="column-40-pc padding-1rem-borderbox">
          <h6 className="p">Price Details: ({dataToMap.length} items)</h6>
          <div className="body-cp-md">Total MRP: Rs.{cartTotal(dataToMap)}</div>
          <button className="btn btn-solid-primary">Place Order</button>
        </div>
      </div>
    </>
  );
};
