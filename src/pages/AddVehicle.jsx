import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { Box, Typography } from "@mui/material";

export function AddVehicle() {
  const navigate = useNavigate();

  const vehicleSchema = object({
    make: string().required("Enter car make."),
    model: string().required("Enter car model."),
    year: number()
      .required("Enter car year.")
      .min(1900, "Enter a valid year (after 1900).")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    registration_no: string()
      .required("Enter car registration number.")
      .min(8, "Registration number must be at least 8 characters.")
      .max(10, "Cannot exceed 10 characters"),
    kms: number()
      .required("Enter current kms.")
      .min(1, "Kms must be greater than 0."),
    value: number()
      .required("Enter current value of car.")
      .min(1, "Value must be greater than R0."),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      make: "",
      model: "",
      year: "",
      registration_no: "",
      kms: "",
      value: ""
    },
    validationSchema: vehicleSchema,
    onSubmit: async (values) => {
      try {
        const imageUrl = await getCarImage(values.make, values.model);

        const newVehicle = {
          make: values.make,
          model: values.model,
          year: Number(values.year),
          registration_no: values.registration_no,
          kms: Number(values.kms),
          value: Number(values.value),
          image: imageUrl || "default-car.jpg"
        };

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

        if (response.ok) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error adding vehicle:", error);
      }
    },
  });

  async function getCarImage(make, model) {
    try {
      const accessKey = "lDxM5Q3A5zXVCkRB5xL7E6iz9s5GMyWeloMp-Ks3ses";
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${make}+${model}+car&client_id=${accessKey}&per_page=1`
      );
      const data = await response.json();
      return data.results?.[0]?.urls?.small;
    } catch (error) {
      console.error("Error fetching car image:", error);
      return null;
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
     <Typography variant="h4" sx={{  color: '#2e7d32', textAlign:'center', mt:-4, mb:2,}}>Vehicle Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="make"
          label="Make"
          value={values.make}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.make && Boolean(errors.make)}
          helperText={touched.make && errors.make}
          fullWidth
          margin="normal"
        />

        <TextField
          name="model"
          label="Model"
          value={values.model}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.model && Boolean(errors.model)}
          helperText={touched.model && errors.model}
          fullWidth
          margin="normal"
        />

        <TextField
          name="year"
          label="Year"
          type="number"
          value={values.year}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.year && Boolean(errors.year)}
          helperText={touched.year && errors.year}
          fullWidth
          margin="normal"
        />

        <TextField
          name="registration_no"
          label="Registration Number"
          value={values.registration_no}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.registration_no && Boolean(errors.registration_no)}
          helperText={touched.registration_no && errors.registration_no}
          fullWidth
          margin="normal"
        />

        <TextField
          name="kms"
          label="Kilometers"
          type="number"
          value={values.kms}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.kms && Boolean(errors.kms)}
          helperText={touched.kms && errors.kms}
          fullWidth
          margin="normal"
        />

        <TextField
          name="value"
          label="Value (R)"
          type="number"
          value={values.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.value && Boolean(errors.value)}
          helperText={touched.value && errors.value}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mt: 3, backgroundColor: '#2e7d32' }}
          fullWidth
        >
          Add Vehicle
        </Button>
      </form>
    </Box>
  );
}
