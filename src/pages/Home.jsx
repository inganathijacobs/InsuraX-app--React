
import { Box } from '@mui/material';

export function Home() {
    return(
    <Box className="main_page"   sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start', // push content to the left
      gap: 4,
      flexWrap: 'wrap', // still allows stacking on small screens
      width: '100%',     // ensure full width
      padding: '0 32px', // optional horizontal padding
    }}>
        <h1 className="main_heading"> <span className="green-words">Smarter</span> car <span className="green-words">insurance</span> at your <span className="green-words">fingertips</span>.</h1>
          <Box
                    component="img"
                    src="/green_car.png" // ✅ if it's in public folder
                    alt="Logo"
                    sx={{
                      height: 400,
                      width: 600,
                      marginLeft:0,

                    }}
                  />
        <Box>
          <h3>Get Covered in Minutes</h3>
          <ul>
            <li>Instant Quotes</li>
            <li>Customisable Plans</li>
            <li>24/7 in-app support</li>
            <li>Claims made easy</li>
          </ul>
        </Box>
        </Box>
     ) ;
  }
