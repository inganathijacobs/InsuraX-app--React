import { Box, Typography } from '@mui/material';

export function Home() {
  return (
    <Box sx={{
      textAlign: 'center',
      padding: '32px'
    }}>
      <Typography variant="h2" sx={{ marginBottom: '40px' }}>
        <span style={{ color: '#2e7d32' }}>Smarter</span> car{' '}
        <span style={{ color: '#2e7d32' }}>insurance</span> at your{' '}
        <span style={{ color: '#2e7d32' }}>fingertips</span>.
      </Typography>

      <Box sx={{ display: 'flex', gap: '200px', alignItems: 'center' }}>
        <img
          src="/green_car.png"
          alt="Green car"
          style={{ width: '50%', maxWidth: '600px' }}
        />
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h4" sx={{ marginBottom: '20px', color: '#2e7d32'  }}>
            Get Covered in Minutes
          </Typography>
          <ul  className="list" style={{ paddingLeft: '20px',}}>
            <li>Instant Quotes</li>
            <li>Customisable Plans</li>
            <li>24/7 in-app support</li>
            <li>Claims made easy</li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
}
