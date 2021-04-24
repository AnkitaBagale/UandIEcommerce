import { useAuthentication } from "../../../context";
import avatarImg from "./Images/user.svg";

export const Profile = () => {
  const { userDetails } = useAuthentication();

  return (
    <>
      <h2 className="body-cp-rg margin-0 padding-bottom-1rem">
        Profile Details
      </h2>
      <div className="card-horizontal margin-auto">
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
            <div className="column-70-pc">
              <span>
                {userDetails?.firstname} {userDetails?.lastname}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="column-30-pc column1">
              <span>Email ID</span>
            </div>
            <div className="column-70-pc">
              <span>{userDetails?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
