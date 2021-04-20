import "./styles.css";
import { useEffect } from "react";
import { ProductListing } from "./Product-listing";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { serverRequest } from "./utils";
import { useStateContext, useAuthentication } from "./context";
import { Nav } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";

import {
  ForgotPasswordPage,
  Login,
  PrivateRoute,
  Profile,
  SignUp
} from "./Authentication";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const { state, dispatch } = useStateContext();
  const { isUserLoggedIn, userId } = useAuthentication();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { response }
        } = await serverRequest({
          url: "http://localhost:3000/products",
          requestType: "GET"
        });
        dispatch({ type: "SET_PRODUCTS", payload: response });
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      (async () => {
        try {
          const {
            data: { response }
          } = await serverRequest({
            url: `http://localhost:3000/carts/${userId}/cart`,
            requestType: "GET"
          });

          dispatch({ type: "SET_CART", payload: response.products });
        } catch {}

        try {
          const {
            data: { response }
          } = await serverRequest({
            url: `http://localhost:3000/wishlists/${userId}/wishlist`,
            requestType: "GET"
          });

          dispatch({ type: "SET_WISHLIST", payload: response.products });
        } catch {}
      })();
    }
  }, [isUserLoggedIn]);
  console.log("cart items", state.itemsInCart);
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
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUp />} />
          <PrivateRoute path="/profile" element={<Profile />} />
        </Routes>
        <div className="spacer-3rem"></div>
      </div>
      <Footer />
    </div>
  );
}
