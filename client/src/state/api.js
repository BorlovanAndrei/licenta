import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["Plans"],
    endpoints: (build) => ({
        getPlans: build.query({
            query: () => "client/plans",
            providesTags: ["Plans"],
        }),
        createPlan: build.mutation({
            query: (newPlanData) => ({
              url: '/plans',
              method: 'POST',
              body: newPlanData,
            }),
          }),
    }),
});

export const {useGetPlansQuery, useCreatePlanMutation} = api;