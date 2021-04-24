import axios from "axios";
import React, { useState } from "react";
import { AddressEditor } from "./AddressEditor";
import { useAuthentication } from "../../../../context";

export const AddressCard = ({ address }) => {
  const [isEditMode, setEditMode] = useState(false);
  const { userId, setAddressDetails } = useAuthentication();
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState("");

  const removeAddress = async () => {
    try {
      const url = `https://uandistoreapi.herokuapp.com/users/${userId}/addresses/${address._id}`;

      const {
        data: { response }
      } = await axios.post(url, { _id: address._id, active: false });

      setAddressDetails(response);
    } catch (error) {
      setError("Please try again!");
    }
  };
  return (
    <li className="card-horizontal shadow-box">
      <div className="text-container secondary-text-color">
        <h4 className="body-cp-rg">{address.name}</h4>

        <p className="body-cp-md">{address.streetAddress}</p>

        <p className="body-cp-md">{`${address.city}, ${address.state} ${address.zipCode}`}</p>

        <p className="body-cp-md">{address.country}</p>

        <p className="body-cp-md">Phone number:{address.phoneNumber}</p>

        <div className="CTA-Container">
          <button
            className="btn btn-sm-size btn-solid-primary"
            onClick={(e) => {
              setEditMode((isEditMode) => !isEditMode);
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-sm-size btn-outline-secondary"
            onClick={removeAddress}
          >
            Remove
          </button>
        </div>

        <div className="error-msg">{error}</div>
      </div>

      {isEditMode && (
        <AddressEditor
          existingAddress={address}
          isEditMode={isEditMode}
          setEditMode={setEditMode}
        />
      )}
    </li>
  );
};
