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
          //edit here
        deletePlan: build.mutation({
            query: (planId) => ({
                url: `/plans/${planId}`,
                method: 'DELETE',
            }),
        }),
        updatePlan: build.mutation({
            query: ({ planId, ...updatedPlanData }) => ({
                url: `/plans/${planId}`,
                method: 'PUT',
                body: updatedPlanData,
            }),
        }),
        getMembers: build.query({
            query: () => "client/members",
            providesTags: ["Members"],
          }),
    }),
});

export const {useGetPlansQuery, useCreatePlanMutation, useDeletePlanMutation, useUpdatePlanMutation, useGetMembersQuery } = api;