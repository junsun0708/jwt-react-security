import React, { useState, useEffect, useCallback } from "react";
import * as authAction from "./auth-action";
let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  userObj: { email: "", nickname: "" },
  isLoggedIn: false,
  isSuccess: false,
  isGetSuccess: false,
  signup: (email, password, nickname) => {},
  login: (email, password) => {},
  logout: () => {},
  getUser: () => {},
  changeNickname: (nickname) => {},
  changePassword: (exPassword, newPassword) => {},
});
export const AuthContextProvider = (props) => {
  const tokenData = authAction.retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const [userObj, setUserObj] = useState({
    email: "",
    nickname: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGetSuccess, setIsGetSuccess] = useState(false);
  const userIsLoggedIn = !!token;
  const signupHandler = (email, password, nickname) => {
    setIsSuccess(false);
    const response = authAction.signupActionHandler(email, password, nickname);
    response.then((result) => {
      if (result !== null) {
        setIsSuccess(true);
      }
    });
  };
  const loginHandler = (email, password) => {
    setIsSuccess(false);
    console.log(isSuccess);
    const data = authAction.loginActionHandler(email, password);
    data.then((result) => {
      if (result !== null) {
        const loginData = result.data;
        setToken(loginData.accessToken);
        logoutTimer = setTimeout(
          logoutHandler,
          authAction.loginTokenHandler(
            loginData.accessToken,
            loginData.tokenExpiresIn
          )
        );
        setIsSuccess(true);
        console.log(isSuccess);
      }
    });
  };
  const logoutHandler = useCallback(() => {
    setToken("");
    authAction.logoutActionHandler();
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  const getUserHandler = () => {
    setIsGetSuccess(false);
    const data = authAction.getUserActionHandler(token);
    data.then((result) => {
      if (result !== null) {
        console.log("get user start!");
        const userData = result.data;
        setUserObj(userData);
        setIsGetSuccess(true);
      }
    });
  };
  const changeNicknameHandler = (nickname) => {
    setIsSuccess(false);
    const data = authAction.changeNicknameActionHandler(nickname, token);
    data.then((result) => {
      if (result !== null) {
        const userData = result.data;
        setUserObj(userData);
        setIsSuccess(true);
      }
    });
  };
  const changePaswordHandler = (exPassword, newPassword) => {
    setIsSuccess(false);
    const data = authAction.changePasswordActionHandler(
      exPassword,
      newPassword,
      token
    );
    data.then((result) => {
      if (result !== null) {
        setIsSuccess(true);
        logoutHandler();
      }
    });
  };
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  const contextValue = {
    token,
    userObj,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
    getUser: getUserHandler,
    changeNickname: changeNicknameHandler,
    changePassword: changePaswordHandler,
  };
  // return React.createElement(
  //   AuthContext.Provider,
  //   { value: contextValue },
  //   props.children
  // );
};
export default AuthContext;
