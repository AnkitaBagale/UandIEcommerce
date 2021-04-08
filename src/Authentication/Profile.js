import "./profile.css";
import avatarImg from "./Images/user.svg";
import { useAuth } from "../context";

export const Profile = () => {
  const { userName, logOutHandler } = useAuth();

  return (
    <div className="user-rofile-container padding-around-1rem">
      <h1 className="h4 text-center padding-bottom-1rem">Account</h1>
      <div className="horizontal-card">
        <div className="image-container">
          <img className="img-responsive" alt="profile" src={avatarImg} />
        </div>

        <div className="text-container">
          <div className="text-container-title">
            <h6 className="text-regular-weight">{userName}</h6>
          </div>

          <div className="CTA-Container">
            <button className="btn btn-solid-primary" onClick={logOutHandler}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
