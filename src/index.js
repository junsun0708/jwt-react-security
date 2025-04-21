import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FxmsLogin } from "./login/FxmsLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(<FxmsLogin root={root} />);

reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import "./index.css";
// import App from "./App";
// import { AuthContextProvider } from "./store/auth-context";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <AuthContextProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </AuthContextProvider>
// );
