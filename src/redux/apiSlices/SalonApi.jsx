import { api } from "../api/apislice";

const salonSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    salonDetails: builder.query({
      query: ({searchValue , isFeatured}) => {    
        // console.log(isFeatured); 
        const params = new URLSearchParams()  
        if(searchValue)params.append("location" , searchValue)
        if(isFeatured)params.append("featured" , isFeatured)
        return{
          url: `/salon/salon-list?${params.toString()}`,
        }
      }
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
