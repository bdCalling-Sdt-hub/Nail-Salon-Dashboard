import { api } from "../api/apislice";

const homeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    totalData: builder.query({
      query: () => "/admin/overview",
    }),
    incomeGrowth: builder.query({
      query: () => "/admin/income-growth",
    }),
  }),
});
export const { useTotalDataQuery, useIncomeGrowthQuery } = homeSlices;
