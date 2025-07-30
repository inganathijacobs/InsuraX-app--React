import { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router";
// import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import Tooltip from "@mui/material/Tooltip";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";


// Presentation
export function Vehicle({ vehicle, deleteBtn,editBtn }) {
    return (
      <Card
        sx={{
            width: 280,
            maxWidth: 300,
            height:400,
          borderRadius: 4,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </Typography>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Reg No: {vehicle.registration_no}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              KMs: {vehicle.kms}
            </Typography>
          </Box>
          {editBtn}{deleteBtn}
          <Button
            variant="contained"
            sx={{
                marginTop:4,
                marginLeft:8,
              backgroundColor: "#2e7d32",
              textTransform: "none",
            }}
            onClick={() => navigate(`/quotes`)}
          >
           Get Quote
          </Button>
        </CardContent>
      </Card>
    );
  }
