import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { checkStatus, addProductToWishlist } from "../../utils";
import { useAuthentication, useStateContext } from "../../context";

export const LikeButton = ({
  product,
  setMessage,
  disableButtonWhileProcessing,
  setDisableButton
}) => {
  const { state, dispatch } = useStateContext();
  const navigate = useNavigate();
  let isRendered = useRef(false);
  const { isUserLoggedIn, userId } = useAuthentication();

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  return (
    <button
      className={
        disableButtonWhileProcessing
          ? "like-btn link-no-style btn-disabled"
          : "like-btn link-no-style"
      }
      disabled={disableButtonWhileProcessing}
      style={{
        color: checkStatus(state.itemsInWishlist, product._id)
          ? "var(--primary-color)"
          : ""
      }}
      onClick={() => {
        isUserLoggedIn
          ? addProductToWishlist({
              state,
              dispatch,
              setMessage,
              setDisableButton,
              product,
              isRendered,
              userId
            })
          : navigate("/login");
      }}
    >
      <span>
        <i className="fas fa-heart"></i>
      </span>
    </button>
  );
};
