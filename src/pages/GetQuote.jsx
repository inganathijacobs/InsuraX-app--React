import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Grid,
  Box,
  Button,
  Container,
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const GetQuote = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vehicleRes, insuranceRes] = await Promise.all([
          fetch(`https://68871b7e071f195ca97f4606.mockapi.io/vehicles/${vehicleId}`),
          fetch("https://688a4c6a4c55d5c73955d2ff.mockapi.io/quotes")
        ]);

        const [vehicleData, insuranceData] = await Promise.all([
          vehicleRes.json(),
          insuranceRes.json()
        ]);

        setVehicle(vehicleData);
        setInsuranceData(insuranceData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vehicleId]);

  const handleSelectQuote = (company, quoteValue) => {
    navigate("/confirm", {
      state: {
        vehicleId: vehicle.id,
        vehicleMake: vehicle.make,
        vehicleModel: vehicle.model,
        vehicleYear: vehicle.year,
        insuranceName: company.name,
        insuranceDescription: company.description,
        insuranceFeatures: company.features,
        quote: quoteValue,
      }
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!vehicle) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="error">
          No vehicle found
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" component="h1" sx={{
          fontWeight: 600,
          color: 'text.primary'
        }}>
          Insurance Quotes for {vehicle.make} {vehicle.model} ({vehicle.year})
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {insuranceData.map((company) => {
          const quote = (vehicle.value * company.rate).toFixed(2);

          return (
            <Grid item xs={12} sm={6} md={4} key={company.id} sx={{ display: 'flex' }}>
              <Card sx={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',

              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={2} justifyContent="center">
                    <Box
                      bgcolor="#2e7d32"
                      color="white"
                      width={40}
                      height={40}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="50%"
                      mr={2}
                      fontWeight={600}
                    >
                      {company.name.charAt(0)}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {company.name}
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph textAlign="center">
                    {company.description}
                  </Typography>

                  <Box
                    bgcolor="#f5f5f5"
                    p={2}
                    borderRadius={1}
                    mb={3}
                    textAlign="center"
                  >
                    <Typography variant="h5" color="primary" fontWeight={600}>
                      R{quote}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Monthly premium
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" fontWeight={500} mb={2} textAlign="center">
                    Coverage includes:
                  </Typography>

                  <List dense disablePadding>
                    {company.features.map((feature, index) => (
                      <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                        <Box display="flex" alignItems="center">
                          <CheckCircleOutlineIcon
                            color="success"
                            sx={{ fontSize: 16, mr: 1 }}
                          />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <Box p={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => handleSelectQuote(company, quote)}
                    sx={{
                      bgcolor: '#2e7d32',

                      fontWeight: 600
                    }}
                  >
                    Select Plan
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
