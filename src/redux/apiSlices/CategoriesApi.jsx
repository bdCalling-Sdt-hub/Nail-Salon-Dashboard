import { api } from "../api/apislice";

const categoriesSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    totalCategory: builder.query({
      query: () => "/category/get-category",
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
    }),
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/create-category",
        method: "POST",
        body: formData,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});
export const {
  useTotalCategoryQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesSlices;
