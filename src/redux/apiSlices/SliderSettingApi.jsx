import { api } from "../api/apislice";

const sliderSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getSlider: builder.query({
      query: () => "/banner/get-banners",
    }),

    createSlider: builder.mutation({
      query: (bannerData) => {
        console.log(bannerData);
        return {
          url: "/banner/create-banner",
          method: "POST",
          body: bannerData,
        };
      },
    }),

    updateSlider: builder.mutation({
      query: ({ id, value }) => {
        return {
          url: `/banner/update-banner/${id}`,
          method: "PATCH",
          body: value,
        };
      },
    }),

    deleteSlider: builder.mutation({
      query: (id) => {
        return {
          url: `/banner/delete-banner/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetSliderQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderSlices;
