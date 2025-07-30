import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2e7d32',
        color: 'black',
        padding: 2,
        textAlign: 'center',
        height:'90px',
        width: '100vw',

      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} InsuraX. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
