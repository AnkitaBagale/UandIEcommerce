import { useState } from "react";

import { CartActionButtons } from "./CartActionButtons";
import { MoveToWishlistButton } from "./MoveToWishlistButton";
import { Toast } from "../Toast";
import { Link } from "react-router-dom";

export const CartItemCard = ({ product }) => {
  const [message, setMessage] = useState({ msg: "", msgType: "" });
  const [disableButtonWhileProcessing, setDisableButton] = useState(false);

  return (
    <>
      {message.msgType === "toast-inform" && <Toast {...message} />}
      {message.msgType === "toast-success" && <Toast {...message} />}
      {message.msgType === "toast-error" && <Toast {...message} />}
      <div
        to={`/shop/${product._id}`}
        className="card-horizontal border-width-1px default-container"
      >
        <div className="image-container">
          <Link to={`/shop/${product._id}`} className="link-no-style">
            <img
              className="img-responsive card-img"
              src={product.image}
              alt={product.name}
            />
          </Link>
        </div>
        <div className="text-container">
          <Link to={`/shop/${product._id}`} className="link-no-style">
            <div className="text-container-title">
              <h6 className="text-regular-weight">{product.name}</h6>
            </div>
          </Link>

          <div className="text-container-desc">
            <p className="text-regular-weight body-cp-md">
              Rs.
              {(product.price *
                product.quantity *
                (100 - Number(product.offer))) /
                100}{" "}
              {Number(product.offer) > 0 && (
                <>
                  <span className="text-light-weight body-cp-sm text-strike-through">
                    Rs.{product.price * product.quantity}
                  </span>{" "}
                  <span className="text-light-weight body-cp-sm primary-text-color">
                    ({product.offer}%OFF)
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="CTA-Container">
            <CartActionButtons
              product={product}
              setMessage={setMessage}
              disableButtonWhileProcessing={disableButtonWhileProcessing}
              setDisableButton={setDisableButton}
            />

            <MoveToWishlistButton
              product={product}
              setMessage={setMessage}
              disableButtonWhileProcessing={disableButtonWhileProcessing}
              setDisableButton={setDisableButton}
            />
          </div>
        </div>
      </div>
    </>
  );
};
