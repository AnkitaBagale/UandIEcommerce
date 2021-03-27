import { useStateContext } from "../context";
import { AddToCartButton } from "../Cart";

export const Wishlist = () => {
  const { state, dispatch } = useStateContext();
  return (
    <>
      <h1 className="text-center h6 page-title">
        My Wishlist{" "}
        <span className="text-light-weight">
          {state.itemsInWishlist.length}items
        </span>
      </h1>
      <div className="grid-4-column-layout">
        {state.itemsInWishlist.map((product) => (
          <div className="card-vertical">
            <button
              type="button"
              class="btn-close"
              onClick={() =>
                dispatch({
                  type: "ADD_OR_REMOVE_TO_WISHLIST",
                  payload: product
                })
              }
            ></button>
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
        ))}
      </div>
    </>
  );
};
