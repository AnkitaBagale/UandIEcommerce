import React, { useEffect, useReducer, useState } from "react";
import { statesInCountryWise, countries } from "/src/database";
import { formReducer, errorsReducer } from "./reducers";
import { useAuthentication } from "/src/context";
import axios from "axios";

const defaultAddress = {
  _id: null,
  name: "",
  streetAddress: "",
  city: "",
  state: statesInCountryWise[countries[0]][0],
  country: countries[0],
  zipCode: "",
  phoneNumber: ""
};

export const AddressEditor = ({
  existingAddress = defaultAddress,
  setEditMode,
  setAddNew,
  isAddNew = false,
  isEditMode = false
}) => {
  const [formState, formDispatch] = useReducer(formReducer, {
    ...existingAddress
  });

  const defaultErrors = {
    _id: null,
    nameError: "",
    streetAddressError: "",
    cityError: "",
    stateError: "",
    countryError: "",
    zipCodeError: "",
    phoneNumberError: ""
  };

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState("");
  const [fieldErrors, errorsDispatch] = useReducer(
    errorsReducer,
    defaultErrors
  );
  const { userId, setAddressDetails } = useAuthentication();

  const onFocusClearError = (type) => {
    errorsDispatch({ type, payload: "" });
  };

  const formValidation = () => {
    const newErrors = {
      nameError: !formState.name.trim() ? "Please fill the name!" : "",

      streetAddressError: !formState.streetAddress.trim()
        ? "Please fill the address!"
        : "",

      cityError: !formState.city.trim() ? "Please fill the city!" : "",

      zipCodeError: !/^[1-9][0-9]{4}[1-9]$/.test(formState.zipCode)
        ? "Please enter valid zip code!"
        : "",

      phoneNumberError: !/^(\+91)?\s?[1-9][0-9]{9}$/.test(formState.phoneNumber)
        ? "Please enter valid phone number!"
        : ""
    };
    errorsDispatch({ type: "SET_ALL_ERRORS", payload: newErrors });
    if (
      newErrors.nameError ||
      newErrors.streetAddressError ||
      newErrors.cityError ||
      newErrors.zipCodeError ||
      newErrors.phoneNumberError
    ) {
      return false;
    } else {
      return true;
    }
  };

  const submitFormHandler = async () => {
    try {
      if (formValidation()) {
        let url = `https://uandistoreapi.herokuapp.com/users/${userId}/addresses`;

        const addAddress = {
          name: formState.name,
          streetAddress: formState.streetAddress,
          city: formState.city,
          state: formState.state
            ? formState.state
            : statesInCountryWise[formState.country][0],
          country: formState.country,
          zipCode: formState.zipCode,
          phoneNumber: formState.phoneNumber,
          userId: userId
        };

        if (existingAddress._id !== null) {
          url = `https://uandistoreapi.herokuapp.com/users/${userId}/addresses/${existingAddress._id}`;
        }

        const {
          data: { response }
        } = await axios.post(url, addAddress);

        setAddressDetails(response);
        document.body.style.overflow = "visible";
        console.log(response);
        existingAddress._id !== null ? setEditMode(false) : setAddNew(false);
      }
    } catch (error) {
      console.log(error);
      setApiError("Please try again");
    }
  };

  return (
    <>
      <div className="modal-interstitial active">
        <div
          className="modal-content vertical-middle"
          style={{ height: "auto" }}
        >
          <div>
            <h2 className="body-cp-rg padding-bottom-1rem">ADD NEW ADDRESS</h2>
            <div className="row">
              <select
                className="form-field"
                value={formState.country}
                onChange={(e) => {
                  formDispatch({
                    type: "SET_COUNTRY",
                    payload: e.target.value
                  });
                }}
              >
                {countries.map((countryName) => (
                  <option key={countryName} value={countryName}>
                    {countryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <input
                className="form-field"
                type="text"
                placeholder="Enter name"
                value={formState.name}
                onChange={(e) => {
                  formDispatch({ type: "SET_NAME", payload: e.target.value });
                }}
                onFocus={() => {
                  onFocusClearError("SET_NAME_ERROR");
                }}
              />

              <div
                className="form-validation-msg form-field-error"
                style={{
                  display: fieldErrors.nameError === "" ? "none" : "block"
                }}
              >
                <span className="form-field-symbol">
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                {fieldErrors.nameError}
              </div>
            </div>
            <div className="row">
              <input
                className="form-field"
                type="text"
                placeholder="Enter house no., street, colony"
                value={formState.streetAddress}
                onChange={(e) => {
                  formDispatch({
                    type: "SET_STREET",
                    payload: e.target.value
                  });
                }}
                onFocus={() => {
                  onFocusClearError("SET_STREET_ERROR");
                }}
              />
              <div
                className="form-validation-msg form-field-error"
                style={{
                  display:
                    fieldErrors.streetAddressError === "" ? "none" : "block"
                }}
              >
                <span className="form-field-symbol">
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                {fieldErrors.streetAddressError}
              </div>
            </div>
            <div className="row">
              <input
                className="form-field"
                type="text"
                placeholder="Enter city"
                value={formState.city}
                onChange={(e) => {
                  formDispatch({ type: "SET_CITY", payload: e.target.value });
                }}
                onFocus={() => {
                  onFocusClearError("SET_CITY_ERROR");
                }}
              />
              <div
                className="form-validation-msg form-field-error"
                style={{
                  display: fieldErrors.cityError === "" ? "none" : "block"
                }}
              >
                <span className="form-field-symbol">
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                {fieldErrors.cityError}
              </div>
            </div>
            <div className="row">
              <select
                className="form-field"
                value={formState.state}
                onChange={(e) => {
                  formDispatch({
                    type: "SET_STATE",
                    payload: e.target.value
                  });
                }}
              >
                {statesInCountryWise[formState.country].map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <input
                className="form-field"
                placeholder="Enter zip code"
                value={formState.zipCode}
                onChange={(e) => {
                  formDispatch({
                    type: "SET_ZIPCODE",
                    payload: e.target.value
                  });
                }}
                onFocus={() => {
                  onFocusClearError("SET_ZIPCODE_ERROR");
                }}
              />
              <div
                className="form-validation-msg form-field-error"
                style={{
                  display: fieldErrors.zipCodeError === "" ? "none" : "block"
                }}
              >
                <span className="form-field-symbol">
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                {fieldErrors.zipCodeError}
              </div>
            </div>
            <div className="row">
              <input
                className="form-field"
                type="text"
                placeholder="Enter mobile number"
                value={formState.phoneNumber}
                onChange={(e) => {
                  formDispatch({
                    type: "SET_PHONE_NUMBER",
                    payload: e.target.value
                  });
                }}
                onFocus={() => {
                  onFocusClearError("SET_PHONE_NUMBER_ERROR");
                }}
              />
              <div
                className="form-validation-msg form-field-error"
                style={{
                  display:
                    fieldErrors.phoneNumberError === "" ? "none" : "block"
                }}
              >
                <span className="form-field-symbol">
                  <i className="fas fa-exclamation-circle"></i>
                </span>
                {fieldErrors.phoneNumberError}
              </div>
            </div>

            <div className="CTA-Container">
              <button
                className="btn btn-solid-primary btn-sm-size"
                type="submit"
                onClick={submitFormHandler}
              >
                Save
              </button>

              <button
                className="btn btn-outline-primary btn-sm-size"
                onClick={() => {
                  document.body.style.overflow = "visible";
                  existingAddress._id !== null
                    ? setEditMode(false)
                    : setAddNew(false);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
            {loading}
            <div
              className="form-validation-msg form-field-error"
              style={{ display: apiError === "" ? "none" : "block" }}
            >
              <span className="form-field-symbol">
                <i className="fas fa-exclamation-circle"></i>
              </span>
              {apiError}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
