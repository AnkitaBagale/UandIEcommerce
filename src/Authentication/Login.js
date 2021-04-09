import { useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context";
import "./login.css";
import Loader from "react-loader-spinner";
import { InputPasswordField } from "./hide-show-password";

export const Login = () => {
  const { authHandler } = useAuth();
  const { state } = useLocation();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const initialState = {
    username: "",
    password: ""
  };

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_USERNAME":
        return { ...state, username: payload };

      case "SET_PASSWORD":
        return { ...state, password: payload };

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
      <h1 className="h4 padding-bottom-1rem text-center">LOGIN</h1>
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
            placeholderText={"Enter your password here"}
            value={formState.password}
            onChangeHandler={(e) => {
              formDispatch({ type: "SET_PASSWORD", payload: e.target.value });
            }}
          />
        </div>

        <button className="btn btn-solid-primary" type="submit">
          LOGIN
        </button>
        <div
          className="padding-bottom-1rem"
          style={{ display: error !== "" ? "block" : "none", color: "#ff9204" }}
        >
          <span className="form-field-symbol">
            <i className="fas fa-exclamation-circle"></i>
          </span>
          {error}
        </div>
        <div className="body-cp-md padding-bottom-1rem">
          Forgot your password?{" "}
          <Link
            to="/forgot"
            state={{ from: state?.from ? state.from : "/" }}
            className="link-text link-text-primary"
          >
            Reset here
          </Link>
        </div>
        <div className="body-cp-md padding-bottom-1rem">
          Not a user yet?{" "}
          <Link
            to="/signup"
            state={{ from: state?.from ? state.from : "/" }}
            className="link-text link-text-primary"
          >
            Create your account
          </Link>
        </div>
      </form>

      {isLoading && (
        <div className="overlay-text">
          <Loader type="TailSpin" color="#ff3f6c" height={80} width={80} />
        </div>
      )}
    </div>
  );
};
