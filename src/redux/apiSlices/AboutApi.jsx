import { api } from "../api/apislice";

const aboutSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    // About
    getAboutData: builder.query({
      query: () => "/rule/about",
    }),

    updateData: builder.mutation({
      query: (data) => ({
        url: "/rule/about",
        method: "PATCH",
        body: data,
      }),
    }),

    // privacy poliucy
    getPrivacyData: builder.query({
      query: () => "/rule/privacy-policy",
    }),

    updatePrivacyData: builder.mutation({
      query: (data) => ({
        url: "/rule/privacy-policy",
        method: "PATCH",
        body: data,
      }),
    }),

    // Terms and conmdition
    getTermsData: builder.query({
      query: () => "/rule/terms-and-conditions",
    }),

    updateTermsData: builder.mutation({
      query: (data) => ({
        url: "/rule/terms-and-conditions",
        method: "PATCH",
        body: data,
      }),
    }), 

    // contact  
    getContact:builder.query({
      query:()=>"/contact",
    }) , 

    postContact:builder.mutation({
      query:(value)=>{
 return{
  url:"/contact" ,
  method:"POST" ,
  body: value
 }
      }
    }) , 

    updateContact:builder.mutation({
      query:(data)=>({
        url:`/contact/${data?.id}` ,
        method:"PATCH" ,
        body: data
      })
    })

  }), 


});
export const {
  useGetAboutDataQuery,
  useUpdateDataMutation,
  useGetPrivacyDataQuery,
  useUpdatePrivacyDataMutation,
  useGetTermsDataQuery,
  useUpdateTermsDataMutation,  
  useGetContactQuery , 
  usePostContactMutation ,
  useUpdateContactMutation
} = aboutSlices;
