// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TableSortLabel, Typography, Card
} from "@mui/material";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState("email");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      let sortedData = res.data.data || [];
      sortedData.sort((a, b) =>
        order === "asc"
          ? a[orderBy] > b[orderBy] ? 1 : -1
          : a[orderBy] < b[orderBy] ? 1 : -1
      );
      setUsers(sortedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${userId}`);
      fetchUsers(); // refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Chart data processing
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getRoleData = (users) => {
    const roleMap = {};
    users.forEach(user => {
      roleMap[user.role] = (roleMap[user.role] || 0) + 1;
    });
    return Object.entries(roleMap).map(([role, count]) => ({ role, count }));
  };

  const getAgeData = (users) => {
    const ageMap = {};
    users.forEach(user => {
      const age = user.age || 0;
      ageMap[age] = (ageMap[age] || 0) + 1;
    });
    return Object.entries(ageMap).map(([age, count]) => ({ age: parseInt(age), count }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard - Users
      </Typography>

      {/* Table Section */}
      <Card elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6">User Management</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={order}
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Bar Chart - Role Distribution */}
      <Card elevation={3} style={{ padding: "20px", marginTop: "30px" }}>
        <Typography variant="h6" gutterBottom>User Role Distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getRoleData(users)}>
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Pie Chart - Age Distribution */}
      <Card elevation={3} style={{ padding: "20px", marginTop: "30px" }}>
        <Typography variant="h6" gutterBottom>Age Distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={getAgeData(users)}
              dataKey="count"
              nameKey="age"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {getAgeData(users).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
