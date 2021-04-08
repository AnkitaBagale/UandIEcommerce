import { useRef } from "react";
import { useStateContext } from "../context";
import "./nav.css";
import { filterDataOnStatus } from "../Product-listing";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  const { state, dispatch } = useStateContext();
  const navRef = useRef(null);
  return (
    <nav ref={navRef} className="nav-bar shadow-box">
      <div className="nav-section">
        <div
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
          <Link to="/" className="link-no-style text-left">
            <span className="primary-text-color logo-title">
              U
              <span className="tertiary-text-color logo-and-symbol-style">
                &
              </span>
              I
            </span>

            <span className="tertiary-text-color logo-tagline">
              LET'S DESIGN TOGETHER
            </span>
          </Link>
        </div>

        <ul className="nav-bar-links list-style-none nav-section-items">
          <li className="list-inline-item avatar-in-nav-links">
            <div className="primary-text-color logo-title">
              U
              <span className="tertiary-text-color logo-and-symbol-style">
                &
              </span>
              I
            </div>
            <div className="tertiary-text-color logo-tagline">
              LET'S DESIGN TOGETHER
            </div>
          </li>

          <li className="list-inline-item">
            <NavLink
              end
              to="/"
              activeClassName="navlinks-active"
              className="navlinks-style text-left"
            >
              Home
            </NavLink>
          </li>
          <li className="list-inline-item">
            <NavLink
              end
              activeClassName="navlinks-active"
              to="/shop"
              className="navlinks-style text-left"
            >
              Shop Now
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="nav-section">
        <ul className="nav-icons list-style-none nav-section-item-width50pc">
          <li className="list-inline-item">
            <Link
              to="/wishlist"
              className="nav-icon-link link-no-style text-regular-weight"
            >
              <span className="nav-icon badge-container">
                <i className="fas fa-heart"></i>
                <span className="status-badge status-badge-number">
                  {filterDataOnStatus(state.itemsInWishlist).length}
                </span>
              </span>
              <span className="nav-icon-text">Wishlist</span>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link
              to="/cart"
              className="nav-icon-link link-no-style text-regular-weight"
            >
              <span className="nav-icon  badge-container">
                <i className="fas fa-shopping-cart"></i>
                <span className="status-badge status-badge-number">
                  {filterDataOnStatus(state.itemsInCart).length}
                </span>
              </span>
              <span className="nav-icon-text">Cart</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
