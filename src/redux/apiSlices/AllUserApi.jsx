import { api } from "../api/apislice";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    totalUser: builder.query({
      query: (search) => `/user/user-list?location=${search}`,
    }),
  }),
});

export const { useTotalUserQuery } = userSlice;
