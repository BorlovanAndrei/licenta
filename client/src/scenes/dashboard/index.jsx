import React, { useEffect, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {PersonAdd, PointOfSale, Traffic } from "@mui/icons-material";
import { useGetMembersQuery, useGetTrainersQuery, useGetTransactionForChartQuery, useGetOperationForChartQuery, useGetPlansQuery } from "state/api";
import StatBox from "components/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveBar } from "@nivo/bar";
import FlexBetween from "components/FlexBetween";

const Dashboard = () => {
  const theme = useTheme();
  
  const { data: membersData, isLoading: membersLoading, refetch: refetchMembers } = useGetMembersQuery();
  const { data: trainersData, refetch: refetchTrainers } = useGetTrainersQuery();
  const { data: transactionsData, refetch: refetchTransactions } = useGetTransactionForChartQuery();
  const { data: operationsData, refetch: refetchOperations } = useGetOperationForChartQuery();
  const { data: plansData, refetch: refetchPlans } = useGetPlansQuery();

  useEffect(() => {
    refetchMembers();
    refetchTrainers();
    refetchTransactions();
    refetchOperations();
    refetchPlans();
  }, [refetchMembers, refetchTrainers, refetchTransactions, refetchOperations, refetchPlans]);

  const formattedMembersData = membersData ? membersData.map(member => ({ ...member, id: member._id })) : [];

  const totalRevenue = useMemo(() => {
    if (!transactionsData) return 0;
    return transactionsData.reduce((acc, transaction) => acc + parseFloat(transaction.cost), 0).toFixed(2);
  }, [transactionsData]);

  const totalExpenditure = useMemo(() => {
    if (!operationsData) return 0;
    return operationsData.reduce((acc, operation) => acc + parseFloat(operation.cost) * parseFloat(operation.units), 0).toFixed(2);
  }, [operationsData]);

  const barData = [
    { category: "Revenue", total: parseFloat(totalRevenue) },
    { category: "Expenditure", total: parseFloat(totalExpenditure) },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
          Dashboard
        </Typography>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        <Box gridColumn="span 3">
          <StatBox
            title="Total Spendings"
            value={operationsData ? operationsData.length : '-'}
            increase=""
            description="Total number of operations"
            icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn="span 3">
          <StatBox
            title="Total Trainers"
            value={trainersData ? trainersData.length : '-'}
            increase=""
            description="Total number of trainers"
            icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />
        </Box>

        <Box gridColumn="span 3">
          <StatBox
            title="Total Transactions"
            value={transactionsData ? transactionsData.length : '-'}
            increase=""
            description="Total number of transactions"
            icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />
        </Box>

        <Box gridColumn="span 3">
          <StatBox
            title="Total Plans"
            value={plansData ? plansData.length : '-'}
            increase=""
            description="Total number of plans"
            icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          />
        </Box>

        <Box gridColumn="span 6" sx={{ height: "400px" }}>
          <Box height="100%">
            <ResponsiveBar
              data={barData}
              keys={['total']}
              indexBy="category"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={theme.palette.secondary[400]}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Category',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Total',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </Box>
        </Box>

        <Box gridColumn="span 6" mt="20px">
          <Typography variant="h5">Members</Typography>
          <DataGrid 
            loading={membersLoading}
            rows={formattedMembersData}
            columns={[
              { field: 'id', headerName: 'ID', flex: 1 },
              { field: 'name', headerName: 'Name', flex: 1 },
              { field: 'email', headerName: 'Email', flex: 1 },
              { field: 'phone', headerName: 'Phone', flex: 1 },
              { field: 'address', headerName: 'Address', flex: 1 }
            ]}
            autoHeight
            disableColumnMenu
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
