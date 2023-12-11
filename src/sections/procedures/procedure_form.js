import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { MobileDateTimePicker, MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


export const ProcedureForm = () => {
  const [procedureTypes, setProcedureTypes] = useState([
    { value: "brain-surgery", label: "Brain Surgery" },
    { value: "heart-surgery", label: "Heart Surgery" },
    { value: "orthopedic-surgery", label: "Orthopedic Surgery" },
  ]);

  const [values, setValues] = useState({
    procedureType: "",
    procedureDetails: "",
    procedureDateAndTime: new Date(),
    patient: {
      afyaBoraId: "",
      firstName: "Anika",
      lastName: "Visser",
      dob: new Date(),
      phone: "",
      email: "demo@devias.io",
      city: "",
      country: "USA",
    },
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
  
    // Check if the field is inside the patient object
    if (name.startsWith('patient.')) {
      // Update the patient object
      setValues((prevValues) => ({
        ...prevValues,
        patient: {
          ...prevValues.patient,
          [name.replace('patient.', '')]: value,
        },
      }));
    } else {
      // Update other fields
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  }, []);

  const handleSubmit = useCallback(() => {
    // Add your validation logic here
    if (
      values.procedureType &&
      values.procedureDetails &&
      values.patient.firstName &&
      values.patient.lastName &&
      values.patient.phone &&
      values.patient.email
    ) {
      // Validation passed, you can create a new Procedure interface or perform further actions
      const newProcedure = {
        procedureType: values.procedureType,
        procedureDetails: values.procedureDetails,
        patient: {
          afyaBoraId: values.patient.afyaBoraId,
          firstName: values.patient.firstName,
          lastName: values.patient.lastName,
          dob: values.patient.dob,
          phone: values.patient.phone,
          email: values.patient.email,
          city: values.patient.city,
          country: values.patient.country,
        },
      };

      console.log("New Procedure:", newProcedure);
    } else {
      // Validation failed, handle accordingly (show error message, etc.)
      console.error("Validation failed");
    }
  }, [values]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Enter details about your new procedure" title="Procedure" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} whja md={6}>
                <TextField
                  fullWidth
                  label="Select Procedure"
                  name="procedureType"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.procedureType}
                >
                  <option value="" hidden>
                  </option>
                  {procedureTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDateTimePicker
                    label="Select Date and Time"
                    timezone="Africa/Nairobi"
                    onChange={handleChange}
                    value={values.procedureDateAndTime}
                    renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4} // Adjust the number of rows as needed
                  label="Procedure Details"
                  name="procedureDetails"
                  onChange={handleChange}
                  value={values.procedureDetails}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardHeader
          subheader="Patient details are utilized for automated communication regarding the procedure and for future reference by medical personnel."
          title="Patient Details"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  helperText="Enter Afya Bora ID to automatically get information. If patient is new then we will generate one for them right here."
                  label="Afya Bora ID"
                  name="afyaBoraId"
                  onChange={handleChange}
                  value={values.patient.afyaBoraId}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.patient.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.patient.lastName}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Date of birth"
                    timezone="Africa/Nairobi"
                    value={values.patient.dob}
                    onChange={handleChange}
                    renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.patient.phone}
                  placeholder="+255 754 28 4550"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={values.patient.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleChange}
                  required
                  value={values.patient.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.patient.country}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Create</Button>
        </CardActions>
      </Card>
    </form>
  );
};
