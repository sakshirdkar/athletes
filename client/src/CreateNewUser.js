import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ky from "ky";

import {
  FormLabel,
  Checkbox,
  Skeleton,
  Avatar,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  ListItemText,
  InputLabel,
  Input,
  FormHelperText,
  Paper,
  FormGroup,
  List,
  ListItem,
} from "@mui/material";

const sports = ["Golf", "Tennis", "Cricket", "Basketball", "Baseball"];

const CreateNewUser = ({ open, setOpen }) => {
  //for clean code all these states can be combined into one state
  const [activeStep, setActiveStep] = React.useState(0);
  const [checked, setChecked] = useState([]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [team, setTeam] = useState("");
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    dob: false,
    gender: false,
    team: false,
    about: false,
    interests: false,
    address: false,
    checked: false,
  });
  const [] = useState();
  const [profileImage, setProfileImage] = useState(null);

  //By using steps object, it is easy to see that we can  sepaerate the stepper form component from
  //create new user component and use the stepper componenet with other forms throughout the app.

  //in the interest of time, combined stepper component with create new user compoenent.
  const steps = [
    {
      label: "Personal Information",
      render: (
        <Paper sx={{ mx: 5 }}>
          <FormControl sx={{ mt: 2 }} fullWidth required>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              error={name === "" && touchedFields.name}
              sx={{ px: 2 }}
              id="name"
              name="name"
              value={name}
              aria-describedby="user name"
              onBlur={(e) => {
                setTouchedFields({
                  ...touchedFields,
                  name: true,
                });
              }}
              required
            />
            <FormHelperText id="name-helper-text">
              Please enter your name
            </FormHelperText>
          </FormControl>
          {/* when we use the type= "date" in the below form we can select the date from datepicker  */}
          <FormControl sx={{ mt: 2 }} fullWidth required>
            <InputLabel htmlFor="dob"></InputLabel>
            <Input
              onChange={(e) => {
                setDob(e.target.value);
              }}
              error={dob === "" && touchedFields.dob}
              sx={{ px: 2 }}
              id="dob"
              type="text"
              //type="date"
              name="dob"
              value={dob}
              aria-describedby="Date of Birth"
              onBlur={(e) => {
                setTouchedFields({
                  ...touchedFields,
                  dob: true,
                });
              }}
              // onFocus="(type='date')"
              // onBlur="if(!value)type='text'"
              required
            />
            <FormHelperText id=" name-helper-text ">
              Select your Date of Birth
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth required>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              defaultValue="female"
              name="gender"
              value={gender}
              sx={{ px: 2 }}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth required>
            <InputLabel htmlFor="address">Address Line 1</InputLabel>
            <Input
              error={address === "" && touchedFields.address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              sx={{ px: 2 }}
              id="address"
              type="text"
              name="address"
              value={address}
              aria-describedby="address"
              onBlur={(e) => {
                setTouchedFields({
                  ...touchedFields,
                  address: true,
                });
              }}
              required
            />
            <FormHelperText id=" address ">
              Please enter your location Address
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel htmlFor="dob">City</InputLabel>
            <Input
              onChange={(e) => {
                setCity(e.target.value);
              }}
              sx={{ px: 2 }}
              id="City"
              type="text"
              name="city"
              value={city}
              aria-describedby="City"
              required
            />
            <FormHelperText id=" City ">
              Please enter your location City
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel htmlFor="state">State</InputLabel>
            <Input
              onChange={(e) => {
                setState(e.target.value);
              }}
              sx={{ px: 2 }}
              id="state"
              type="text"
              name="state"
              value={state}
              aria-describedby="state"
              required
            />
            <FormHelperText id=" state ">
              Please enter your location State
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel htmlFor="country">Country</InputLabel>
            <Input
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              sx={{ px: 2 }}
              id="country"
              type="text"
              name="country"
              value={country}
              aria-describedby="country"
              required
            />
            <FormHelperText id="country">
              Please enter your location Country
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel htmlFor="zipcode">Zipcode</InputLabel>
            <Input
              onChange={(e) => {
                setZipcode(e.target.value);
              }}
              sx={{ px: 2 }}
              id="zipcode"
              type="text"
              name="zipcode"
              value={zipcode}
              aria-describedby="zipcode"
              required
            />
            <FormHelperText id="zipcode">
              Please enter your location Zip code
            </FormHelperText>
          </FormControl>
        </Paper>
      ),
    },
    {
      label: "Team Information",
      render: (
        <Paper sx={{ margin: "5 5 auto" }}>
          <FormControl sx={{ mt: 2 }} fullWidth required>
            <InputLabel htmlFor="name">Team</InputLabel>
            <Input
              error={team === "" && touchedFields.team}
              onChange={(e) => {
                setTeam(e.target.value);
              }}
              sx={{ px: 2 }}
              id="team"
              name="team"
              value={team}
              aria-describedby="team"
              onBlur={(e) => {
                setTouchedFields({
                  ...touchedFields,
                  team: true,
                });
              }}
              required
            />
            <FormHelperText id="team-helper-text">
              Please enter your team name
            </FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            sx={{ mt: 2 }}
            sx={{ m: 3 }}
            component="fieldset"
            variant="standard"
          >
            <FormLabel component="sports">Sports</FormLabel>
            <FormGroup>
              <List
                dense
                sx={{
                  ml: "30",
                  width: "50%",
                  maxHeight: 300,
                  bgcolor: "background.paper",
                  overflow: "auto",
                }}
              >
                {sports.map((sport) => (
                  <ListItem
                    key={sport}
                    secondaryAction={
                      <Checkbox
                        onChange={() => {
                          const sportIndex = checked.indexOf(sport);
                          const newChecked = [...checked];
                          if (sportIndex !== -1)
                            newChecked.splice(sportIndex, 1);
                          else newChecked.push(sport);
                          setChecked(newChecked);
                        }}
                        checked={checked.indexOf(sport) !== -1}
                        inputProps={{ "aria-labelledby": sport }}
                      />
                    }
                  >
                    <ListItemText id={sport} primary={sport} />
                  </ListItem>
                ))}
              </List>
            </FormGroup>
            <FormHelperText>Select sports</FormHelperText>
          </FormControl>
        </Paper>
      ),
    },
    {
      label: "More about you",
      render: (
        <Box sx={{ mx: 5 }}>
          <FormControl sx={{ mt: 2 }} fullWidth required>
            <InputLabel htmlFor="name">About</InputLabel>
            <Input
              error={about === "" && touchedFields.about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              sx={{ px: 2 }}
              id="about"
              name="about"
              value={about}
              aria-describedby="about"
              onBlur={(e) => {
                setTouchedFields({
                  ...touchedFields,
                  about: true,
                });
              }}
              required
            />
            <FormHelperText id="name-helper-text">
              Please enter little more about you
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ mt: 2 }} fullWidth required>
            <InputLabel htmlFor="interests">Interests</InputLabel>
            <Input
              error={interests === "" && touchedFields.interests}
              onChange={(e) => {
                setInterests(e.target.value);
              }}
              sx={{ px: 2 }}
              id="interests"
              name="interests"
              value={interests}
              aria-describedby="Interests"
              onBlur={(e) => {
                setTouchedFields({
                  ...touchedFields,
                  interests: true,
                });
              }}
              required
            />
            <FormHelperText id=" interests-helper-text ">
              Tell us about your hobbies
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ mt: 2 }} required>
            <InputLabel htmlFor="profile"></InputLabel>
            <Input
              error={profileImage === "" && touchedFields.profileImage}
              sx={{ px: 2 }}
              onChange={(event) => {
                const file = event?.target?.files[0];
                //const objectUrl = URL.createObjectURL(file);
                setProfileImage(file);
              }}
              accept="image/*"
              type="file"
              name="profileImage"
              id="profileImage"
              aria-describedby="team"
              onBlur={(e) => {
                setTouchedFields({
                  ...touchedFields,
                  profileImage: true,
                });
              }}
              required
            />
            <FormHelperText id="profileImage-helper-text">
              Choose your profile image
            </FormHelperText>
            {profileImage ? (
              <Avatar
                alt="profileImage"
                src={profileImage ? URL.createObjectURL(profileImage) : ""}
                sx={{ width: 70, height: 70 }}
              />
            ) : (
              <Skeleton variant="circular" width={70} height={70} />
            )}
          </FormControl>
        </Box>
      ),
    },
  ];

  const handleNext = (e) => {
    if (activeStep == steps.length - 1) {
      handleSubmit();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    //submit the form to post api

    const formData = new FormData();
    if (profileImage) {
      console.log(profileImage);
      formData.append("profileImage", profileImage);
    }
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("zipcode", zipcode);
    console.log(checked);
    checked.forEach((item) => {
      formData.append("sports[]", item);
    });
    formData.append("team", team);
    formData.append("about", about);
    formData.append("interests", interests);

    console.log(formData);
    //make post api call

    try {
      const response = await ky
        .post(`http://localhost:4000/api/athletes`, {
          body: formData,
        })
        .json();

      console.log(response);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
    setActiveStep(0);
    setOpen(false);
  };

  return (
    open && (
      <Box sx={{ width: "100%", mt: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={step.label} {...stepProps}>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>{steps[activeStep].render}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
    )
  );
};

export default CreateNewUser;
