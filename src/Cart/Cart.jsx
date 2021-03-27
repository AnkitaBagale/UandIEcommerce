import { useStateContext } from "../context";

import { CartActionButtons } from "./Cart-action-button";
import { WishlistButton } from "../Wishlist";

export const Cart = () => {
  const { state } = useStateContext();

  const cartTotal = () =>
    state.itemsInCart.reduce(
      (sum, { price, cartQty }) => sum + price * cartQty,
      0
    );

  return (
    <>
      <h1 className="text-center h6 page-title">My Cart</h1>
      <div className="display-flex width-600px">
        <ul className="column-60-pc list-style-none styled-list">
          {state.itemsInCart.length === 0 ? (
            <h3 className="text-center">Cart is empty</h3>
          ) : (
            state.itemsInCart.map((product) => {
              return (
                <li>
                  <div className="card-horizontal shadow-box">
                    <div className="column-20-pc image-container">
                      <img
                        className="img-responsive card-img"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="text-container">
                      <div className="text-container-title">
                        <h6 className="text-regular-weight">{product.name}</h6>
                      </div>

                      <div className="text-container-desc">
                        <p className="text-regular-weight">
                          Rs.{product.price * product.cartQty}
                        </p>
                      </div>

                      <div className="CTA-Container">
                        <CartActionButtons product={product} />
                        <WishlistButton product={product} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <div className="column-40-pc padding-1rem-borderbox">
          <h6 className="p">
            Price Details: ({state.itemsInCart.length} items)
          </h6>
          <div className="body-cp-md">Total MRP: Rs.{cartTotal()}</div>
          <button className="btn btn-solid-primary">Place Order</button>
        </div>
      </div>
    </>
  );
};
