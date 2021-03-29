import "./styles.css";
import { useEffect } from "react";
import { ProductListing } from "./Product-listing";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { serverRequest } from "./server-request";
import { useStateContext, ToastContextProvider } from "./context";
import { Nav } from "./Header";

export default function App() {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    (async () => {
      try {
        const { response } = await serverRequest({
          url: "api/products",
          requestType: "GET"
        });
        dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
      } catch {}
      try {
        const { response } = await serverRequest({
          url: "api/carts",
          requestType: "GET"
        });
        dispatch({ type: "SET_CART", payload: response.data.carts });
      } catch {}
      try {
        const { response } = await serverRequest({
          url: "api/wishlists",
          requestType: "GET"
        });

        dispatch({
          type: "SET_WISHLIST",
          payload: response.data.wishlists
        });
      } catch {}
    })();
  }, []);

  return (
    <div className="App">
      <Nav />

      {state.route === "PLP" && <ProductListing />}
      {state.route === "wishlist" && <Wishlist />}
      {state.route === "cart" && <Cart />}
    </div>
  );
}
