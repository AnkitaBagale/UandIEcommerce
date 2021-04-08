import { checkStatus, isAlreadyAdded } from "../array-update-functions";
import { useAuth, useStateContext } from "../context";
import { serverRequest } from "../server-request";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const LikeButton = ({
  product,
  setMessage,
  disableButtonWhileProcessing,
  setDisableButton
}) => {
  const { state, dispatch } = useStateContext();
  const navigate = useNavigate();
  let isRendered = useRef(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    isRendered.current = true;
    return () => {
      isRendered.current = false;
    };
  }, []);

  const likeHandler = async () => {
    !checkStatus(state.itemsInWishlist, product.id)
      ? setMessage({ msg: "adding to wishlist..", msgType: "toast-inform" })
      : setMessage({
          msg: "removing from wishlist..",
          msgType: "toast-inform"
        });
    setDisableButton(true);

    try {
      if (isAlreadyAdded(state.itemsInWishlist, product.id)) {
        await serverRequest({
          requestType: "PUT",
          url: "api/wishlists",
          dataToOperateId: product.id,
          dataToOperate: {
            wishlist: {
              ...product,
              status: { exist: !checkStatus(state.itemsInWishlist, product.id) }
            }
          }
        });
      } else {
        await serverRequest({
          requestType: "POST",
          url: "api/wishlists",
          dataToOperateId: product.id,
          dataToOperate: {
            wishlist: { ...product, status: { exist: true } }
          }
        });
      }
      dispatch({
        type: "ADD_OR_REMOVE_TO_WISHLIST",
        payload: product
      });
    } catch {
      if (isRendered.current) {
        setMessage({
          msg: "failed!",
          msgType: "toast-error"
        });
      }
    } finally {
      if (isRendered.current) {
        setDisableButton(false);
      }
    }
  };
  return (
    <button
      className={
        disableButtonWhileProcessing
          ? "like-btn link-no-style btn-disabled"
          : "like-btn link-no-style"
      }
      disabled={disableButtonWhileProcessing}
      style={{
        color: checkStatus(state.itemsInWishlist, product.id)
          ? "var(--primary-color)"
          : ""
      }}
      onClick={() => {
        isLoggedIn ? likeHandler() : navigate("/login");
      }}
    >
      <span>
        <i className="fas fa-heart"></i>
      </span>
    </button>
  );
};
