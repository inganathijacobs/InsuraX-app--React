import { Button, Card, CardMedia, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export function Vehicle({ vehicle, quotes, deleteBtn, editBtn }) {
    const navigate = useNavigate();

   //find quote for each vehicle (if it already exists)
    const vehicleQuote = quotes?.find(q => q.vehicleId === vehicle.id.toString());

    return (
        <Card sx={{
            width: 365,
            maxWidth: 400,
            height: 'auto',
            borderRadius: 4,
            boxShadow: 3,
        }}>
            <CardMedia
                component="img"
                height="300"
                image={vehicle.image}
                alt={`${vehicle.make} ${vehicle.model}`}

            />

            <CardContent sx={{ p: 2.5 }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                </Typography>

                <Stack spacing={1} mb={2}>
                    <Box display="flex" alignItems="center">
                        <DirectionsCarIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            <strong>Reg No:</strong> {vehicle.registration_no}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <LocalGasStationIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            <strong>KMs:</strong> {vehicle.kms.toLocaleString()}
                        </Typography>
                    </Box>
                </Stack>

                {/* Insurance status */}
                {vehicleQuote ? (
                    <Chip
                        icon={<CheckCircleIcon fontSize="small" />}
                        label={`Insured with ${vehicleQuote.insuranceName} for R${vehicleQuote.quote} p.m`}
                        color="success"
                        variant="outlined"
                        sx={{
                            mb: 2,
                            px: 1,
                            py: 1.5,
                            borderRadius: 1,
                        }}
                    />
                ) : (
                    <Chip
                        label="No active insurance"
                        color="default"
                        variant="outlined"
                        sx={{
                            mb: 2,
                            px: 1,
                            py: 1.5,
                            borderRadius: 1,
                            borderStyle: 'dashed'
                        }}
                    />
                )}

                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Box>
                        {editBtn}
                        {deleteBtn}
                    </Box>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: "#2e7d32",
                            textTransform: "none",
                            fontWeight: 'bold',
                            px: 3,
                        }}
                        onClick={() => navigate(`/quotes/${vehicle.id}`)}
                    >
                        {vehicleQuote ? "Change Quote" : "Get Quote"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
