import { HighlightOff, Logout } from "@mui/icons-material";
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
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

import { useRouter } from "next/router";
export default function SettingsPage() {
  const [open, setOpen] = useState(false);
  const [logout, setLogOut] = useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenLogout = () => {
    setLogOut(true);
  };

  const handleCloseLogout = (option) => {
    if (option === "yes") {
      localStorage.removeItem("jwt-token");
      setLogOut(true);
      router.replace("/login");
    }
    setLogOut(false);
  };

  return (
    <div>
      <Container
        sx={{
          marginTop: "2rem",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
          Settings
        </Typography>
        <Box my={8}></Box>
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
            {/* FIRST SET OF ELEMENT TO KEEP TOGATHER  */}
            <Box
              sx={{
                backgroundColor: "#111727",
                padding: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1rem",
              }}
            >
              {/* LOGOUT DECORATION ICON  */}
              <Logout
                sx={{
                  color: "#FFFF",
                }}
              />
            </Box>
            <Box mx={2}></Box>

            {/* LOGOUT TEXT  */}
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Logout
            </Typography>
          </Box>

          {/* ICON BUTTON TO LOGOUT THE USER  */}
          <IconButton aria-label="Logout" onClick={handleClickOpenLogout}>
            <Logout
              sx={{
                color: "#111727",
              }}
            />
          </IconButton>
        </Box>

        <Box my={2.5}></Box>

        <Divider />

        <Box my={2.5}></Box>

        {/* TRUNCATING THE DATABASE  */}

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
            {/* FIRST SET OF ELEMENT TO KEEP TOGATHER  */}
            <Box
              sx={{
                backgroundColor: "#111727",
                padding: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1rem",
              }}
            >
              {/* LOGOUT DECORATION ICON  */}
              <HighlightOff
                sx={{
                  color: "#FFFF",
                }}
              />
            </Box>

            <Box mx={2}></Box>

            {/* LOGOUT TEXT  */}
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Truncate Database
            </Typography>
          </Box>

          {/* ICON BUTTON TO TRUNCATE THE DATABASE  */}
          <IconButton aria-label="Logout" onClick={handleClickOpen}>
            <HighlightOff
              sx={{
                color: "red",
              }}
            />
          </IconButton>
        </Box>

        <Box my={2.5}></Box>

        <Divider />
        {/* 
        <Box my={2.5}></Box>
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
            {/* FIRST SET OF ELEMENT TO KEEP TOGATHER  */}
        {/* <Box
          sx={{
            backgroundColor: "#111727",
            padding: "0.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1rem",
          }}
        >
          <HighlightOff
            sx={{
              color: "#FFFF",
            }}
          />
        </Box>

        <Box mx={2}></Box>

        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Minumum Desposit
        </Typography> */}
        {/* </Box> */}

        {/* ICON BUTTON TO TRUNCATE THE DATABASE  */}
        {/* <IconButton aria-label="Logout" onClick={handleClickOpen}>
            <HighlightOff
              sx={{
                color: "red",
              }}
            />
          </IconButton> */}
        {/*  <FormControl fullWidth sx={{ m: 1, width: "25ch" }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </Box>

        <Box my={2.5}></Box>

        <Divider /> */}

        <Box my={2.5}></Box>

        <Box my={3}></Box>

        {/* AT THE LAST VERSOION NUMBER OF THE APP  */}
        <Typography
          px={6}
          py={3}
          sx={{ fontSize: "1rem", fontWeight: "600", textAlign: "center" }}
        >
          v 0.1.0
        </Typography>
      </Container>

      <Dialog
        open={logout}
        keepMounted
        onClose={handleCloseLogout}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you really want to Logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleCloseLogout("yes")}>Yes</Button>
          <Button onClick={() => handleCloseLogout("no")}>No</Button>
        </DialogActions>
      </Dialog>
      {/* ALERT DIALOG WHILE TRUNCATING THE DATABSE  */}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you really want to trucate the database?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {
              "Truncating the database is the dangerous task, once you trucate all the data of the app and users will get deleted and you can't get those back."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
