import { useStateContext } from "../context";
import { AddToCartButton } from "../Cart";
import { useEffect, useRef, useState } from "react";
import { serverRequest } from "../server-request";
import { Toast } from "../Toast";

export const WishlistItemCard = ({ product }) => {
  const { dispatch } = useStateContext();
  const [message, setMessage] = useState({ msg: "", msgType: "" });
  const [disableButtonWhileProcessing, setDisableButton] = useState(false);

  let isRendered = useRef(null);

  useEffect(() => {
    isRendered.current = true;

    return () => {
      isRendered.current = false;
    };
  });

  const removeFromWishlist = async () => {
    setDisableButton(true);
    setMessage({ msg: "removing from wishlist..", msgType: "toast-inform" });

    try {
      await serverRequest({
        requestType: "PUT",
        url: "api/wishlists",
        dataToOperateId: product.id,
        dataToOperate: { wishlist: { ...product, status: { exists: false } } }
      });

      dispatch({
        type: "ADD_OR_REMOVE_TO_WISHLIST",
        payload: product
      });
    } catch {
      if (isRendered.current)
        setMessage({
          msg: "failed!",
          msgType: "toast-error"
        });
    } finally {
      if (isRendered.current) setDisableButton(false);
    }
  };

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
        onClick={removeFromWishlist}
      ></button>
      <div className="image-container badge-container">
        <img
          className="img-responsive card-img"
          src={product.image}
          alt={product.name}
        />
        <span
          style={{ display: product.inStock ? "none" : "block" }}
          class="badge bg-secondary"
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
            key={product.id}
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
