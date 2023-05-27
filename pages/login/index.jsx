import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);

  const [errorText, setErrorText] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const submitForm = async () => {
    const baseUrl = process.env.BASE_URL;

    if (!isLoading) {
      setIsError(false);
      setIsLoading(true);
      setIsSuccess(false);
      if (email.length < 3) {
        setIsError(true);
        setIsLoading(false);
        setErrorText("Enter proper mail id");
      } else if (password.length < 5) {
        setIsError(true);
        setIsLoading(false);
        setErrorText("Enter proper password");
      } else {
        setIsLoading(true);

        var response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}admin/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          }
        );
        var data = await response.json();
        if (response.status === 200) {
          console.log(data["authToken"]);
          console.log("here");
          // localStorage.setItem("jwt-token", JSON.stringify(data["authToken"]));
          localStorage.setItem("jwt-token", data["authToken"]);
          localStorage.setItem("extra-test", "Hello");
          router.push("/home");
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
      <Grid container>
        {/* FORM CONTAINER  */}
        <Grid
          item
          md={6}
          sm={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* TOP TEXT  */}
          <Typography
            px={6}
            py={3}
            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
          >
            Instant Gamez
          </Typography>

          {/* CENTER PORTION WHICH CONTAINS THE FORMS  */}
          <Box px={8} sx={{}}>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Welcome Back
            </Typography>

            <Box py={1.5}></Box>

            {/* EMAIL FIELD  */}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              type="email"
              onChange={(val) => {
                setEmail(val.target.value);
              }}
            />

            <Box py={1.5}></Box>

            {/* PASSWORD FIELD  */}
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              type="password"
              onChange={(val) => {
                setPassword(val.target.value);
              }}
            />

            <Box py={1.5}></Box>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Box py={1.5}></Box>

            <Button
              variant="contained"
              fullWidth={true}
              size="large"
              onClick={(e) => {
                // e.preventDefault();
                if (!isLoading) {
                  submitForm();
                }
              }}
            >
              {!isLoading ? "Submit" : <CircularProgress color="info" />}
            </Button>

            <Box py={1.5}></Box>

            {/* ERROR ALERT  */}
            {isError ? <Alert severity="error">{errorText}</Alert> : <></>}

            {/* SUCCESS ALERT  */}
            {isSuccess ? <Alert severity="success">Logged In</Alert> : <></>}
          </Box>

          {/* BOTTOM TEXT  */}
          <Typography
            px={6}
            py={3}
            sx={{ fontSize: "1rem", fontWeight: "600" }}
          >
            V 0.1.0
          </Typography>
        </Grid>

        {/* IMAGE CONTAINER  */}
        <Grid
          item
          md={6}
          sm={0}
          sx={{
            backgroundImage:
              'url("https://firebasestorage.googleapis.com/v0/b/instant-gamez.appspot.com/o/bg.jpg?alt=media&token=45153a47-f010-4368-9874-b9e689b11fb4")',
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "2px solid #111727",
          }}
        ></Grid>
      </Grid>
    </div>
  );
}
