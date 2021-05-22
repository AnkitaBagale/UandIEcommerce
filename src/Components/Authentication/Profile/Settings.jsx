import { useAuthentication, useStateContext } from "../../../context";

export const Settings = () => {
  const { logOutUser } = useAuthentication();
  const { dispatch } = useStateContext();
  return (
    <div className="CTA-Container">
      <button
        className="btn btn-solid-primary"
        onClick={() => logOutUser(dispatch)}
      >
        Log out
      </button>
    </div>
  );
};
