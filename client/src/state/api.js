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
              url: 'client/plans',
              method: 'POST',
              body: newPlanData,
            }),
          }),
        deletePlan: build.mutation({
            query: (planId) => ({
                url: `client/plans/${planId}`,
                method: 'DELETE',
            }),
        }),
        updatePlan: build.mutation({
            query: ({ planId, ...updatedPlanData }) => ({
                url: `client/plans/${planId}`,
                method: 'PUT',
                body: updatedPlanData,
            }),
        }),
        getMembers: build.query({
            query: () => "client/members",
            providesTags: ["Members"],
          }),
        createMember: build.mutation({
            query: (newMemberData) => ({
              url: 'client/members',
              method: 'POST',
              body: newMemberData,
            }),
          }),
        deleteMember: build.mutation({
            query: (memberId) => ({
                url: `client/members/${memberId}`,
                method: 'DELETE',
            }),
        }),
        updateMember: build.mutation({
            query: ({ memberId, ...updatedMemberData }) => ({
                url: `client/members/${memberId}`,
                method: 'PUT',
                body: updatedMemberData,
            }),
        }),
    }),
});

export const {useGetPlansQuery, useCreatePlanMutation, useDeletePlanMutation, useUpdatePlanMutation, 
useGetMembersQuery, useCreateMemberMutation, useDeleteMemberMutation, useUpdateMemberMutation} = api;