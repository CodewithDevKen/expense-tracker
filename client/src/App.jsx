import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme.js";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import { useMemo } from "react";
import "./App.scss";
import Layout from "./scenes/layout/index.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";
import Register from "./scenes/register/index.jsx";
import Users from "./scenes/user/index.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CategoriesList from "./scenes/category/CategoriesList.jsx";
import AddCategory from "./scenes/category/AddCategory.jsx";
import AddTransaction from "./scenes/transaction/AddTransaction.jsx";
import Profile from "./scenes/user/profile.jsx";

export default function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />}></Route>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<Register />} />
              <Route path="/users" element={<Users />} />
              <Route path="/add category" element={<AddCategory />} />
              <Route path="/categories" element={<CategoriesList />} />
              <Route path="/add transaction" element={<AddTransaction />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
