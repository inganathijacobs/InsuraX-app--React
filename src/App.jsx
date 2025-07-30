import { Link, Navigate, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import Navbar from './pages/NavBar';
import Footer from './pages/Footer';
import {Dashboard} from './pages/Dashboard';
import {AddVehicle} from './pages/AddVehicle';
import Box from '@mui/material/Box';
import "./App.css";
import { GetQuote } from "./pages/GetQuote";

// Component = UI + Logic
// Default Export
export default function App() {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%', // ✅ use % instead of vw
      overflowX: 'hidden', // ✅ optional safety
    }}
  >

      <Navbar/>
      <Box sx={{ flexGrow: 1, paddingTop: '200px', }}>
        {/* Your content here */}

        <Routes>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home/>} />
        < Route path="*" element={<NotFound/>}/>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/vehicles/new" element={<AddVehicle />} />
        <Route path="/quotes" element={<GetQuote />} />
      </Routes>
      </Box>
      <Footer />
    </Box>
  );
}
