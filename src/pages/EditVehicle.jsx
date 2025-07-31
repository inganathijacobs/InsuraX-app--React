import { useNavigate, useParams } from "react-router";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { useEffect, useState } from "react";

const EditVehicle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation schema
  const vehicleSchema = object({
    make: string().required("Make is required"),
    model: string().required("Model is required"),
    year: number()
      .required("Year is required")
      .min(1900, "Must be after 1900")
      .max(new Date().getFullYear(), "Can't be in future"),
    registration_no: string()
      .required("Registration is required")
      .min(8, "Minimum 8 characters")
      .max(10, "Maximum 10 characters"),
    kms: number()
      .required("Kilometers required")
      .min(0, "Must be positive"),
    value: number()
      .required("Value required")
      .min(0, "Must be positive"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      make: "",
      model: "",
      year: "",
      registration_no: "",
      kms: "",
      value: "",
      image: "",
    },
    validationSchema: vehicleSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(
          `https://68871b7e071f195ca97f4606.mockapi.io/vehicles/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              year: Number(values.year),
              kms: Number(values.kms),
              value: Number(values.value),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update vehicle");
        }

        setSubmitSuccess(true);
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (error) {
        setSubmitError(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch vehicle data on mount
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(
          `https://68871b7e071f195ca97f4606.mockapi.io/vehicles/${id}`
        );

        if (!response.ok) {
          setNotFound(true);
          return;
        }

        const data = await response.json();
        formik.setValues({
          make: data.make,
          model: data.model,
          year: data.year.toString(),
          registration_no: data.registration_no,
          kms: data.kms.toString(),
          value: data.value.toString(),
          image: data.image || "",
        });
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" gutterBottom>
          Vehicle not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard")}
          sx={{ backgroundColor: "#2e7d32", mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth={600} mx="auto" p={3}>
      <Typography
        variant="h4"
        sx={{
          color: "#2e7d32",
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Edit Vehicle
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Vehicle updated successfully! Redirecting...
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Make"
          name="make"
          value={formik.values.make}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.make && Boolean(formik.errors.make)}
          helperText={formik.touched.make && formik.errors.make}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Model"
          name="model"
          value={formik.values.model}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Year"
          name="year"
          type="number"
          value={formik.values.year}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.year && Boolean(formik.errors.year)}
          helperText={formik.touched.year && formik.errors.year}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Registration Number"
          name="registration_no"
          value={formik.values.registration_no}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.registration_no && Boolean(formik.errors.registration_no)}
          helperText={formik.touched.registration_no && formik.errors.registration_no}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Kilometers"
          name="kms"
          type="number"
          value={formik.values.kms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.kms && Boolean(formik.errors.kms)}
          helperText={formik.touched.kms && formik.errors.kms}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Value (R)"
          name="value"
          type="number"
          value={formik.values.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.value && Boolean(formik.errors.value)}
          helperText={formik.touched.value && formik.errors.value}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
          fullWidth
          disabled={formik.isSubmitting}
          sx={{
            backgroundColor: "#2e7d32",
            "&:hover": { backgroundColor: "#1b5e20" },
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          {formik.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Box>
  );
};

export default EditVehicle;
