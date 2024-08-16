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
import { getUserFromStorage } from "./utils/getUserFromStorage.js";
import Register from "./scenes/register/index.jsx";
import Users from "./scenes/user/index.jsx";

export default function App() {
  const token = getUserFromStorage();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Register />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
