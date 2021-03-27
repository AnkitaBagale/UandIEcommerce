import { useStateContext } from "../context";
import { AddToCartButton } from "../Cart";
import { isAlreadyAdded } from "../array-update-functions";

export const ProductCard = ({ product }) => {
  const { state, dispatch } = useStateContext();

  return (
    <div className="card-vertical">
      <div class="overlay-container">
        <div className="image-container">
          <img
            className="img-responsive card-img"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="text-container">
          <div className="text-container-title">
            <h6 className="text-regular-weight product-title">
              {product.name}
              <button
                className="like-btn link-no-style"
                style={{
                  color: isAlreadyAdded(state.itemsInWishlist, product.id)
                    ? "var(--primary-color)"
                    : ""
                }}
                onClick={() => {
                  dispatch({
                    type: "ADD_OR_REMOVE_TO_WISHLIST",
                    payload: product
                  });
                }}
              >
                <span>
                  <i className="fas fa-heart"></i>
                </span>
              </button>
            </h6>
          </div>
          <div className="text-container-desc">
            <p className="body-cp-md">{product.brand}</p>
            <p className="text-regular-weight">
              Rs.{product.price}
              <span className="text-light-weight">
                <span className="primary-text-color body-cp-md">
                  {" "}
                  {product.offer}
                </span>
              </span>
            </p>
          </div>
        </div>

        <div className="CTA-Container">
          <AddToCartButton product={product} />
        </div>
      </div>

      <div
        style={{ display: product.inStock ? "none" : "flex" }}
        class="overlay-text"
      >
        <div class="body-cp-lg text-container">Out Of Stock</div>
      </div>
    </div>
  );
};
