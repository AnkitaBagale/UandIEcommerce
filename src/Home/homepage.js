import "./homepage.css";
import { useStateContext } from "../context";
import heroImg from "./Images/hero2.jpg";
import { featuredCategories, featuredBrands } from "../database";

export const Home = () => {
  const { dispatch } = useStateContext();
  return (
    <>
      <div>
        <div className="alert-box alert-secondary text-center">
          Bestsellers at 70% off. Offer till midnight{" "}
          <button
            className="link-no-style link-text link-text-secondary"
            onClick={() => {
              dispatch({ type: "ROUTE", payload: "PLP" });
            }}
          >
            Shop Now.
          </button>
        </div>

        <div
          style={{
            background: `url(${heroImg}) no-repeat center/100% 100%`
          }}
          className="hero-image display-flex vertical-middle"
        >
          <div className="text-center">
            <div>
              <span className="primary-text-color logo-title">
                U<span className="logo-and-symbol-style">&</span>I
              </span>{" "}
              <span className="logo-title">Store</span>
              <div className="tertiary-text-color logo-tagline text-center margin-auto">
                LET'S DESIGN TOGETHER
              </div>
            </div>
            <div>
              <h1 className="banner-title">CLEARANCE SALE</h1>

              <h5>
                UPTO <span className="h2">70% OFF</span> on various products
              </h5>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch({ type: "ROUTE", payload: "PLP" });
                }}
                className="btn btn-solid-primary"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="spacer-3rem"></div>
        <div className="spacer-3rem"></div>

        <div className="homepage-container">
          <h2 className="text-center">Featured Categories</h2>
          <div className="spacer-1rem"></div>
          <div className="grid-4-column-layout">
            {featuredCategories.map((category) => {
              return (
                <div
                  key={category.name}
                  className="card-vertical card-hover"
                  onClick={() => {
                    dispatch({
                      type: "FILTER_BY_CATEGORIES",
                      payload: category.name
                    });
                    dispatch({ type: "ROUTE", payload: "PLP" });
                  }}
                >
                  <div className="overlay-container">
                    <div className="image-container">
                      <img
                        className="img-responsive"
                        src={category.img}
                        alt={category.name}
                      />
                    </div>
                  </div>
                  <div className="overlay-text text-center">
                    <div className="h6">{category.name}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="spacer-3rem"></div>
          <div className="spacer-3rem"></div>

          <h2 className="text-center">Featured Brands</h2>

          <div className="grid-4-column-layout brand-list">
            {featuredBrands.map((brand) => {
              return (
                <div
                  key={brand.name}
                  className="card-vertical cursor-pointer"
                  onClick={() => {
                    dispatch({
                      type: "FILTER_BY_BRANDS",
                      payload: brand.name
                    });
                    dispatch({ type: "ROUTE", payload: "PLP" });
                  }}
                >
                  <div className="image-container">
                    <img
                      className="img-responsive"
                      src={brand.img}
                      alt={brand.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
