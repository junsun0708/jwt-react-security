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
  checkAuth: () => {},
  checkError: (error) => {},
  getIdentity: () => {},
  getPermissions: () => {},
});

// Context의 변화를 알리는 Provider 컴포넌트를 반환
export const AuthContextProvider = (props) => {
  //토큰확인 함수
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
  //boolean값, 토큰의 존재여부에 따라 변환
  const userIsLoggedIn = !!token;

  //회원가입
  const signupHandler = (email, password, nickname) => {
    setIsSuccess(false);
    const response = authAction.signupActionHandler(email, password, nickname);
    response.then((result) => {
      if (result !== null) {
        setIsSuccess(true);
      }
    });
  };

  //로그인
  const login = (email, password) => {
    setIsSuccess(false);
    console.log(isSuccess);
    //토큰추출후 전역토큰 설정 -> 만료시간후 로그아웃 실행
    const data = authAction.loginActionHandler(email, password);
    data.then((result) => {
      if (result !== null) {
        const loginData = result.data;
        setToken(loginData.accessToken);
        logoutTimer = setTimeout(
          logout,
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

  //useEffect를 통해 토큰이 없어지면 자동 로그아웃, 무한루프를 막기위해 useCallback으로 감쌈
  const logout = useCallback(() => {
    setToken("");
    authAction.logoutActionHandler();
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //토큰값을 넣어주고 promist객체인 data를 받아 UserObj에 셋
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
        logout();
      }
    });
  };

  const checkAuth = () =>
    localStorage.getItem("username") ? Promise.resolve() : Promise.reject();

  const checkError = (error) => {
    const status = error.status;
    console.log("checkError", status);
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  };
  const getIdentity = () =>
    Promise.resolve({
      id: "user",
      fullName: "John Doe",
    });

  const getPermissions = () => Promise.resolve("");

  //만료시간후 logoutHandler실행 - retrieveStoredToken로 받은 token값과, logoutHandler를 종속변수로 삼는 useEffect훅
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logout, tokenData.duration);
    }
  }, [tokenData, logout]);
  const contextValue = {
    token,
    userObj,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    signup: signupHandler,
    login: login,
    logout: logout,
    getUser: getUserHandler,
    changeNickname: changeNicknameHandler,
    changePassword: changePaswordHandler,
    checkAuth: checkAuth,
    checkError: checkError,
    getIdentity: getIdentity,
    getPermissions: getPermissions,
  };
  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    props.children
  );
};
export default AuthContext;
