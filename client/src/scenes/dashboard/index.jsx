import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Email, PersonAdd, PointOfSale, Traffic } from "@mui/icons-material";
import { useGetMembersQuery, useGetTrainersQuery, useGetTransactionForChartQuery, useGetOperationForChartQuery, useGetPlansQuery } from "state/api";
import StatBox from "components/StatBox";
import RevenueChart from "components/RevenueChart";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
  const theme = useTheme();
  const { data: membersData, isLoading: membersLoading } = useGetMembersQuery();
  const { data: trainersData, isLoading: trainersLoading } = useGetTrainersQuery();
  const { data: transactionsData, isLoading: transactionsLoading } = useGetTransactionForChartQuery();
  const { data: operationsData, isLoading: operationsLoading } = useGetOperationForChartQuery();
  const { data: plansData, isLoading: plansLoading } = useGetPlansQuery();

  const formattedMembersData = membersData ? membersData.map(member => ({ ...member, id: member._id })) : [];

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
          <RevenueChart />
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
