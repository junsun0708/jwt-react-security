import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { dataProvider } from "./provider/dataProvider";
import authProvider from "./provider/authProvider";

const App = () => (
  <Admin ataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="sample1" list={ListGuesser} />
    <Resource name="sample2" list={ListGuesser} />
    <Resource name="sample3" list={ListGuesser} />
    <Resource name="member/me" list={ListGuesser} />
  </Admin>
);

export default App;

// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Layout from "./components/Layout/Layout";
// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";
// import ProfilePage from "./pages/ProfilePage";
// import CreateAccountPage from "./pages/CreateAccountPage";
// import AuthContext from "./store/auth-context";

// function App() {
//   const authCtx = useContext(AuthContext);

//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           path="/signup/"
//           element={
//             authCtx.isLoggedIn ? <Navigate to="/" /> : <CreateAccountPage />
//           }
//         />
//         <Route
//           path="/login/*"
//           element={authCtx.isLoggedIn ? <Navigate to="/" /> : <AuthPage />}
//         />
//         <Route
//           path="/profile/"
//           element={!authCtx.isLoggedIn ? <Navigate to="/" /> : <ProfilePage />}
//         />
//       </Routes>
//     </Layout>
//   );
// }

// export default App;
