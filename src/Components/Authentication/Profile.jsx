import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../context";
import avatarImg from "./Images/user.svg";
import "./styles.css";

export const Profile = () => {
  const {
    userId,
    logOutUser,
    setUserDetails,
    userDetails
  } = useAuthentication();

  useEffect(() => {
    if (!userDetails) {
      (async () => {
        try {
          const {
            data: { response },
            status
          } = await axios.get(
            `https://uandistoreapi.herokuapp.com/users/${userId}`
          );

          if (status === 200) {
            setUserDetails(response);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <div className="user-rofile-container padding-around-1rem">
      <h1 className="h4 text-center padding-bottom-1rem">Account</h1>
      <div className="filter-divider-line"></div>
      <div>
        <h2 className="body-cp-lg">Profile Details</h2>
        <div className="filter-divider-line"></div>
        <div class="grid-50-50-layout margin-auto">
          <div className="image-container badge-container">
            <img
              className="img-responsive card-img"
              src={avatarImg}
              alt="profile"
            />
          </div>

          <div className="text-container">
            <div className="row">
              <div className="column-30-pc column1">
                <span>Full Name</span>
              </div>
              <div className="column-80-pc">
                <span>
                  {userDetails?.firstname} {userDetails?.lastname}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="column-70-pc column1">
                <span>Email ID</span>
              </div>
              <div className="column-80-pc">
                <span>{userDetails?.email}</span>
              </div>
            </div>
            <div className="CTA-Container">
              <button className="btn btn-solid-primary" onClick={logOutUser}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
