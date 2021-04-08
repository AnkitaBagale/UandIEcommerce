import { useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context";
import { InputPasswordField } from "./hide-show-password";
import Loader from "react-loader-spinner";

export const ForgotPassword = () => {
  const { authHandler } = useAuth();
  const { state } = useLocation();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const initialState = {
    username: "",
    password: "",
    confirmPassword: ""
  };

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_USERNAME":
        return { ...state, username: payload };

      case "SET_PASSWORD":
        return { ...state, password: payload };

      case "SET_RE_PASSWORD":
        return { ...state, confirmPassword: payload };

      default:
        return state;
    }
  };

  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const formSubmitHandler = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    const res = await authHandler({
      username: formState.username,
      password: formState.password,
      from: state?.from ? state.from : "/"
    });
    if (res.status === 401) {
      setError(res.response);
      setLoading(false);
    }
  };

  return (
    <div className="form-container shadow-box overlay-container">
      <h1 className="h4 padding-bottom-1rem text-center">Reset Password</h1>
      <p>Enter your username and enter new password</p>
      <form
        className="submit-form-example display-flex-column"
        onSubmit={formSubmitHandler}
      >
        <div className="row">
          <input
            className="form-field"
            placeholder="Enter your username here"
            required
            value={formState.username}
            onChange={(e) => {
              formDispatch({ type: "SET_USERNAME", payload: e.target.value });
            }}
          />
        </div>

        <div className="row">
          <InputPasswordField
            placeholderText={"Enter new password here"}
            value={formState.password}
            onChangeHandler={(e) => {
              formDispatch({ type: "SET_PASSWORD", payload: e.target.value });
            }}
          />
        </div>

        <div className="row">
          <InputPasswordField
            placeholderText={"Re-type your password here"}
            value={formState.confirmPassword}
            onChangeHandler={(e) => {
              formDispatch({
                type: "SET_RE_PASSWORD",
                payload: e.target.value
              });
            }}
          />
        </div>

        {formState.password !== "" &&
          formState.confirmPassword !== "" &&
          formState.password !== formState.confirmPassword && (
            <div style={{ color: "#ff9204" }}>
              <span className="form-field-symbol">
                <i className="fas fa-exclamation-circle"></i>
              </span>
              Password does not match
            </div>
          )}

        <button className="btn btn-solid-primary" type="submit">
          RESET
        </button>
      </form>
      <div
        style={{ display: error !== "" ? "block" : "none", color: "#ff9204" }}
      >
        <span className="form-field-symbol">
          <i className="fas fa-exclamation-circle"></i>
        </span>
        {error}
      </div>
      {isLoading && (
        <div className="overlay-text">
          <Loader type="TailSpin" color="#ff3f6c" height={80} width={80} />
        </div>
      )}
    </div>
  );
};
