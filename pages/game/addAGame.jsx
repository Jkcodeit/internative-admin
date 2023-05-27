import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers";

export default function AddGame() {
  const [openTime, setOpenTime] = useState(dayjs());

  const [closingTime, setClosingTime] = useState(dayjs());

  const [gameName, setGameName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const [errorText, setErrorText] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const [day, setDay] = React.useState("");

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  // SUBMITTING THE FORM
  const submitForm = async () => {
    var jwt = localStorage.getItem("jwt-token");
    if (!isLoading) {
      setIsError(false);
      setIsLoading(true);
      setIsSuccess(false);

      if (gameName.length === 0) {
        setIsError(true);
        setIsLoading(false);
        setErrorText("Enter Game Name");
      } else {
        setIsLoading(true);

        var parsedOpeningTime = Date.parse(new Date(openTime));
        var parsedClosingTime = Date.parse(new Date(closingTime));

        var response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}game`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": jwt,
            },
            body: JSON.stringify({
              name: gameName,
              openBidTime: parsedOpeningTime,
              closeBidTime: parsedClosingTime,
              openDate: day,
            }),
          }
        );
        var data = await response.json();
        if (response.status === 200) {
          setIsSuccess(true);
          setIsError(false);
        } else {
          setIsError(true);

          setErrorText(data["message"]);
        }

        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <Grid
        container
        sx={{
          height: "100vh",
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Box mx={5} my={10}>
            <Typography
              sx={{
                fontSize: "2.0rem",
                fontWeight: "500",
                textDecoration: "underline",
              }}
            >
              Add a game.
            </Typography>

            <br />
            <br />
            <br />
            {/* GAME NAME PICKER  */}
            <TextField
              fullWidth
              label="Game Name"
              id="gameName"
              type="text"
              onChange={(val) => {
                setGameName(val.target.value);
              }}
            />

            <br />
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                label="Select Day"
                onChange={handleChange}
              >
                <MenuItem value={0}>Sunday</MenuItem>
                <MenuItem value={1}>Monday</MenuItem>
                <MenuItem value={2}>Tuesday</MenuItem>
                <MenuItem value={3}>Wednesday</MenuItem>
                <MenuItem value={4}>Thursday</MenuItem>
                <MenuItem value={5}>Friday</MenuItem>
                <MenuItem value={6}>Saturday</MenuItem>
              </Select>
            </FormControl>

            <br />
            <br />
            <br />
            {/* OPENING DATE TIME PICKER  */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                label="Bid Open Time"
                value={openTime}
                minDateTime={dayjs()}
                onChange={(newValue) => {
                  setOpenTime(newValue);
                }}
              />
            </LocalizationProvider>

            <br />
            <br />
            <br />
            {/* CLOSING DATE TIME PICKER  */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                label="Bid Close Time"
                value={closingTime}
                minDateTime={dayjs()}
                onChange={(newValue) => {
                  setClosingTime(newValue);
                }}
              />
            </LocalizationProvider>

            <br />
            <br />
            <br />

            {/* SUBMIT BUTTON  */}

            <Button
              variant="contained"
              fullWidth={true}
              size="large"
              onClick={(e) => {
                // e.preventDefault();
                if (!isLoading) {
                  console.log("Clicked");
                  submitForm();
                }
              }}
            >
              {!isLoading ? "Submit" : <CircularProgress color="info" />}
            </Button>

            <br />
            <br />
            <br />

            {/* ERROR ALERT  */}
            {isError ? <Alert severity="error">{errorText}</Alert> : <></>}

            {/* SUCCESS ALERT  */}
            {isSuccess ? (
              <Alert severity="success">Game Added Successfully!</Alert>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          sx={{
            backgroundImage: "url(/assets/add_game.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
      </Grid>
    </div>
  );
}
