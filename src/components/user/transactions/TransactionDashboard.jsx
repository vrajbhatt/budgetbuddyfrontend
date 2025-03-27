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
  TableSortLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [orderBy, setOrderBy] = useState("amount");
  const [order, setOrder] = useState("desc");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id"); // Fetch user ID from local storage

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/transactions/user/${userId}`);
      setTransactions(res.data.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${id}`);
      fetchTransactions(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTransactions = transactions.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const chartData = {
    labels: transactions.map((transaction) => transaction.category),
    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.map((transaction) => transaction.amount),
        backgroundColor: transactions.map((transaction) =>
          transaction.type === "Income" ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)"
        ),
      },
    ],
  };

  return (
    <div>
      <h2>Transaction Dashboard</h2>
      <Button variant="contained" color="primary" onClick={() => navigate("/user/addtransaction")}>
        Add Transaction
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={orderBy === "type"} direction={order} onClick={() => handleSort("type")}>
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === "category"} direction={order} onClick={() => handleSort("category")}>
                  Category
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
            {sortedTransactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => navigate(`/user/updatetransaction/${transaction._id}`)} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(transaction._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Transaction Overview</h3>
      <Bar data={chartData} />
    </div>
  );
};