import { Navigate, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import Navbar from './pages/NavBar';
import Footer from './pages/Footer';
import { Dashboard } from './pages/Dashboard';
import { AddVehicle } from './pages/AddVehicle';
import { ThemeProvider, createTheme, CssBaseline, Paper, Box } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { GetQuote } from "./pages/GetQuote";
import { QuoteConfirmation } from "./pages/QuoteConfirmation";
import EditVehicle from "./pages/EditVehicle";


export default function App() {
  const [mode, setMode] = useState("light");

  // Simple theme configuration - this is all you need!
  const theme = createTheme({
    palette: {
      mode: mode, // 'light' or 'dark'
      primary: {
        main: '#000000' // Your green color from the navbar
      },
    },
  });

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Navbar theme={mode} toggleTheme={toggleTheme} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/vehicles/new" element={<AddVehicle />} />
            <Route path="/quotes/:vehicleId" element={<GetQuote />} />
            <Route path="/confirm" element={<QuoteConfirmation />} />
            <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
          </Routes>
        </Box>

        <Footer />
      </Paper>
    </ThemeProvider>
  );
}
