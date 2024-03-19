import React, { useEffect, useState, useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetPlansQuery } from "state/api"; 
import { useGetTransactionForChartQuery } from "state/api"; 

const BreakdownChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data: plans, isLoading: plansLoading } = useGetPlansQuery();
  const { data: transactions, isLoading: transactionsLoading } = useGetTransactionForChartQuery();
  const [chartData, setChartData] = useState([]);

  const colors = useMemo(() => [
    theme.palette.secondary[500],
    theme.palette.secondary[400],
    theme.palette.secondary[300],
    theme.palette.secondary[200],
  ], [theme.palette.secondary]);

  useEffect(() => {
    if (!plans || !transactions || plansLoading || transactionsLoading) return;

    const categoryCostMap = new Map();

    transactions.forEach(transaction => {
      const plan = plans.find(plan => plan._id === transaction.planId);
      if (plan) {
        const category = plan.category;
        if (categoryCostMap.has(category)) {
          categoryCostMap.set(category, categoryCostMap.get(category) + parseFloat(transaction.cost));
        } else {
          categoryCostMap.set(category, parseFloat(transaction.cost));
        }
      }
    });

    const formattedData = Array.from(categoryCostMap).map(([category, totalCost], i) => ({
      id: category,
      label: category,
      value: totalCost,
      color: colors[i],
    }));

    setChartData(formattedData);
  }, [plans, transactions, plansLoading, transactionsLoading, colors]);

  if ((plansLoading && !plans) || (transactionsLoading && !transactions)) return "Loading...";

  const calculateTotalCost = () => {
    if (!transactions) return 0;

    let totalCost = 0;
    transactions.forEach(transaction => {
      totalCost += parseFloat(transaction.cost);
    });

    return totalCost.toFixed(2);
  };

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={chartData}
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
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Typography 
        variant="h6"
        style={{
            position: "fixed",
            bottom: "16px",
            padding: "8px 16px",
          }}
      >
        {!isDashboard && "Total Cost:"} ${calculateTotalCost()}
      </Typography>
    </Box>
  );
};

export default BreakdownChart;
