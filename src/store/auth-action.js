import { GET, POST } from "./fetch-auth-action";

//토큰생성
const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

//토큰만료시간 계산
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

//토큰+만료시간 -> localstorage내부에 저장 -> 남은시간 반환
export const loginTokenHandler = (token, expirationTime) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", String(expirationTime));
  const remainingTime = calculateRemainingTime(expirationTime);
  return remainingTime;
};

//localStorage내부에 토큰이 존재하는지 검색 -> 남은 시간과 토큰값 / 1초미만 - 토큰을 삭제
export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime") || "0";
  const remaingTime = calculateRemainingTime(+storedExpirationDate);
  if (remaingTime <= 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remaingTime,
  };
};

//회원가입 url - Promise<AxiosResponse<any, any> | null>
export const signupActionHandler = (email, password, nickname) => {
  const URL = "/auth/signup";
  const signupObject = { email, password, nickname };
  const response = POST(URL, signupObject, {});
  return response;
};

//마찬가지로 로그인 URL을 POST방식으로 호출
export const loginActionHandler = (email, password) => {
  const URL = "/auth/login";
  const loginObject = { email, password };
  const response = POST(URL, loginObject, {});
  return response;
};

//로그아웃
export const logoutActionHandler = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
};

//유저의 정보를 GET방식으로 토큰값을 헤더에 넣어서 호출 -  Promise
export const getUserActionHandler = (token) => {
  const URL = "/member/me";
  const response = GET(URL, createTokenHeader(token));
  return response;
};

//닉네임 체인지
export const changeNicknameActionHandler = (nickname, token) => {
  const URL = "/member/nickname";
  const changeNicknameObj = { nickname };
  const response = POST(URL, changeNicknameObj, createTokenHeader(token));
  return response;
};

//패스워드 체인지
export const changePasswordActionHandler = (exPassword, newPassword, token) => {
  const URL = "/member/password";
  const changePasswordObj = { exPassword, newPassword };
  const response = POST(URL, changePasswordObj, createTokenHeader(token));
  return response;
};
