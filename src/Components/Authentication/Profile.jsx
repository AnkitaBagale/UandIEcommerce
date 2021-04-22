import { useAuthentication } from "../../context";
import avatarImg from "./Images/user.svg";
import "./styles.css";

export const Profile = () => {
  const { userName, logOutUser } = useAuthentication();

  return (
    <div className="user-rofile-container padding-around-1rem">
      <h1 className="h4 text-center padding-bottom-1rem">Account</h1>
      <div className="card-horizontal margin-auto">
        <div className="image-container">
          <img className="img-responsive" alt="profile" src={avatarImg} />
        </div>

        <div className="text-container">
          <div className="text-container-title">
            <h6 className="text-regular-weight">{userName}</h6>
          </div>

          <div className="CTA-Container">
            <button className="btn btn-solid-primary" onClick={logOutUser}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};