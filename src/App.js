import "./styles.css";
import { useEffect } from "react";
import { useStateContext, useAuthentication } from "./context";
import { getProductsFromServer } from "./utils";
import { Routes, Route } from "react-router-dom";

import {
  ProductListing,
  Cart,
  Wishlist,
  Nav,
  Home,
  Footer,
  ForgotPasswordPage,
  Login,
  PrivateRoute,
  Profile,
  SignUp,
  ProductDetailPage,
  ErrorPage
} from "./Components";

export default function App() {
  const { dispatch } = useStateContext();
  const { isUserLoggedIn, userId } = useAuthentication();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { response }
        } = await getProductsFromServer(
          "https://uandistoreapi.herokuapp.com/products"
        );
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
            `https://uandistoreapi.herokuapp.com/carts/${userId}/cart`
          );

          dispatch({ type: "SET_CART", payload: response });
        } catch (error) {
          console.log(error);
        }

        try {
          const {
            data: { response }
          } = await getProductsFromServer(
            `https://uandistoreapi.herokuapp.com/wishlists/${userId}/wishlist`
          );

          dispatch({ type: "SET_WISHLIST", payload: response });
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
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <PrivateRoute path="wishlist" element={<Wishlist />} />
          <PrivateRoute path="cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUp />} />
          <PrivateRoute path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <div className="spacer-3rem"></div>
      </div>
      <Footer />
    </div>
  );
}
