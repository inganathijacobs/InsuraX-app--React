
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import { Vehicle } from '../components/Vehicle';
import { Link } from "react-router";
import { Button, Box, Grid, Menu, MenuItem, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

export function Dashboard() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [allVehicles, setAllVehicles] = useState([]); // Store all vehicles for filtering
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedQuotes, setSelectedQuotes] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Get unique years from vehicles
    const availableYears = [...new Set(allVehicles.map(v => v.year))].sort((a, b) => b - a);

    async function getVehicles(searchTerm = "") {
        const url = new URL("https://68871b7e071f195ca97f4606.mockapi.io/vehicles");

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        const response = await fetch(url, { method: "GET" });
        const vehicles = await response.json();
        setAllVehicles(vehicles); // Store all vehicles
        setVehicles(vehicles); // Initially show all vehicles
    }

    useEffect(() => {
        getVehicles(); // Initial fetch
        getSelectedQuotes(); // Also fetch selected quotes
    }, []);

    // Apply filters whenever search term or selected years change
    useEffect(() => {
        let filtered = [...allVehicles];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(vehicle =>
                vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.registration_no.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply year filter
        if (selectedYears.length > 0) {
            filtered = filtered.filter(vehicle =>
                selectedYears.includes(vehicle.year)
            );
        }

        setVehicles(filtered);
    }, [searchTerm, selectedYears, allVehicles]);

    const deleteVehicle = async (id) => {
        const response = await fetch(
            `https://68871b7e071f195ca97f4606.mockapi.io/vehicles/${id}`,
            { method: "DELETE" }
        );
        await response.json();
        getVehicles(searchTerm);
    };

    const searchVehicles = (event) => {
        event.preventDefault();
        // Filtering is now handled by useEffect
    };

    async function getSelectedQuotes() {
        const response = await fetch("https://688a4c6a4c55d5c73955d2ff.mockapi.io/selectedquotes");
        const quotes = await response.json();
        setSelectedQuotes(quotes);
    }

    const handleYearFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleYearFilterClose = () => {
        setAnchorEl(null);
    };

    const toggleYearFilter = (year) => {
        setSelectedYears(prev =>
            prev.includes(year)
                ? prev.filter(y => y !== year)
                : [...prev, year]
        );
    };

    const clearYearFilters = () => {
        setSelectedYears([]);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                gap: 2
            }}>
                <Box sx={{ flex: 1 }}>
                    <form onSubmit={searchVehicles} style={{ width: '100%' }}>
                        <TextField
                            onChange={(event) => setSearchTerm(event.target.value)}
                            value={searchTerm}
                            label="Search"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                </Box>

                <Button
                    onClick={handleYearFilterClick}
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    sx={{ height: '56px' }}
                >
                    Filter by Year
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleYearFilterClose}
                    PaperProps={{
                        style: {
                            maxHeight: 300,
                            width: '200px',
                        },
                    }}
                >
                    <MenuItem onClick={clearYearFilters} disabled={selectedYears.length === 0}>
                        Clear Filters
                    </MenuItem>
                    {availableYears.map(year => (
                        <MenuItem
                            key={year}
                            onClick={() => toggleYearFilter(year)}
                            selected={selectedYears.includes(year)}
                        >
                            {year}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

            {selectedYears.length > 0 && (
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selectedYears.map(year => (
                        <Chip
                            key={year}
                            label={year}
                            onDelete={() => toggleYearFilter(year)}
                            color="primary"
                        />
                    ))}
                    <Button
                        size="small"
                        onClick={clearYearFilters}
                        sx={{ ml: 1 }}
                    >
                        Clear
                    </Button>
                </Box>
            )}

            <Box sx={{ marginBottom: 3 }}>
                <Button
                    onClick={() => navigate(`/vehicles/new`)}
                    variant="contained"
                    sx={{
                        backgroundColor: "#2e7d32",
                        textTransform: "none",
                    }}
                >
                    Add Vehicle
                </Button>
            </Box>

            <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
                <Grid container spacing={3}>
                    {vehicles.map((vehicle) => (
                        <Grid item xs={12} sm={6} md={3} key={vehicle.id}>
                            <Vehicle
                                vehicle={vehicle}
                                quotes={selectedQuotes}
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
                                        component={Link}
                                        to={`/vehicles/${vehicle.id}/edit`}
                                        color="secondary"
                                        aria-label={`Edit ${vehicle.make} ${vehicle.model} (${vehicle.year})`}
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
