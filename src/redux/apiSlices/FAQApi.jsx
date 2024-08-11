import { api } from "../api/apislice";

const FAQSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => "/faq",
    }),

    updateFAQ: builder.mutation({
      query: ({ id, value }) => {
        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: value,
        };
      },
    }),

    createFAQ: builder.mutation({
      query: (value) => {
        return {
          url: "/faq/create-faq",
          method: "POST",
          body: value,
        };
      },
    }),

    deleteFAQ: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetFAQQuery,
  useUpdateFAQMutation,
  useCreateFAQMutation,
  useDeleteFAQMutation,
} = FAQSlices;
