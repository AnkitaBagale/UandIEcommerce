import { useEffect, useRef, useState } from "react";

import { useAuthentication, useStateContext } from "../../context";
import { AddToCartButton } from "../Cart";
import { addProductToWishlist } from "../../utils";
import { Toast } from "../Toast";

export const WishlistItemCard = ({ product }) => {
  const { state, dispatch } = useStateContext();
  const [message, setMessage] = useState({ msg: "", msgType: "" });
  const [disableButtonWhileProcessing, setDisableButton] = useState(false);
  const { userId } = useAuthentication();
  let isRendered = useRef(null);

  useEffect(() => {
    isRendered.current = true;

    return () => {
      isRendered.current = false;
    };
  });

  return (
    <div className="card-vertical border-width-1px">
      {message.msgType === "toast-inform" && <Toast {...message} />}
      {message.msgType === "toast-success" && <Toast {...message} />}
      {message.msgType === "toast-error" && <Toast {...message} />}

      <button
        disabled={disableButtonWhileProcessing}
        type="button"
        className={
          disableButtonWhileProcessing ? "btn-close btn-disabled" : "btn-close"
        }
        onClick={() => {
          addProductToWishlist({
            state,
            dispatch,
            setMessage,
            setDisableButton,
            product,
            isRendered,
            userId
          });
        }}
      ></button>
      <div className="image-container badge-container">
        <img
          className="img-responsive card-img"
          src={product.image}
          alt={product.name}
        />
        <span
          style={{ display: product.inStock ? "none" : "block" }}
          className="badge bg-secondary"
        >
          sold out
        </span>
      </div>
      <div className="text-container">
        <div className="text-container-title">
          <h6 className="text-regular-weight product-title">{product.name}</h6>
        </div>
        <div className="text-container-desc">
          <p className="body-cp-md">{product.brand}</p>
          <p className="text-regular-weight body-cp-md">
            Rs.{product.price}
            <span className="text-light-weight">
              <span className="primary-text-color body-cp-sm">
                {" "}
                ({product.offer}% OFF)
              </span>
            </span>
          </p>
        </div>
        <div className="CTA-Container">
          <AddToCartButton
            key={product._id}
            product={product}
            setMessage={setMessage}
            disableButtonWhileProcessing={disableButtonWhileProcessing}
            setDisableButton={setDisableButton}
          />
        </div>
      </div>
    </div>
  );
};
