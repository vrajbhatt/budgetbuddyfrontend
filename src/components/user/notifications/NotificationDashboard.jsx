// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Badge } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export const NotificationDashboard = () => {
    const [notifications, setNotifications] = useState([]);
  const userId = "USER_ID_HERE"; // Replace with actual user ID

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notifications", { params: { userId } });
      setNotifications(res.data.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notifications/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        <Badge color="secondary" badgeContent={notifications.length}>
          <NotificationsActiveIcon fontSize="large" />
        </Badge>
        Notifications Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <TableRow key={notification._id}>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>{new Date(notification.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDelete(notification._id)}>
                      Dismiss
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" align="center">No notifications available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};