import { useEffect, useRef } from "react";
import "./toast.css";

export const Toast = ({ msg, msgType }) => {
  const toastRef = useRef(null);
  useEffect(() => {
    let timerid = setTimeout(() => {
      toastRef.current.style.display = "none";
    }, 1000);

    return () => {
      clearTimeout(timerid);
    };
  }, []);

  return (
    <div
      ref={toastRef}
      className={`toast ${msgType}`}
      style={{ display: msg ? "block" : "none" }}
    >
      {msg}
    </div>
  );
};
