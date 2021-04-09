import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../database";

const fetchAuthResponse = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user = checkCredentials(username, password);
      if (user?.username) {
        return resolve({ success: true, response: user, status: 200 });
      }
      return reject({ success: false, response: user, status: 401 });
    }, 2000);
  });
};

const checkCredentials = (username, password) => {
  const user = users.find((user) => user.username === username);

  return user
    ? user.password === password
      ? user
      : "Entered password is incorrect"
    : "Username does not exist";
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loginDetails = JSON.parse(localStorage?.getItem("session"));
    loginDetails?.login && setLogin(true);
    loginDetails?.userName && setUserName(loginDetails.userName);
  }, []);

  const authHandler = async ({ username, password, from }) => {
    try {
      const response = await fetchAuthResponse(username, password);

      if (response?.status === 200) {
        localStorage?.setItem(
          "session",
          JSON.stringify({ login: true, userName: username })
        );
        setLogin(true);
        setUserName(username);
        navigate(from);
        return response;
      }
    } catch (error) {
      return error;
    }
  };
  const newUserHandler = (username) => {
    localStorage?.setItem(
      "session",
      JSON.stringify({ login: true, userName: username })
    );
    setLogin(true);
    setUserName(username);
  };

  const logOutHandler = () => {
    localStorage?.removeItem("session");
    setLogin(false);
    setUserName("");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        authHandler,
        userName,
        logOutHandler,
        newUserHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
