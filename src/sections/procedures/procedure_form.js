import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { MobileDateTimePicker, MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { COUNTRY_LIST, COUNTY_CODE_TO_CITY_LIST_MAP } from "src/utils/constants";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import procedureService from "src/services/procedureService";

export const ProcedureForm = () => {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const redirectToNewLocation = () => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

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
      firstName: "Anika",
      lastName: "Visser",
      dob: new Date(),
      phone: "",
      email: "demo@devias.io",
      city: "",
      country: "TZ",
    },
  });

  const onDateChange = (name) => (newDate) => {
    // Construct the event value similar to the way you do in handleChange
    const event = {
      target: {
        name,
        value: newDate,
      },
    };

    // Call the existing handleChange function with the constructed event
    handleChange(event);
  };

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    // Check if the field is inside the patient object
    if (name.startsWith("patient.")) {
      // Update the patient object
      setValues((prevValues) => ({
        ...prevValues,
        patient: {
          ...prevValues.patient,
          [name.replace("patient.", "")]: value,
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

  const handleSubmit = useCallback(
    async (event) => {
      setIsSubmitLoading(true);
      event.preventDefault();

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
          procedureDateAndTime: values.procedureDateAndTime,
          patient: {
            firstName: values.patient.firstName,
            lastName: values.patient.lastName,
            dob: values.patient.dob,
            phone: values.patient.phone,
            email: values.patient.email,
            city: values.patient.city,
            country: values.patient.country,
          },
        };

        try {
          await procedureService.createProcedure(newProcedure);
          toast.success("Success! New Procedure Created.");
          setIsSubmitLoading(false);
          redirectToNewLocation();
        } catch (error) {
          // If there's an error, show an error toast
          toast.error(`Error: ${error.message}`);
        }
      } else {
        toast.error("There is a field error! Please check.");
      }
      setIsSubmitLoading(false);
    },
    [values]
  );

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
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
                  <option value="" hidden></option>
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
                    onChange={onDateChange("procedureDateAndTime")}
                    name="procedureDateAndTime"
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
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name or Afya Bora ID"
                  name="patient.firstName"
                  onChange={handleChange}
                  required
                  value={values.patient.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="patient.lastName"
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
                    onChange={onDateChange("patient.dob")}
                    name="patient.dob"
                    renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="patient.phone"
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
                  name="patient.email"
                  onChange={handleChange}
                  value={values.patient.email}
                />
              </Grid>
              <Grid xs={12} whja md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="patient.country"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.patient.country}
                >
                  <option value="" hidden></option>
                  {COUNTRY_LIST.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} whja md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="patient.city"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.patient.city}
                  disabled={!values.patient.country}
                >
                  <option value="" hidden></option>
                  {values.patient.country &&
                    COUNTY_CODE_TO_CITY_LIST_MAP[values.patient.country].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {isSubmitLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitLoading}
            >
              Create
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
  );
};
