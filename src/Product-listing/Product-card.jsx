import { AddToCartButton } from "../Cart";
import { LikeButton } from "./Like-button";
import { useState } from "react";
import { Toast } from "../Toast";

export const ProductCard = ({ product }) => {
  const [message, setMessage] = useState({ msg: "", msgType: "" });
  const [disableButtonWhileProcessing, setDisableButton] = useState(false);

  return (
    <div className="card-vertical">
      {message.msgType === "toast-inform" && <Toast {...message} />}
      {message.msgType === "toast-success" && <Toast {...message} />}
      {message.msgType === "toast-error" && <Toast {...message} />}

      <div className="overlay-container">
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
              <LikeButton
                key={product.id}
                product={product}
                setMessage={setMessage}
                disableButtonWhileProcessing={disableButtonWhileProcessing}
                setDisableButton={setDisableButton}
              />
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

      <div
        style={{ display: product.inStock ? "none" : "flex" }}
        className="overlay-text"
      >
        <div className="body-cp-lg text-container text-center">
          Out Of Stock
        </div>
      </div>
    </div>
  );
};
