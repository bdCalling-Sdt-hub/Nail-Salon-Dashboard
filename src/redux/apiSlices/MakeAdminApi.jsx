import { api } from "../api/apislice";

const makeAdminSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminsData: builder.query({
      query: () => "/admin",
    }),

    postAdminData: builder.mutation({
      query: (values) => ({
        url: "/admin",
        method: "POST",
        body: values,
      }),
    }),

    deleteAdminData: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdminsDataQuery,
  usePostAdminDataMutation,
  useDeleteAdminDataMutation,
} = makeAdminSlices;
