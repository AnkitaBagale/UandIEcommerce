import { useReducer } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context";
import "./login.css";

export const Login = () => {
  const { authHandler } = useAuth();
  const { state } = useLocation();
  console.log({ state });
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

  const formSubmitHandler = (e) => {
    e.preventDefault();
    authHandler({
      username: formState.username,
      password: formState.password,
      from: state?.from ? state.from : "/"
    });
  };

  return (
    <div className="form-container shadow-box">
      <h1 className="h4 padding-bottom-1rem text-center">LOGIN</h1>
      <form className="submit-form-example display-flex-column">
        <div className="row">
          <input
            className="form-field"
            placeholder="Enter username here"
            required
            value={formState.username}
            onChange={(e) => {
              formDispatch({ type: "SET_USERNAME", payload: e.target.value });
            }}
          />
          <div className="form-validation-msg form-field-error">
            <span className="form-field-symbol">
              <i className="fas fa-exclamation-circle"></i>
            </span>
            Please fill username!
          </div>
        </div>

        <div className="row">
          <input
            className="form-field"
            placeholder="Enter password here"
            required
            value={formState.password}
            onChange={(e) => {
              formDispatch({ type: "SET_PASSWORD", payload: e.target.value });
            }}
          />
          <div className="form-validation-msg form-field-error">
            <span className="form-field-symbol">
              <i className="fas fa-exclamation-circle"></i>
            </span>
            Password should contain atleast one number!
          </div>
        </div>

        <button
          className="btn btn-solid-primary"
          type="submit"
          onClick={formSubmitHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
