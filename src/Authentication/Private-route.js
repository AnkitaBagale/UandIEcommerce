import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export const PrivateRoute = ({ path, ...props }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
