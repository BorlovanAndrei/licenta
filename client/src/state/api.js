import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["Plans", "Members", "Transactions", "Sales", "Equipments", "Operations", "Trainers", "Classes"],
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
          query: () => "client/transactionsChart",
          providesTags: ["Transactions"],
      }),
        getEquipments: build.query({
          query: () => "management/equipment",
          providesTags: ["Equipments"],
      }),
        createEquipment: build.mutation({
          query: (newEquipmentData) => ({
            url: 'management/equipment',
            method: 'POST',
            body: newEquipmentData,
        }),
      }),
        deleteEquipment: build.mutation({
          query: (equipmentId) => ({
            url: `management/equipment/${equipmentId}`,
            method: 'DELETE',
        }),
      }),
        updateEquipment: build.mutation({
          query: ({ equipmentId, ...updatedEquipmentData }) => ({
              url: `management/equipment/${equipmentId}`,
              method: 'PUT',
              body: updatedEquipmentData,
        }),
      }),
        getOperations: build.query({
          query: ({ page, pageSize, sort, search }) => ({
            url: "management/operations",
            method: "GET",
            params: { page, pageSize, sort, search },
          }),
          providesTags: ["Operations"],
      }),
        createOperation: build.mutation({
          query: (newOperationData) => ({
            url: 'management/operations',
            method: 'POST',
            body: newOperationData,
          }),
      }),
        getOperationForChart: build.query({
          query: () => "management/operationsChart",
          providesTags: ["Operations"],
      }),
      getTrainers: build.query({
        query: () => "general/trainers",
        providesTags: ["Trainers"],
      }),
      createTrainer: build.mutation({
        query: (newTrainerData) => ({
          url: 'general/trainers',
          method: 'POST',
          body: newTrainerData,
        }),
      }),
      deleteTrainer: build.mutation({
        query: (trainerId) => ({
            url: `general/trainers/${trainerId}`,
            method: 'DELETE',
        }),
      }),
      updateTrainer: build.mutation({
        query: ({ trainerId, ...updatedTrainerData }) => ({
            url: `general/trainers/${trainerId}`,
            method: 'PUT',
            body: updatedTrainerData,
        }),
      }),
      login: build.mutation({
        query: ({ email, password }) => ({
          url: '/general/login',
          method: 'POST',
          body: { email, password },
        }),
      }),
      getClasses: build.query({
        query: () => "general/classes",
        providesTags: ["Classes"],
      }),
      createClass: build.mutation({
        query: (newClassData) => ({
          url: 'general/classes',
          method: 'POST',
          body: newClassData,
        }),
      }),
      updateClass: build.mutation({
        query: ({ id, ...updatedClassData }) => ({
          url: `general/classes/${id}`,
          method: 'PUT',
          body: updatedClassData,
        }),
      }),
      deleteClass: build.mutation({
        query: (classId) => ({
          url: `general/classes/${classId}`,
          method: 'DELETE',
        }),
      }),

    }),
});

export const {useGetPlansQuery, useCreatePlanMutation, useDeletePlanMutation, useUpdatePlanMutation, 
useGetMembersQuery, useCreateMemberMutation, useDeleteMemberMutation, useUpdateMemberMutation,
useGetTransactionsQuery, useCreateTransactionMutation,
useGetSalesQuery, useGetTransactionForChartQuery,
useGetEquipmentsQuery, useCreateEquipmentMutation, useDeleteEquipmentMutation, useUpdateEquipmentMutation,
useGetOperationsQuery, useCreateOperationMutation, useGetOperationForChartQuery,
useGetTrainersQuery, useCreateTrainerMutation, useDeleteTrainerMutation, useUpdateTrainerMutation,
useLoginMutation,
useGetClassesQuery,useCreateClassMutation, useUpdateClassMutation, useDeleteClassMutation} = api;