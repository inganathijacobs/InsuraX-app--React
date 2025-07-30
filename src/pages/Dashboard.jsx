
import AddIcon from "@mui/icons-material/Add";
import { useNavigate,} from "react-router";
import { useState, useEffect} from 'react';
import { Vehicle } from '../components/Vehicle';
import { Link, Navigate, Route, Routes } from "react-router";
import { Button, Box, Grid } from "@mui/material";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";


export function Dashboard() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    async function getVehicles(searchTerm = "") {
        const url = new URL("https://68871b7e071f195ca97f4606.mockapi.io/vehicles");

        if (searchTerm) {
          url.searchParams.append("search", searchTerm);
        }

        const response = await fetch(url, { method: "GET" });
        const vehicles = await response.json();
        setVehicles(vehicles);
      }

      useEffect(() => {
        getVehicles(); // Initial fetch
      }, []);

      const deleteVehicle = async (id) => {
        console.log("Deleting...", id);
        const response = await fetch(
          `https://68871b7e071f195ca97f4606.mockapi.io/vehicles/${id}`,
          { method: "DELETE" }
        );
        const vehicle = await response.json();
        console.log("Deleted", vehicle);
        getVehicles(searchTerm);
      };

      const searchVehicles = (event) => {
        event.preventDefault();
        getVehicles(searchTerm);
      };


    return (
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
         <form onSubmit={searchVehicles} className="search-form-container">
        <TextField
          onChange={(event) => setSearchTerm(event.target.value)}
          label="Search"
          variant="outlined"
          fullWidth

          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
      </Box>
        <Box sx={{ marginBottom: 3 }}>
          <Button
            onClick={() => navigate(`/vehicles/new`)}
            variant="contained"
            sx={{
              backgroundColor: "#2e7d32",
              textTransform: "none",
              marginRight:10
            }}
          >
            Add Vehicle
          </Button>
        </Box>
        <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={3}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={3} key={vehicle.id}>
              <Vehicle vehicle={vehicle}
               deleteBtn={
                <IconButton
                  color="error"
                  onClick={() => deleteVehicle(vehicle.id)}
                  aria-label={`Delete ${vehicle.make} ${vehicle.model}, (${vehicle.year})`}
                >
                  <DeleteIcon />
                </IconButton>
              }


              editBtn={
                <IconButton
                  color="secondary"
                //   onClick={() => navigate(`/movies/${movie.id}/edit`)}
                  aria-label={`Edit ${vehicle.make} ${vehicle.model}, (${vehicle.year})`}
                >
                  <EditIcon />
                </IconButton>
              }
              />
            </Grid>
          ))}
        </Grid>
        </Box>
      </Box>
    );
  }
