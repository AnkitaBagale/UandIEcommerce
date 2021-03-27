import "./styles.css";
import { useEffect } from "react";
import { ProductListing } from "./Product-listing";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { serverRequest } from "./server-request";
import { useStateContext } from "./context";
import { Nav } from "./Header";
export default function App() {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    (async () => {
      const { response, errorFlag, loadingFlag } = await serverRequest(
        "api/products",
        "GET"
      );
      if (!errorFlag) {
        dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
        console.log("found data", response, loadingFlag);
      }
    })();
    (async () => {
      const { response, errorFlag, loadingFlag } = await serverRequest(
        "api/carts",
        "GET"
      );
      if (!errorFlag) {
        dispatch({ type: "SET_CART", payload: response.data.carts });
        console.log("found data", response, loadingFlag);
      }
    })();
    (async () => {
      const { response, errorFlag, loadingFlag } = await serverRequest(
        "api/wishlists",
        "GET"
      );
      if (!errorFlag) {
        dispatch({
          type: "SET_WISHLIST",
          payload: response.data.wishlists
        });
        console.log("found data", response, loadingFlag);
      }
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
