// import axios from "axios";
// import decodeJwt from "jwt-decode";
import React, { useState, useEffect, useCallback } from "react";
import * as authAction from "./auth-action";
// let logoutTimer;
// const tokenData = authAction.retrieveStoredToken();
// let initialToken;
// if (tokenData) {
//   console.log("tokenData", tokenData);
//   initialToken = tokenData.token;
// }

// const [token, setToken] = useState(initialToken);

// const logoutHandler = useCallback(() => {
//   setToken("");
//   authAction.logoutActionHandler();
//   if (logoutTimer) {
//     clearTimeout(logoutTimer);
//   }
// }, []);

const authProvider = {
  /* login: ({ username, password }) => {
    const request = new Request("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return (
      fetch(request)
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          //console.log("1111", response.status, response.json());

          console.log("res.json", response.data);
          //const decodedToken = decodeJwt(token);
          //return response.json();
          //localStorage.setItem("username", username);
          return Promise.resolve(response);
        })
        //.then((auth) => {
        .then((username) => {
          localStorage.setItem("username", username);
          // localStorage.setItem("auth", {
          //   id: username,
          //   fullName: username,
          //   avatar: username,
          // });
        })
        .catch(() => {
          throw new Error("Network error");
        })
    ); 
  }*/
  login: ({ username, password }) => {
    const data = authAction.loginActionHandler(username, password);
    data.then((result) => {
      if (result !== null) {
        const loginData = result.data;
        // setToken(loginData.accessToken);
        // logoutTimer = setTimeout(
        //   logoutHandler,
        //   authAction.loginTokenHandler(
        //     loginData.accessToken,
        //     loginData.tokenExpiresIn
        //   )
        // );
        console.log("loginData.accessToken : " + loginData.accessToken);
        localStorage.setItem("token", loginData.accessToken);
      }
    });

    localStorage.setItem("username", username);
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
    //return Promise.resolve('/my-custom-login');
  },
  checkAuth: () =>
    localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
  //localStorage.getItem("auth") ? Promise.resolve() : Promise.reject({ redirectTo: '/no-access' }),
  //localStorage.getItem("auth") ? Promise.resolve() : Promise.reject({ message: false }),
  checkError: (error) => {
    const status = error.status;
    console.log("checkError", status);
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      //localStorage.removeItem("auth");
      return Promise.reject();
      //return Promise.reject({ message: 'Unauthorized user!' }); // 알림 사용자 지정
      //return Promise.reject({ redirectTo: "/401page" }); //리다이렉션 재정의
      //return Promise.reject({ redirectTo: '/unauthorized', logoutUser: false });//로그아웃 안하고 리다이렉션
    }
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: "user",
      fullName: "John Doe",
    }),
  // getIdentity: () => {
  //   try {
  //     const { id, fullName, avatar } = JSON.parse(localStorage.getItem("auth"));
  //     return Promise.resolve({ id, fullName, avatar });
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // },
  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
