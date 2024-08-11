import { api } from "../api/apislice";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => { 
        console.log( "fromRedux",  data);
        return{
        method: "POST",
        url: "/admin/login",
        body: data,
      }
 
      },
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/forgot-password",
          body: data,
        };
      },
    }),

    otpCode: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/admin/verify-otp",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/reset-password",
          body: data,
        };
      },
    }),

    getProfile: builder.query({
      query: () => "/admin/get-profile",
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/admin/update-profile",
        method: "PATCH",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/admin/change-password",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useForgetPasswordMutation,
  useOtpCodeMutation,
  useGetProfileQuery,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authSlice;
