
import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
import "./assets/adminlte.css"
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'

import axios from "axios";
import { useEffect } from 'react'
import "./assets/adminlte.css";
import { AddIncome } from './components/user/AddIncome'
import PrivateRoutes from './hooks/PrivateRoutes'
import { DisplayIncome } from './components/user/DisplayIncome'
import IncomeChart from './components/user/IncomeChart'
import LandingPage from './components/common/LandinPage'
import { UserDashboard } from './components/user/UserDashboard'
import { BudgetDashboard } from './components/user/BudgetDashboard'
import { AddBudget } from './components/user/budget/AddBudget'
import { UpdateBudget } from './components/user/budget/UpdateBudget'
import { TransactionDashboard } from './components/user/transactions/TransactionDashboard'
import { ExpenseDashboard } from './components/user/expense/ExpenseDashboard'
import { FinancialGoalDashboard } from './components/user/financialgoals/FinancialGoalDashboard'
import { ReportDashboard } from './components/user/reports/ReportDashboard'
import { NotificationDashboard } from './components/user/notifications/NotificationDashboard'
import { AddExpense } from './components/user/expense/AddExpense'
import { UpdateExpense } from './components/user/expense/UpdateExpense'
import { UpdateIncome } from './components/user/income/UpdateIncome'
import { AddTransaction } from './components/user/transactions/AddTransaction'
import { AddFinancialGoal } from './components/user/financialgoals/AddFinancialGoal'
import { UpdateFinancialGoal } from './components/user/financialgoals/UpdateFinancialGoal'
import { AdminDashboard } from './components/admin/AdminDashboard'
// import "./assets/adminlte.min.css";
// import "./assets/adminlte.min.css"

function App() {
  // const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://localhost:3000"
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary ";
    }
  }, [location.pathname]);

  return (
    <body className="layout-fixed sidebar-expand-lg bg-body-tertiary">
      <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="" element={<PrivateRoutes />}>

            <Route path="/user" element={<UserSidebar />}>
              <Route path="profile" element={<UserProfile />}></Route>
             
              <Route path="addincome" element={<AddIncome />}></Route>
              <Route path="displayincome" element={<DisplayIncome />}></Route>
              <Route path="updateincome/:id" element={<UpdateIncome />}></Route>
              <Route path="incomechart" element={<IncomeChart />}></Route>
              <Route path="userdashboard" element={<UserDashboard />}></Route>
              <Route path="userdashboard" element={<UserDashboard />}></Route>
              <Route path="budgetdashboard" element={<BudgetDashboard />}></Route>
              <Route path="addbudget" element={<AddBudget />}></Route>
              <Route path="updatebudget/:id" element={<UpdateBudget />}></Route>
              <Route path="transactiondashboard" element={<TransactionDashboard />}></Route>
              <Route path="addtransaction" element={<AddTransaction />}></Route>
              <Route path="expensedashboard" element={<ExpenseDashboard />}></Route>
              <Route path="addexpense" element={<AddExpense />}></Route>
              <Route path="updateexpense/:id" element={<UpdateExpense />}></Route>
              <Route path="financialgoaldashboard" element={<FinancialGoalDashboard />}></Route>
              <Route path="addfinancialgoal" element={<AddFinancialGoal />}></Route>
              <Route path="updatefinancialgoal/:id" element={<UpdateFinancialGoal />}></Route>
              <Route path="reportdashboard" element={<ReportDashboard />}></Route>
              <Route path="notificationdashboard" element={<NotificationDashboard />}></Route>
            </Route>
          </Route>


        </Routes>
      </div>
    </body>

  )
}

export default App
