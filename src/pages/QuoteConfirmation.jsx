import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useState } from "react";

export const QuoteConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!data?.vehicleId || !data?.insuranceName || !data?.quote) {
        throw new Error("Missing required quote information");
      }

      const payload = {
        vehicleId: String(data.vehicleId),
        insuranceName: data.insuranceName,
        quote: String(data.quote),
        insuranceDescription: data.insuranceDescription || '',
        insuranceFeatures: data.insuranceFeatures || [],
        createdAt: new Date().toISOString()
      };

      let existingQuotes = [];
      try {
        const checkResponse = await fetch(
          `https://688a4c6a4c55d5c73955d2ff.mockapi.io/selectedquotes?vehicleId=${data.vehicleId}`
        );
        existingQuotes = checkResponse.ok ? await checkResponse.json() : [];
      } catch (error) {
        console.error("Error checking existing quotes:", error);
      }

      if (existingQuotes.length > 0) {
        try {
          await fetch(
            `https://688a4c6a4c55d5c73955d2ff.mockapi.io/selectedquotes/${existingQuotes[0].id}`,
            { method: "DELETE" }
          );
        } catch (error) {
          console.error("Error deleting old quote:", error);
        }
      }

      const apiResponse = await fetch(
        "https://688a4c6a4c55d5c73955d2ff.mockapi.io/selectedquotes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Failed to save quote");
      }

      navigate("/dashboard", {
        state: {
          refresh: Date.now(),
          successMessage: "Quote successfully confirmed!"
        }
      });

    } catch (error) {
      setError(error.message);
      console.error("Quote confirmation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          No quote data found. Please start over.
        </Alert>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" p={2}>
      <Card sx={{
        maxWidth: 500,
        width: '100%',
        borderTop: `4px solid #2e7d32`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{
            fontWeight: 600,
            color: '#2e7d32',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2
          }}>
            <DoneAllIcon color="inherit" fontSize="medium" />
            Confirm Your Quote
          </Typography>

          <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Vehicle Details
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {data.vehicleYear} {data.vehicleMake} {data.vehicleModel}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Insurance Provider
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
              {data.insuranceName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.insuranceDescription}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Coverage Includes
            </Typography>
            <List dense sx={{ py: 0 }}>
              {data.insuranceFeatures?.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon sx={{ color: '#2e7d32', fontSize: '1rem' }} />
                  </ListItemIcon>
                  <Typography variant="body2">{feature}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Quote Summary
            </Typography>
            <Box sx={{
              bgcolor: '#f5f5f5',
              p: 1.5,
              borderRadius: 1,
              borderLeft: `3px solid #2e7d32`
            }}>
              <Typography variant="h5" color="#2e7d32" sx={{ fontWeight: 600 }}>
                R{data.quote}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Monthly premium
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              disabled={loading}
              sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{
                bgcolor: '#2e7d32',
                '&:hover': { bgcolor: '#1b5e20' },
                minWidth: 120
              }}
            >
              {loading ? 'Processing...' : 'Confirm'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
