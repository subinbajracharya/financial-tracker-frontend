import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import DefaultLayout from "./components/layout/DefaultLayout";
import { ToastContainer } from "react-toastify";
import Auth from "./auth/Auth";
import { useUser } from "./context/userContext";
import { useDispatch } from "react-redux";
import VerifyEmail from "./pages/VerifyEmail";
import { fetchTransactions } from "./features/transactions/transactionAction";

function App() {
  const [count, setCount] = useState(0);
  const { user, setUser, autoLogin } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    // First call
    autoLogin();
    // Interval call
    setInterval(autoLogin, 180000);
  }, []);

  useEffect(() => {
    user && user._id ? dispatch(fetchTransactions()) : "";
  }, [user?._id]);

  return (
    <>
      {/* Define the routes */}
      <div className="wrapper">
        <Routes>
          <Route path="*" element={<DefaultLayout />}>
            {/* Public */}
            <Route path="" element={<Login />} />
            {/* Login */}
            <Route path="login" element={<Login />} />
            {/* Signup */}
            <Route path="signup" element={<Signup />} />
            {/* Verify */}
            <Route path="verify-email" element={<VerifyEmail />} />

            {/* Private  */}
            {/* dashboard */}
            <Route
              path="dashboard"
              element={
                <Auth>
                  <Dashboard />
                </Auth>
              }
            />
            {/* transaction */}
            <Route
              path="transaction"
              element={
                <Auth>
                  <Transaction />
                </Auth>
              }
            />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
