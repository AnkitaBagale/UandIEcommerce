import axios from "axios";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthentication } from "../../../context";
import "./profile.css";
export const ProfilePage = () => {
  const { userId, setUserDetails, userDetails } = useAuthentication();

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
    <div className="user-profile-container padding-around-1rem">
      <h1 className="h4 text-center padding-bottom-1rem">Account</h1>
      <div className="filter-divider-line"></div>
      <div className="display-flex">
        <div className="column-20-pc column1 border-right-2px ">
          <ul className="styled-list list-style-none margin-1rem">
            <li>
              <NavLink
                to="/profile"
                end
                activeClassName="text-green text-regular-weight"
                className="link-no-style"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/address"
                activeClassName="text-green text-regular-weight"
                className="link-no-style"
              >
                Addresses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/settings"
                activeClassName="text-green text-regular-weight"
                className="link-no-style"
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="column-80-pc">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
