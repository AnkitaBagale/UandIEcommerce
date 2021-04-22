import { useReducer, useState } from "react";
import { Link } from "react-router-dom";

import { InputPasswordField } from "./InputPasswordField";
import Loader from "react-loader-spinner";
import { useAuthentication } from "../../context";

export const SignUp = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const { signUpNewUser } = useAuthentication();

  const errorsInitialState = {
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
    firstnameError: "",
    lastnameError: ""
  };

  const errorReducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_FIRSTNAME_ERROR":
        return { ...state, firstnameError: payload };

      case "SET_LASTNAME_ERROR":
        return { ...state, lastnameError: payload };

      case "SET_USERNAME_ERROR":
        return { ...state, usernameError: payload };

      case "SET_PASSWORD_ERROR":
        return { ...state, passwordError: payload };

      case "SET_RE_PASSWORD_ERROR":
        return { ...state, confirmPasswordError: payload };

      case "CLEAR_ERRORS_ERROR":
        return { errorsInitialState };

      default:
        return state;
    }
  };

  const [fieldErrors, errorsDispatch] = useReducer(
    errorReducer,
    errorsInitialState
  );

  const onFocusClearError = (type) => {
    errorsDispatch({ type, payload: "" });
  };
  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: ""
  };

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_FIRSTNAME":
        return { ...state, firstname: payload };

      case "SET_LASTNAME":
        return { ...state, lastname: payload };

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

  const checkFormValidity = () => {
    let errorFlag = true;
    if (
      formState.firstname === "" ||
      !/^[a-zA-Z]+(\s*\w*)*$/.test(formState.firstname)
    ) {
      errorsDispatch({
        type: "SET_FIRSTNAME_ERROR",
        payload: "Please enter valid name"
      });
      errorFlag = false;
    }
    if (
      formState.lastname === "" ||
      !/^[a-zA-Z]+(\s*\w*)*$/.test(formState.lastname)
    ) {
      errorsDispatch({
        type: "SET_LASTNAME_ERROR",
        payload: "Please enter valid surname"
      });
      errorFlag = false;
    }
    if (formState.username === "" || !/^.+@.+\.com$/.test(formState.username)) {
      errorsDispatch({
        type: "SET_USERNAME_ERROR",
        payload: "Please enter valid email id"
      });
      errorFlag = false;
    }
    if (
      formState.password === "" ||
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
        formState.password
      )
    ) {
      errorsDispatch({
        type: "SET_PASSWORD_ERROR",
        payload:
          "Password length should contain minimum 8 characters (at least one capital, small letter and number)"
      });
      errorFlag = false;
    }
    if (
      formState.confirmPassword === "" ||
      formState.password !== formState.confirmPassword
    ) {
      errorsDispatch({
        type: "SET_RE_PASSWORD_ERROR",
        payload: "Password does not match"
      });
      errorFlag = false;
    }

    return errorFlag;
  };

  const formSubmitHandler = async (
    e,
    firstname,
    lastname,
    username,
    password
  ) => {
    e.preventDefault();
    setError("");
    if (checkFormValidity()) {
      setLoading(true);
      const response = await signUpNewUser({
        firstname,
        lastname,
        username,
        password
      });
      if (response.status === 201) {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setError(
          response?.data?.message || "Something went wrong, please try again!"
        );
      }
    }
  };

  return (
    <div className="form-container shadow-box overlay-container">
      {!showSuccess ? (
        <>
          <h1 className="h4 text-center">SIGN UP</h1>
          <p className="text-center padding-bottom-1rem">
            Fill below form to sign up and enjoy special offers in U&I store
          </p>
          <form className="submit-form-example display-flex-column">
            <div className="row">
              <div className="column-30-pc column1">
                <label className="form-label text-regular-weight body-cp-md form-label-required-field">
                  First Name
                </label>
              </div>

              <div className="column-70-pc">
                <input
                  className="form-field"
                  placeholder="Enter your first name"
                  value={formState.firstname}
                  onChange={(e) => {
                    formDispatch({
                      type: "SET_FIRSTNAME",
                      payload: e.target.value
                    });
                  }}
                  onFocus={() => {
                    onFocusClearError("SET_FIRSTNAME_ERROR");
                  }}
                />
                <div
                  style={{
                    display: fieldErrors.firstnameError ? "block" : "none"
                  }}
                  className="form-validation-msg form-field-error"
                >
                  <span className="form-field-symbol">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.firstnameError}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column-30-pc column1">
                <label className="form-label text-regular-weight body-cp-md form-label-required-field">
                  Last Name
                </label>
              </div>

              <div className="column-70-pc">
                <input
                  className="form-field"
                  placeholder="Enter your last name"
                  value={formState.lastname}
                  onChange={(e) => {
                    formDispatch({
                      type: "SET_LASTNAME",
                      payload: e.target.value
                    });
                  }}
                  onFocus={() => {
                    onFocusClearError("SET_LASTNAME_ERROR");
                  }}
                />
                <div
                  style={{
                    display: fieldErrors.lastnameError ? "block" : "none"
                  }}
                  className="form-validation-msg form-field-error"
                >
                  <span className="form-field-symbol">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.lastnameError}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column-30-pc column1">
                <label className="form-label text-regular-weight body-cp-md form-label-required-field">
                  Email/Username
                </label>
              </div>

              <div className="column-70-pc">
                <input
                  className="form-field"
                  placeholder="Enter your email"
                  value={formState.username}
                  onChange={(e) => {
                    formDispatch({
                      type: "SET_USERNAME",
                      payload: e.target.value
                    });
                  }}
                  onFocus={() => {
                    onFocusClearError("SET_USERNAME_ERROR");
                  }}
                />
                <div
                  style={{
                    display: fieldErrors.usernameError ? "block" : "none"
                  }}
                  className="form-validation-msg form-field-error"
                >
                  <span className="form-field-symbol">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.usernameError}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column-30-pc column1">
                <label className="form-label text-regular-weight body-cp-md form-label-required-field">
                  Password
                </label>
              </div>

              <div className="column-70-pc">
                <InputPasswordField
                  placeholderText={"Enter new password"}
                  value={formState.password}
                  onChangeHandler={(e) => {
                    formDispatch({
                      type: "SET_PASSWORD",
                      payload: e.target.value
                    });
                  }}
                  onFocusHandler={() => {
                    onFocusClearError("SET_PASSWORD_ERROR");
                  }}
                />
                <div
                  style={{
                    display: fieldErrors.passwordError ? "block" : "none"
                  }}
                  className="form-validation-msg form-field-error"
                >
                  <span className="form-field-symbol">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.passwordError}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column-30-pc column1">
                <label className="form-label text-regular-weight body-cp-md form-label-required-field">
                  Confirm Password
                </label>
              </div>

              <div className="column-70-pc">
                <InputPasswordField
                  placeholderText={"Re-type your password"}
                  value={formState.confirmPassword}
                  onChangeHandler={(e) => {
                    formDispatch({
                      type: "SET_RE_PASSWORD",
                      payload: e.target.value
                    });
                  }}
                  onFocusHandler={() => {
                    onFocusClearError("SET_RE_PASSWORD_ERROR");
                  }}
                />
                <div
                  style={{
                    display:
                      fieldErrors.confirmPasswordError ||
                      formState.password !== formState.confirmPassword
                        ? "block"
                        : "none"
                  }}
                  className="form-validation-msg form-field-error"
                >
                  <span className="form-field-symbol">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.confirmPasswordError ||
                    (formState.password !== formState.confirmPassword
                      ? "Password does not match"
                      : "")}
                </div>
              </div>
            </div>

            <button
              className="btn btn-solid-primary"
              type="submit"
              onClick={(e) =>
                formSubmitHandler(
                  e,
                  formState.firstname,
                  formState.lastname,
                  formState.username,
                  formState.password
                )
              }
            >
              REGISTER
            </button>
          </form>
          <div
            style={{
              display: error !== "" ? "block" : "none",
              color: "#ff9204"
            }}
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
        </>
      ) : (
        <div className="text-center">
          <h5>Thank you for signing up!</h5>
          <p className="body-cp-lg">Continue shopping with us.</p>
          <Link to={"/shop"} className="btn btn-solid-primary">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};