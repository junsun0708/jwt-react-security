import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { dataProvider } from "./provider/dataProvider";
import authProvider from "./provider/authProvider";

const App = () => (
  <Admin ataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="sample1" list={ListGuesser} />
    <Resource name="sample2" list={ListGuesser} />
    <Resource name="sample3" list={ListGuesser} />
  </Admin>
);

export default App;
