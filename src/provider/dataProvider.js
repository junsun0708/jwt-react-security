//샘플
import { fetchUtils } from "ra-core";
import simpleRestProvider from "ra-data-simple-rest";

export const dataProvider = simpleRestProvider(
  //"https://jsonplaceholder.typicode.com",
  "http://localhost:8080",
  fetchUtils.fetchJson,
  "X-Total-Count"
);
