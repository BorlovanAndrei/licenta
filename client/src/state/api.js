import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["Plans", "Members", "Transactions", "Sales"],
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
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
              url: "client/transactions",
              method: "GET",
              params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        createTransaction: build.mutation({
            query: (newTransactionData) => ({
              url: 'client/transactions',
              method: 'POST',
              body: newTransactionData,
            }),
        }),
        getSales: build.query({
          query: () => "sales/sales",
          providesTags: ["Sales"],
        }),
        getTransactionForChart: build.query({
          query: () => "client/transactionsChart", // Update with your actual endpoint
          providesTags: ["Transactions"],
      }),
    }),
});

export const {useGetPlansQuery, useCreatePlanMutation, useDeletePlanMutation, useUpdatePlanMutation, 
useGetMembersQuery, useCreateMemberMutation, useDeleteMemberMutation, useUpdateMemberMutation,
useGetTransactionsQuery, useCreateTransactionMutation,
useGetSalesQuery, useGetTransactionForChartQuery } = api;