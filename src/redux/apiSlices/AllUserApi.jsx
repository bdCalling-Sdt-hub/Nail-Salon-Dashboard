import { api } from "../api/apislice";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    totalUser: builder.query({
      query: ({page ,search}) => {  
        const params = new URLSearchParams() 
        if(page)params.append("page",page)
        if(search)params.append("location",search)
        return{
          url:`/user/user-list?${params.toString()}`
        }
      },
    }),
  }),
});

export const { useTotalUserQuery } = userSlice;
