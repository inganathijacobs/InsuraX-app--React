import { Link } from "react-router";
import { AppBar, Toolbar, Button, IconButton,Box } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme === 'light' ? '#FAF9F7' : 'primary.dark',
        color: theme === 'light' ? 'text.primary' : 'text.secondary',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'

      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 150,
              width: 200,
              marginTop: 16,
              filter: theme === 'dark' ? 'invert(1)' : 'none'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: 'inherit',
              textTransform: 'none',
              fontSize: '1.75rem'
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            sx={{
              color: 'inherit',
              textTransform: 'none',
              fontSize: '1.75rem'
            }}
          >
            Dashboard
          </Button>
          <Button
            sx={{
              color: 'inherit',
              textTransform: 'none',
              fontSize: '1.75rem'
            }}
          >
            Contact
          </Button>
        </Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              color: 'inherit',
              borderColor: '#2e7d32',
              textTransform: 'none',
              fontSize: '1.25rem'
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2e7d32',
              color: '#fff',
              textTransform: 'none',
              fontSize: '1.25rem',

            }}
          >
            Sign Up
          </Button>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: 'inherit' }}
          >
            {theme === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
