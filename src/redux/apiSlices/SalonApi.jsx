import { api } from "../api/apislice";

const salonSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    salonDetails: builder.query({
      query: (value) => `/salon/salon-list?location=${value?.searchValue}&featured=${value?.isFeatured}`,
    }),  

    salonFeatured: builder.mutation({
      query:(id)=>{
        return{
          url:`/salon/make-featured/${id}` ,
          method:"PATCH"
        }
       }
    }) ,

    singleSalonDetails: builder.query({
      query:(id)=>{
     return{
      url:`/salon/salon-service/${id}`
     }   
      }
    })
  }),
});
export const { useSalonDetailsQuery , useSingleSalonDetailsQuery  , useSalonFeaturedMutation} = salonSlices;
