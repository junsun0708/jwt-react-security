//샘플
import { fetchUtils } from "ra-core";
import simpleRestProvider from "ra-data-simple-rest";

const httpClient = (url, options = {}) => {
  options.user = {
    authenticated: true,
    token: "Bearer " + localStorage.getItem("token"),
  };
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = simpleRestProvider(
  //"https://jsonplaceholder.typicode.com",
  "http://localhost:8080",
  fetchUtils.fetchJson,
  // httpClient,
  "X-Total-Count"
);
