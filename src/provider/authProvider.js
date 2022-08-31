import axios from "axios";

const authProvider = {
  login: ({ username, password }) => {
    const request = new Request("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        console.log("1111", response.status, response.json());
        //return response.json();
        localStorage.setItem("username", username);
        return Promise.resolve();
      })
      .then((auth) => {
        localStorage.setItem("username", username);
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch(() => {
        console.log("3333");
        throw new Error("Network error");
      });
  },
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: "user",
      fullName: "John Doe",
    }),
  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
