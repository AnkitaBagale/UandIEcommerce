import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchAuthResponse = (username, password) => {
  console.log("insideFetchAuth");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkCredentials(username, password)) {
        return resolve({ success: true, status: 200 });
      }
      return reject({ success: false, status: 401 });
    }, 2000);
  });
};

const users = [
  {
    username: "Ankita",
    password: "Ankita"
  },
  {
    username: "Admin",
    password: "Admin"
  },
  {
    username: "Pooja",
    password: "Pooja"
  }
];

const checkCredentials = (username, password) => {
  console.log({ username });
  console.log("insideCheckCredentials");
  const user = users.find((user) => user.username === username);
  console.log({ user });
  return user?.password === password ? true : false;
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
      console.log("insideAuth");
      const response = await fetchAuthResponse(username, password);

      if (response?.status === 200) {
        localStorage?.setItem(
          "session",
          JSON.stringify({ login: true, userName: username })
        );
        setLogin(true);
        setUserName(username);
        navigate(from);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOutHandler = () => {
    localStorage?.removeItem("session");
    setLogin(false);
    setUserName("");
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, authHandler, userName, logOutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
