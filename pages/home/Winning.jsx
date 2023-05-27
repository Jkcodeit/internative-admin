import { HighlightOff, Logout } from "@mui/icons-material";
import React from "react";
import {
  Typography,
  Box,
  Container,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  CircularProgress,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Winning() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    Single: 0,
    minDeposit: 0,
    minWithdrawal: 0,
    Jodi: 0,
    RedBracket: 0,
    SinglePana: 0,
    DoublePana: 0,
    TriplePana: 0,
    HalfSangam: 0,
    FullSangam: 0,
  });
  var [isLoading, setIsLoading] = useState(false);

  const [buttonLabel, setLabels] = useState([
    "Minimum Deposit",
    "Minimum Withdrawal",
    "Single Winning",
    "Jodi Winning",
    "Single Panna Winning",
    "Double Panna Winning",
    "Triple Panna Winning",
    "Half Sangam Winning",
    "Full Sangam Winning",
  ]);
  const [nameLabel, setNames] = useState([
    "Single",
    "minDeposit",
    "minWithdrawal",
    "Jodi",
    "SinglePana",
    "DoublePana",
    "TriplePana",
    "HalfSangam",
    "FullSangam",
  ]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDialogAction = (action) => {
    handleClose();
    if (action === "yes") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    const jwt = localStorage.getItem("jwt-token");
    if (!jwt) {
      // handle the case where the user is not logged in
      setDataLoaded(false);
      router.replace("/login");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}config/config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwt,
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
        }
      })
      .catch((error) => console.error(error));
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);
  const fetchData = async () => {
    setIsLoading(true);
    console.log("here");
    var response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}config/config`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    var data = await response.json();
    if (response.status === 200) {
      console.log(data.config);
      console.log(response.config);
      setFormValues(data.config);
    } else {
      setIsError(true);

      setErrorText(data["message"]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // call the function
    console.log("useeffect");
    fetchData().catch(console.error);
  }, []); // add fetchData to dependency array
  const getAllGames = async (page, weekDay) => {
    var jwt = localStorage.getItem("jwt-token");
    if (!isLoading) {
      setIsLoading(true);

      var response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}game/master/sheet?page=${page}&limit=10&day=${weekDay}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": jwt,
          },
        }
      );

      // Parse the response
      var responseData = await response.json();

      // Verifying the response
      if (response.status === 200) {
        if (responseData["result"].length > 0) {
          console.log("here");
          console.log(responseData["result"]);
        }
        setGames(responseData["games"]);
        setDataLoaded(true);
      }

      setIsLoading(false);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name " + name + "  value" + value);
    console.log(name + " " + value);
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <Container
        sx={{
          marginTop: "2rem",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
          Game Config
        </Typography>
        <Box my={8}></Box>

        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          ALL WINNING CALCULATIONS ARE BASED ON 10 ₹ INVESTMENT
        </Typography>

        <Box my={8}></Box>
        {isLoading ? (
          <center>
            <Box
              sx={{
                padding: "2rem",
                borderRadius: "15rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#FFFF",
                maxWidth: "10rem",
              }}
            >
              <CircularProgress />
            </Box>
          </center>
        ) : (
          <>
            {[...Array(9)].map((_, index) => (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/* FIRST SET OF ELEMENT TO KEEP TOGETHER */}

                    {/* LABEL TEXT */}
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      {buttonLabel[index]}
                    </Typography>
                  </Box>
                  <FormControl fullWidth sx={{ m: 1, width: "25ch" }}>
                    <InputLabel htmlFor={`outlined-adornment-amount-${index}`}>
                      Amount
                    </InputLabel>
                    <OutlinedInput
                      id={`outlined-adornment-amount-${index}`}
                      value={formValues[nameLabel[index]]}
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                      name={nameLabel[index]}
                      placeholder="Enter amount"
                      type="number"
                      onChange={handleInputChange}
                      label="Amount"
                    />
                  </FormControl>
                </Box>
                <Box my={2.5}></Box>

                <Divider />
                <Box my={2.5}></Box>
              </React.Fragment>
            ))}
          </>
        )}

        <Box my={3}></Box>

        {/* AT THE LAST VERSOION NUMBER OF THE APP  */}
        <Box
          my={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={(e) => handleClickOpen()}
            px={6}
            py={3}
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
              textAlign: "center",
              "&:hover": {
                borderColor: "#FFFFFF",
                backgroundColor: "#2196f3",
                color: "#FFFFFF",
              },
            }}
          >
            Update Config
          </Button>
        </Box>

        {/* AT THE LAST VERSOION NUMBER OF THE APP  */}
        <Typography
          px={6}
          py={3}
          sx={{ fontSize: "1rem", fontWeight: "600", textAlign: "center" }}
        >
          v 0.1.0
        </Typography>
      </Container>

      {/* ALERT DIALOG WHILE TRUNCATING THE DATABSE  */}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update Config"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to update config ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogAction("yes")}>Yes</Button>
          <Button onClick={() => handleDialogAction("no")}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
