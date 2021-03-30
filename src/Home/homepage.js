import "./homepage.css";
import { useStateContext } from "../context";

export const Home = () => {
  const { dispatch } = useStateContext();
  return (
    <>
      <div>
        <div className="alert-box alert-secondary text-center">
          Bestsellers at 70% off. Offer till midnight{" "}
          <button className="link-no-style link-text link-text-secondary">
            Shop Now.
          </button>
        </div>

        <div className="hero-image display-flex vertical-middle">
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
                  dispatch({ type: "ROUTE", payload: "home" });
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
            <div className="card-vertical card-hover">
              <div className="overlay-container">
                <div className="image-container">
                  <img
                    className="img-responsive"
                    src="/Images/category5.jpg"
                    alt="brand-img"
                  />
                </div>
              </div>
              <div className="overlay-text text-center">
                <div className="h6">Drawing Board</div>
              </div>
            </div>
            <div className="card-vertical  card-hover">
              <div className="overlay-container">
                <div className="image-container">
                  <img
                    className="img-responsive"
                    src="/Images/category2.jpg"
                    alt="brand-img"
                  />
                </div>
              </div>
              <div className="overlay-text text-center">
                <div className="h6">Graphite Pencil</div>
              </div>
            </div>
            <div className="card-vertical  card-hover">
              <div className="overlay-container">
                <div className="image-container">
                  <img
                    className="img-responsive"
                    src="/Images/category1.jpg"
                    alt="brand-img"
                  />
                </div>
              </div>
              <div className="overlay-text text-center">
                <div className="h6">Nylon Brush</div>
              </div>
            </div>
            <div className="card-vertical  card-hover">
              <div className="overlay-container">
                <div className="image-container">
                  <img
                    className="img-responsive"
                    src="/Images/category4.jpg"
                    alt="brand-img"
                  />
                </div>
              </div>
              <div className="overlay-text text-center">
                <div className="h6">Pencil Colour</div>
              </div>
            </div>
          </div>

          <div className="spacer-3rem"></div>
          <div className="spacer-3rem"></div>

          <h2 className="text-center">Featured Brands</h2>

          <div className="grid-4-column-layout brand-list">
            <div className="card-vertical">
              <div className="image-container">
                <img
                  className="img-responsive"
                  src="/Images/brand-bianyo.jpg"
                  alt="brand-img"
                />
              </div>
            </div>
            <div className="card-vertical">
              <div className="image-container">
                <img
                  className="img-responsive"
                  src="/Images/brand-brusto.png"
                  alt="brand-img"
                />
              </div>
            </div>
            <div className="card-vertical">
              <div className="image-container">
                <img
                  className="img-responsive"
                  src="/Images/brand-camlin.png"
                  alt="brand-img"
                />
              </div>
            </div>
            <div className="card-vertical">
              <div className="image-container">
                <img
                  className="img-responsive"
                  src="/Images/brand-doms.png"
                  alt="brand-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
