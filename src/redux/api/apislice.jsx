import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "../../Util/local-storage";
const token = getFromLocalStorage("salonAuthToken");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://159.65.53.179:5000/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  endpoints: () => ({}),
});

export const imageURL = "http://159.65.53.179:5000";
