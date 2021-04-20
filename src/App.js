import "./styles.css";
import { useEffect } from "react";
import { ProductListing } from "./Product-listing";
import { Cart } from "./Cart";
import { Wishlist } from "./Wishlist";
import { useStateContext, useAuthentication } from "./context";
import { Nav } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { getProductsFromServer } from "./utils";

import {
  ForgotPasswordPage,
  Login,
  PrivateRoute,
  Profile,
  SignUp
} from "./Authentication";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const { dispatch } = useStateContext();
  const { isUserLoggedIn, userId } = useAuthentication();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { response }
        } = await getProductsFromServer("http://localhost:3000/products");
        dispatch({ type: "SET_PRODUCTS", payload: response });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      (async () => {
        try {
          const {
            data: { response }
          } = await getProductsFromServer(
            `http://localhost:3000/carts/${userId}/cart`
          );

          dispatch({ type: "SET_CART", payload: response.products });
        } catch (error) {
          console.log(error);
        }

        try {
          const {
            data: { response }
          } = await getProductsFromServer(
            `http://localhost:3000/wishlists/${userId}/wishlist`
          );

          dispatch({ type: "SET_WISHLIST", payload: response.products });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isUserLoggedIn]);

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
