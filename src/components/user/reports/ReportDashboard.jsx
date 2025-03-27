// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

export const ReportDashboard = () => {
    const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const userId = "USER_ID_HERE"; // Replace with actual user ID

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:3000/reports", { params: { userId } });
      setReports(res.data.data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/reports/${id}`);
      fetchReports();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const reportTypes = ["Income", "Expense", "Budget", "Financial Goal", "Transaction Summary"];
  const filteredReports = (type) => reports.filter((report) => report.reportType === type);

  const combinedChartData = {
    labels: reportTypes,
    datasets: [
      {
        label: "Total Amount",
        data: reportTypes.map((type) => {
          const total = filteredReports(type).reduce((sum, report) => sum + report.totalAmount, 0);
          return total;
        }),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div>
    <Typography variant="h4" align="center" gutterBottom>
      Reports Dashboard
    </Typography>
    <Button variant="contained" color="primary" onClick={() => navigate("/generate-report")}>
      Generate Report
    </Button>
    {reportTypes.map((type) => (
      <div key={type} style={{ marginTop: "30px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          {type} Reports
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Generated At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports(type).map((report) => (
                <TableRow key={report._id}>
                  <TableCell>{new Date(report.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(report.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>${report.totalAmount}</TableCell>
                  <TableCell>{new Date(report.generatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDelete(report._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ))}
    <Typography variant="h5" align="center" gutterBottom style={{ marginTop: "20px" }}>
      Combined Reports Overview
    </Typography>
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
      <div style={{ width: "45%" }}>
        <Bar data={combinedChartData} />
      </div>
      <div style={{ width: "30%" }}>
        <Pie data={combinedChartData} />
      </div>
      <div style={{ width: "45%" }}>
        <Line data={combinedChartData} />
      </div>
    </div>
  </div>
);
};
