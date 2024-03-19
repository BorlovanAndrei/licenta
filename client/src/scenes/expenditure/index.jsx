import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/ExpenditureChart";

const Expenditure = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Expenditure" subtitle="Equipment expenditure by category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Expenditure;
