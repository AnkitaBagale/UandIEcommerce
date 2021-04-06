import { useStateContext } from "../context";
import { CartItemCard } from "./CartItem-card";
import { filterDataOnStatus } from "../Product-listing";
import { CartValueDetails } from "./Cart-value";

export const Cart = () => {
  const { state } = useStateContext();
  const dataToMap = filterDataOnStatus(state.itemsInCart);
  return (
    <>
      <h1 className="text-center h6 page-title">My Cart</h1>

      {dataToMap.length === 0 ? (
        <h3 className="text-center">Cart is empty</h3>
      ) : (
        <>
          <div className="display-flex width-800px">
            <ul className="column-60-pc list-style-none styled-list padding-1rem-borderbox">
              {dataToMap.map((product) => {
                return (
                  <li key={product.id}>
                    <CartItemCard key={product.id} product={product} />
                  </li>
                );
              })}
            </ul>
            <CartValueDetails />
          </div>
        </>
      )}
    </>
  );
};
