import { Box, Typography, Button } from '@mui/material';
export function NotFound() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        mt:-20,

      }}
    >
      <Typography variant="h1" sx={{ fontSize: '96', fontWeight: 'bold', color:'#2e7d32'}}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 , color:'#2e7d32'}}>
        Page Not Found
      </Typography>
      <Typography sx={{ mb: 4, maxWidth: '400px' , color:'#2e7d32' }}>
        The page you're looking for doesn't exist.
      </Typography>

    </Box>
  );
}
