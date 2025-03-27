// eslint-disable-next-line no-unused-vars
import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";


export const UserDashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    { title: "Income", icon: <AttachMoneyIcon />, path: "/user/displayincome" },
    { title: "Budget", icon: <AccountBalanceWalletIcon />, path: "/user/budgetdashboard" },
    { title: "Expenses", icon: <ShoppingCartIcon />, path: "/user/expensedashboard" },
    { title: "Transactions", icon: <CompareArrowsIcon />, path: "/user/transactiondashboard" },
    { title: "Financial Goals", icon: <TrendingUpIcon />, path: "/user/financialgoaldashboard" },
    { title: "Reports", icon: <AssessmentIcon />, path: "/user/reportdashboard" },
    { title: "Notifications", icon: <NotificationsActiveIcon />, path: "/user/notificationdashboard" },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        User Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                transition: "0.3s",
                '&:hover': {
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                <div style={{ fontSize: "3rem", marginBottom: "10px" }}>{item.icon}</div>
                <Typography variant="h6">{item.title}</Typography>
                <Button variant="contained" color="primary" fullWidth>
                  View {item.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

