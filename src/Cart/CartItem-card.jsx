import { CartActionButtons } from "./Cart-action-button";
import { WishlistButton } from "../Wishlist";
import { useState } from "react";
import { Toast } from "../Toast";

export const CartItemCard = ({ product }) => {
  const [message, setMessage] = useState({ msg: "", msgType: "" });
  const [disableButtonWhileProcessing, setDisableButton] = useState(false);

  return (
    <div className="card-horizontal shadow-box">
      {message.msgType === "toast-inform" && <Toast {...message} />}
      {message.msgType === "toast-success" && <Toast {...message} />}
      {message.msgType === "toast-error" && <Toast {...message} />}

      <div className="column-20-pc image-container">
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
          <p className="text-regular-weight">
            Rs.{product.price * product.cartQty}
          </p>
        </div>

        <div className="CTA-Container">
          <CartActionButtons
            product={product}
            setMessage={setMessage}
            disableButtonWhileProcessing={disableButtonWhileProcessing}
            setDisableButton={setDisableButton}
          />
          <WishlistButton
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
