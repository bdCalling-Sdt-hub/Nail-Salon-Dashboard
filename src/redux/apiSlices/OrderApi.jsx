import { api } from "../api/apislice";

const orderSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    oderHistory: builder.query({
      query: (data) =>
        `/booking/booking-list?booking_date=${data?.date}&&status=${data?.status}`,
    }),
  }),
});
export const { useOderHistoryQuery } = orderSlices;
