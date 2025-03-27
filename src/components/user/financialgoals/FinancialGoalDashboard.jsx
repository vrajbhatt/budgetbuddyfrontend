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
  LinearProgress,
  TableSortLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export const FinancialGoalDashboard = () => {
  const [goals, setGoals] = useState([]);
  const [orderBy, setOrderBy] = useState("goalName"); // Default sorting by goalName
  const [order, setOrder] = useState("asc"); // Default sorting order
  const navigate = useNavigate();
  const userId = localStorage.getItem("id"); // Fetch user ID from local storage

  useEffect(() => {
    fetchFinancialGoals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFinancialGoals = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/financial-goals/user/${userId}`);
      setGoals(res.data.data || []);
    } catch (error) {
      console.error("Error fetching financial goals:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/financial-goals/${id}`);
      fetchFinancialGoals();
    } catch (error) {
      console.error("Error deleting financial goal:", error);
    }
  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedGoals = [...goals].sort((a, b) => {
    if (orderBy === "goalName" || orderBy === "status") {
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    } else if (orderBy === "targetAmount" || orderBy === "savedAmount") {
      return order === "asc" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    } else {
      return order === "asc" ? new Date(a[orderBy]) - new Date(b[orderBy]) : new Date(b[orderBy]) - new Date(a[orderBy]);
    }
  });

  const chartData = {
    labels: goals.map((goal) => goal.goalName),
    datasets: [
      {
        label: "Saved Amount",
        data: goals.map((goal) => goal.savedAmount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Financial Goals Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/user/addfinancialgoal")}>
        Add Financial Goal
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={orderBy === "goalName"} direction={order} onClick={() => handleSort("goalName")}>
                  Goal Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === "targetAmount"} direction={order} onClick={() => handleSort("targetAmount")}>
                  Target Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === "savedAmount"} direction={order} onClick={() => handleSort("savedAmount")}>
                  Saved Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === "startDate"} direction={order} onClick={() => handleSort("startDate")}>
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === "endDate"} direction={order} onClick={() => handleSort("endDate")}>
                  End Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={orderBy === "status"} direction={order} onClick={() => handleSort("status")}>
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedGoals.map((goal) => (
              <TableRow key={goal._id}>
                <TableCell>{goal.goalName}</TableCell>
                <TableCell>${goal.targetAmount}</TableCell>
                <TableCell>${goal.savedAmount}</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={(goal.savedAmount / goal.targetAmount) * 100} />
                  <Typography variant="body2" align="center">
                    {((goal.savedAmount / goal.targetAmount) * 100).toFixed(2)}%
                  </Typography>
                </TableCell>
                <TableCell>{new Date(goal.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(goal.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{goal.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => navigate(`/user/updatefinancialgoal/${goal._id}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(goal._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: "20px" }}>
        Financial Goals Overview
      </Typography>
      <Bar data={chartData} />
    </div>
  );
};
