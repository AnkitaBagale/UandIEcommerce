import { AddressCard } from "./AddressCard";
import React, { useEffect, useState } from "react";

import { AddressEditor } from "./AddressEditor";
import { useAuthentication } from "../../../../context";
import axios from "axios";

export const AddressList = ({ setAddresses, addresses = addressesData }) => {
  const [isAddNew, setAddNew] = useState(false);
  const { userId, addressDetails, setAddressDetails } = useAuthentication();
  useEffect(() => {
    (async () => {
      try {
        if (!addressDetails) {
          const {
            data: { response }
          } = await axios.get(
            `https://uandistoreapi.herokuapp.com/users/${userId}/addresses`
          );
          console.log(response);
          setAddressDetails(response);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <h2 className="body-cp-rg padding-bottom-1rem margin-0">My Addresses</h2>

      <ul className="list-style-none styled-list">
        {addressDetails &&
          addressDetails.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              addresses={addresses}
              setAddresses={setAddresses}
            />
          ))}
      </ul>

      <button
        className="btn btn-text-icon-secondary"
        onClick={() => {
          setAddNew(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <span className="btn-icon">
          <i className="fas fa-plus"></i>
        </span>
        ADD NEW ADDRESS
      </button>

      {isAddNew && <AddressEditor setAddNew={setAddNew} isAddNew={isAddNew} />}
    </>
  );
};
