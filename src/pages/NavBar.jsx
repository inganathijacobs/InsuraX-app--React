
import { Link, Navigate, Route, Routes } from "react-router";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const Navbar = () => {
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        {/* Menu icon (for mobile) */}


        {/* Logo / Brand Name */}
        <Box
          component="img"
          src="/logo.png" // ✅ if it's in public folder
          alt="Logo"
          sx={{
            height: 120,
            width: 150,
            marginRight: 12,
          }}
        />
        {/* Nav links (hidden on mobile) */}
        <Box sx={{display:'flex', gap:12,}}>
          <Button color="inherit" className="nav-button" > <Link to="/"  style={{ color: 'black', textDecoration: 'none' }}>Home</Link></Button>
          <Button color="inherit" className="nav-button"> <Link to="dashboard"  style={{ color: 'black', textDecoration: 'none' }}>Dashboard</Link></Button>
          <Button color="inherit" className="nav-button">Contact</Button>
          <Button  sx={{
            borderColor:'#2e7d32',
            color:'black',
            fontSize:'20px',
          }} variant="outlined">Login</Button>
          <Button  sx={{
            backgroundColor:'#2e7d32',fontSize:'20px',
          }} variant="contained">Sign Up</Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
