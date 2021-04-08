import "./styles.css";
import { useEffect } from "react";
import { ProductListing } from "./Product-listing";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { serverRequest } from "./server-request";
import { useStateContext } from "./context";
import { Nav } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { Login } from "./Authentication";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./Authentication";
import { Profile } from "./Authentication";

export default function App() {
  const { dispatch } = useStateContext();

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
      <div className="App-container">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<ProductListing />} />
          <PrivateRoute path="wishlist" element={<Wishlist />} />
          <PrivateRoute path="cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/profile" element={<Profile />} />
        </Routes>
        <div className="spacer-3rem"></div>
      </div>
      <Footer />
    </div>
  );
}
