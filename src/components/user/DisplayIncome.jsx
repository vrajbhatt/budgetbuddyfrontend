// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TableSortLabel,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

export const DisplayIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [orderBy, setOrderBy] = useState("amount");
  const [order, setOrder] = useState("desc");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id"); // Fetch user ID from local storage

  useEffect(() => {
    if (userId) {
      fetchIncomes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order]);

  const fetchIncomes = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/income/user/${userId}`);
      setIncomes(res.data.data || []);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/income/${id}`);
      fetchIncomes(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedIncomes = incomes.sort((a, b) => {
    return order === "asc" ? (a[orderBy] > b[orderBy] ? 1 : -1) : (a[orderBy] < b[orderBy] ? 1 : -1);
  });

  // Group income data by source
  const incomeBySource = incomes.reduce((acc, income) => {
    acc[income.source] = (acc[income.source] || 0) + income.amount;
    return acc;
  }, {});

  // Convert grouped data to chart format
  const barChartData = Object.keys(incomeBySource).map((source) => ({
    source,
    amount: incomeBySource[source],
  }));

  const pieChartData = barChartData.map((item) => ({
    name: item.source,
    value: item.amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFB"];

  return (
    <div style={{ padding: "20px" }}>
      {/* Dashboard Header */}
      <Card elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Income Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/user/addincome")}>
          Add Income
        </Button>
      </Card>

      {/* Income Table */}
      <Card elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Income Records
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel active={orderBy === "source"} direction={order} onClick={() => handleSort("source")}>
                    Source
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === "amount"} direction={order} onClick={() => handleSort("amount")}>
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === "date"} direction={order} onClick={() => handleSort("date")}>
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedIncomes.map((income) => (
                <TableRow key={income._id}>
                  <TableCell>{income.source}</TableCell>
                  <TableCell>${income.amount}</TableCell>
                  <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/user/updateincome/${income._id}`)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(income._id)} style={{ marginLeft: "10px" }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Charts Section */}
      <Card elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center">
          Income Statistics
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" align="center">
                  Income by Source
                </Typography>
                <BarChart width={450} height={300} data={barChartData}>
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#0088FE" />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" align="center">
                  Income Distribution
                </Typography>
                <PieChart width={300} height={300}>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {pieChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
