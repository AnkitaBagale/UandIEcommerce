import { useAuthentication } from "../../../context";

export const Settings = () => {
  const { logOutUser } = useAuthentication();
  return (
    <div className="CTA-Container">
      <button className="btn btn-solid-primary" onClick={logOutUser}>
        Log out
      </button>
    </div>
  );
};
