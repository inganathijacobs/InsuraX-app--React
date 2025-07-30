import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

// /movies/new - AddMovie
export function AddVehicle() {
  // input box - variable
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [registration_no, setRegistration] = useState("");
  const [kms, setKms] = useState("");
  const navigate = useNavigate();

  const addVehicle = async (event) => {
    event.preventDefault(); // Prevent Refesh Behaviour
      // Get the image URL
  const imageUrl = await getCarImage(make, model);


    // setColors([...colors, color]);
    console.log("addVehicle", make, model);

    // Object Short hand
    const newVehicle = {
      make,
      model,
      year,
      registration_no,
      kms,
      image:imageUrl,
    };



    async function getCarImage(make, model) {
      const accessKey = "lDxM5Q3A5zXVCkRB5xL7E6iz9s5GMyWeloMp-Ks3ses";
      const query = `${make} ${model} car`;
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=1`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small; // or 'regular' for bigger image
      }
      return null; // fallback in case no image found
    }





    // // Copy the existing movies + New movie
    // setMovies([...movies, newMovie]);
    // API Call

    // POST
    // 1. method - POST
    // 2. Body - data (JSON)
    // 3. Header - JSON - (Inform to the backend JSON data)

    const response = await fetch(
      "https://68871b7e071f195ca97f4606.mockapi.io/vehicles",
      {
        method: "POST",
        body: JSON.stringify(newVehicle),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    // Programmatically
    navigate("/dashboard"); // +1 -> go forward, -1 -> go back
  };

  return (
    <form onSubmit={addVehicle} className="vehicle-form-container">
      <TextField
        onChange={(event) => setMake(event.target.value)}
        label="Make"
        variant="outlined"
      />
      <TextField
        onChange={(event) => setModel(event.target.value)}
        label="Model"
        variant="outlined"
      />
      <TextField
        onChange={(event) => setYear(event.target.value)}
        label="Year"
        variant="outlined"
      />
      <TextField
        onChange={(event) => setRegistration(event.target.value)}
        label="Registration Number"
        variant="outlined"
      />
      <TextField
        onChange={(event) => setKms(event.target.value)}
        label="Currents kms"
        variant="outlined"
      />

      {/* Integrated Third party package - MUI */}
      {/* Task 3.1 - Convert to Add to Material button */}
      <Button type="submit" variant="contained" startIcon={<AddIcon />}>
        Add
      </Button>
    </form>
  );
}
