import { api } from "../api/apislice";

const homeSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    totalData: builder.query({
      query: () => "/admin/overview",
    }),
    incomeGrowth: builder.query({
      query: () => "/admin/income-growth",
    }), 
    notification: builder.query({
      query:()=>"/notifications/admin-notification"
    })  ,
  }),
});
export const { useTotalDataQuery, useIncomeGrowthQuery , useNotificationQuery  } = homeSlices;
