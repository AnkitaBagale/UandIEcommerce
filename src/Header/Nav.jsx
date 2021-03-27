import { useRef } from "react";
import { useStateContext } from "../context";
import "./nav.css";
export const Nav = () => {
  const { state, dispatch } = useStateContext();
  const navRef = useRef(null);
  return (
    <nav ref={navRef} className="nav-bar shadow-box">
      <div className="nav-section">
        <div
          id="my-burger-menu"
          className="burger nav-section-items"
          onClick={() => {
            navRef.current.classList.toggle("active");
          }}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        <div className="nav-logo nav-section-items">
          <span className="primary-text-color logo-title">
            U
            <span
              className="tertiary-text-color"
              style={{ fontSize: "1rem", marginRight: "3px" }}
            >
              &
            </span>
            I
          </span>
          <br />
          <span
            className="tertiary-text-color"
            style={{
              fontSize: "0.625rem",
              fontWeight: "500",
              letterSpacing: "1px"
            }}
          >
            LET'S DESIGN TOGETHER
          </span>
        </div>

        <ul className="nav-bar-links list-style-none nav-section-items">
          <li className="list-inline-item avatar-in-nav-links">
            <div className="primary-text-color logo-title">
              U
              <span
                className="tertiary-text-color"
                style={{ fontSize: "1rem", marginRight: "3px" }}
              >
                &
              </span>
              I
            </div>
            <div
              className="tertiary-text-color"
              style={{
                fontSize: "0.625rem",
                fontWeight: "500",
                letterSpacing: "1px"
              }}
            >
              LET'S DESIGN TOGETHER
            </div>
          </li>

          <li className="list-inline-item">
            <button
              onClick={() => dispatch({ type: "ROUTE", payload: "PLP" })}
              className="link-no-style text-left"
            >
              Shop by Category
            </button>
          </li>
          <li className="list-inline-item">
            <button
              onClick={() => dispatch({ type: "ROUTE", payload: "PLP" })}
              className="link-no-style text-left"
            >
              Shop by Brand
            </button>
          </li>
        </ul>
      </div>

      <div className="nav-section">
        <ul className="nav-icons list-style-none nav-section-item-width50pc">
          <li className="list-inline-item">
            <button
              className="nav-icon-link link-no-style text-regular-weight"
              onClick={() => dispatch({ type: "ROUTE", payload: "wishlist" })}
            >
              <span className="nav-icon badge-container">
                <i className="fas fa-heart"></i>
                <span className="status-badge status-badge-number">
                  {state.itemsInWishlist.length}
                </span>
              </span>
              <span className="nav-icon-text">Wishlist</span>
            </button>
          </li>
          <li className="list-inline-item">
            <button
              className="nav-icon-link link-no-style text-regular-weight"
              onClick={() => dispatch({ type: "ROUTE", payload: "cart" })}
            >
              <span className="nav-icon  badge-container">
                <i className="fas fa-shopping-cart"></i>
                <span className="status-badge status-badge-number">
                  {state.itemsInCart.length}
                </span>
              </span>
              <span className="nav-icon-text">Cart</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
