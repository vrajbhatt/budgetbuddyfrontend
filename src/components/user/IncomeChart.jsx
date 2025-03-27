// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card, CardContent, CardHeader, Typography, Box, CircularProgress } from "@mui/material";

Chart.register(...registerables);

const IncomeChart = () => {
  const [chartData, setChartData] = useState(null);

  // Fetch income data and prepare chart
  const fetchIncomeData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/income");
      processChartData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  useEffect(() => {
    fetchIncomeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Process data for Pie Chart
  const processChartData = (data) => {
    const categories = {};
    data.forEach((income) => {
      categories[income.category] = (categories[income.category] || 0) + income.amount;
    });

    setChartData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Income by Category",
          data: Object.values(categories),
          backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8"],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <Card sx={{ maxWidth: 350, margin: "10px", float: "right" }}>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
              Income Distribution
            </Box>
          </Typography>
        }
      />
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        {chartData ? (
          <Pie
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    boxWidth: 15,
                  },
                },
              },
            }}
            width={250}
            height={250}
          />
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  );
};

export default IncomeChart;