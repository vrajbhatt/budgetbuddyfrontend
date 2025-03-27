// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export const ExpenseDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [orderBy, setOrderBy] = useState("category");
  const [order, setOrder] = useState("asc");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id"); // Fetch user ID from local storage

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/expense/user/${userId}`);
      setExpenses(res.data.data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/expense/${id}`);
      fetchExpenses(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedExpenses = expenses.slice().sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: "Expense Amount",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Expense Dashboard</h2>
      <Button variant="contained" color="primary" onClick={() => navigate("/user/addexpense")}>
        Add Expense
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={orderBy === "category"} direction={order} onClick={() => handleRequestSort("category")}>
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === "amount"} direction={order} onClick={() => handleRequestSort("amount")}>
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>Expense Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedExpenses.map((expense) => (
              <TableRow key={expense._id}>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => navigate(`/user/updateexpense/${expense._id}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(expense._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Expense Overview</h3>
      <Bar data={chartData} />
    </div>
  );
};
