import React, { useState, useEffect } from "react";
//import "./FxmsLogin.css";
import axios from "axios";
//import { FxmsData } from "../tispComp/tisp_data";
import AlertDialog from "./AlertDialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import authProvider from "../provider/authProvider";

const FxmsLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Thingspire Industrial Service Platform");
  const [copyright, setCopyright] = useState(
    "Copyrightⓒ2022 Thingspire All rights reserved."
  );
  const [open, setOpen] = useState(false); // Dialog 상태 true, false 선택
  const [message, setMessage] = useState("알 수 없는 오류발생"); // 로그인 오류 종류에 따라 메세지 다르게 보여줌

  // useEffect(() => {
  //   // 화면 구성정보를 가져온 후 Application을 호출한다.
  //   FxmsData.getVarList()
  //     .then(function (res) {
  //       setTitle(
  //         FxmsData.getVarValue(
  //           "ui-title",
  //           "Thingspire Industrial Service Platform"
  //         )
  //       );
  //       setCopyright(
  //         FxmsData.getVarValue(
  //           "ui-copyright",
  //           "Copyrightⓒ2022 Thingspire All rights reserved."
  //         )
  //       );
  //     })
  //     .catch(function (error) {});

  //   return () => {};
  // }, []);

  // function showApp() {
  //   return axios
  //     .put(FxmsData.apiUrl + "/login", { userId: email, userPwd: password })
  //     .then(function (res) {
  //       // 로그인이 성공되었으면
  //       console.log("*** FxmsLogin *** " + FxmsData.apiUrl + "/login", res);

  //       if (res.data && res.data.sessionId) {
  //         // 사용자번호를 보관한다.
  //         FxmsData.setLocalStorage(res.data);

  //         // 화면 구성정보를 가져온 후 Application을 호출한다.
  //         FxmsData.getFxmsConfig(res.data.userNo)
  //           .then(function (res) {
  //             document.location.href = "/";
  //           })
  //           .catch(function (error) {
  //             handleOpen();
  //             setMessage("화면 구성정보를 가져오지 못했습니다.");
  //           });
  //       }
  //     })

  //     .catch(function (error) {
  //       console.log("*** FxmsLogin *** " + FxmsData.apiUrl + "/login", error);
  //       handleOpen();
  //       setMessage("접속 계정 정보가 정확하지 않습니다.");
  //     });
  // }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      //showApp();
    }
  };

  // Dialog 열기
  const handleOpen = () => {
    setOpen(true);
  };

  // Dialog 닫기
  const handleClose = () => {
    setOpen(false);
  };

  function login() {
    return authProvider
      .login({ username: email, password: password })
      .then(function (res) {
        //showApp();
        alert("성공");
      })
      .catch(function (error) {
        handleOpen();
        setMessage("아이디 및 패스워드를 확인하세요.");
      });
  }

  return (
    <div className="contentWrapper">
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
      <div className="login_error">
        <div className="loginBG">
          <div className="titleName">{title}</div>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleOnKeyPress}
            placeholder="패스워드를 입력하세요"
          />
          <div className="loginBtn">
            <a onClick={login}>로그인</a>
          </div>
          <div className="other">
            <AlertDialog title="아이디/비밀번호 분실"></AlertDialog>
            <AlertDialog title="회원가입"></AlertDialog>
          </div>
          <div className="copyrightLine">{copyright}</div>
        </div>
      </div>
    </div>
  );
};

export { FxmsLogin };
