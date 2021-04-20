import { CartActionButtons } from "./CartActionButtons";
import { MoveToWishlistButton } from "./MoveToWishlistButton";
import { useState } from "react";
import { Toast } from "../Toast";

export const CartItemCard = ({ product }) => {
  const [message, setMessage] = useState({ msg: "", msgType: "" });
  const [disableButtonWhileProcessing, setDisableButton] = useState(false);

  return (
    <div className="card-horizontal border-width-1px default-container">
      {message.msgType === "toast-inform" && <Toast {...message} />}
      {message.msgType === "toast-success" && <Toast {...message} />}
      {message.msgType === "toast-error" && <Toast {...message} />}

      <div className="image-container">
        <img
          className="img-responsive card-img"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="text-container">
        <div className="text-container-title">
          <h6 className="text-regular-weight">{product.name}</h6>
        </div>

        <div className="text-container-desc">
          <p className="text-regular-weight body-cp-md">
            Rs.
            {(product.price *
              product.quantity *
              (100 - Number(product.offer))) /
              100}{" "}
            <span className="text-light-weight body-cp-sm text-strike-through">
              Rs.{product.price * product.quantity}
            </span>{" "}
            <span className="text-light-weight body-cp-sm primary-text-color">
              ({product.offer}%OFF)
            </span>
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
  );
};
