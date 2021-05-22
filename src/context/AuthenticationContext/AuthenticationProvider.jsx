import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loginDetails = JSON.parse(localStorage?.getItem("session"));
    loginDetails?.login && setLogin(true);
    loginDetails?.username && setUsername(loginDetails.username);
    loginDetails?.userId && setUserId(loginDetails.userId);
  }, []);

  const loginUser = async ({ email, password, from }) => {
    try {
      const {
        data: {
          response: { firstname, userId }
        },
        status
      } = await axios({
        method: "POST",
        url: "https://uandistoreapi.herokuapp.com/users/authenticate",
        headers: { email: email, password: password }
      });

      if (status === 200) {
        localStorage?.setItem(
          "session",
          JSON.stringify({ login: true, username: firstname, userId: userId })
        );

        setUsername(firstname);
        setUserId(userId);
        setLogin(true);
        navigate(from);
      }
    } catch (error) {
      return error.response;
    }
  };

  const signUpNewUser = async ({ email, password, firstname, lastname }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: "https://uandistoreapi.herokuapp.com/users",
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        }
      });

      if (status === 201) {
        localStorage?.setItem(
          "session",
          JSON.stringify({
            login: true,
            username: data.response.firstname,
            userId: data.response.userId
          })
        );
        setUserId(data.response.userId);
        setUsername(data.response.firstname);
        setLogin(true);
        return { status };
      }
    } catch (error) {
      return error.response;
    }
  };

  const updateUserDetails = async ({ email, ...body }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `https://uandistoreapi.herokuapp.com/users/${email}`,
        data: {
          ...body
        }
      });

      if (status === 200) {
        localStorage?.setItem(
          "session",
          JSON.stringify({
            login: true,
            username: data.response.firstname,
            userId: data.response.userId
          })
        );

        setUsername(data.response.firstname);
        setUserId(data.response.userId);
        setLogin(true);
        return { status };
      }
    } catch (error) {
      return error.response;
    }
  };

  const logOutUser = () => {
    localStorage?.removeItem("session");
    setUsername("");
    setUserId("");
    setLogin(false);
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isUserLoggedIn,
        loginUser,
        username,
        logOutUser,
        signUpNewUser,
        updateUserDetails,
        userId,
        userDetails,
        setUserDetails,
        addressDetails,
        setAddressDetails
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
