import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HorizontalRuleSharpIcon from "@mui/icons-material/HorizontalRuleSharp";
import Paper from "@mui/material/Paper";

import {
  Container,
  Divider,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useEffect } from "react";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

import { useRouter } from "next/router";

import { useRef } from "react";
import OtpInput from "../../components/game/OtpInput";
import CloseInput from "../../components/game/CloseInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useState } from "react";
export default function BasicTable() {
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [games, setGames] = useState([]);
  const [source, setSource] = useState([]);
  const [time, setTime] = useState({});
  const [value, setValue] = useState(moment());
  const [isConfirm, setIsConfirm] = useState(false);
  const [isRollback, setIsRollback] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [confirmParams, setConfirmParams] = useState({});
  const [resultId, setResultId] = useState();

  const getAllGames = async (page) => {
    const jwt = localStorage.getItem("jwt-token");
    setDataLoaded(true);
    console.log(jwt);
    if (!jwt) {
      // handle the case where the user is not logged in
      setDataLoaded(false);
      router.replace("/login");
      return;
    }
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL_API
        }game/results/getGames?date=${value.format("YYYY-MM-DD")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": jwt,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        const gamesData = responseData.result.map((game) => ({
          name: game.name,
          gameId: game.id,
          resultString: game.results[0].resultString,
          closingBid: game.closingBiddingTime,
          isRowSet:
            game.results[0].isCancelled == true
              ? true
              : moment(game.closingBiddingTime) > moment(),

          isPrevious:
            value.format("YYYY-MM-DD") != moment().format("YYYY-MM-DD")
              ? game.results[0].isCancelled == true
                ? false
                : true
              : false,
          isOpenSet: !game.results[0].resultString
            .substring(0, 5)
            .includes("*"),
          isCloseSet: !game.results[0].resultString
            .substring(5, 10)
            .includes("*"),
          resultId: game.results[0].id,
          openbidding: game.openBiddingTimeGmt530,
          closingbidding: game.closingBiddingTimeGmt530,
        }));
        console.log(gamesData);
        setTime({ start: responseData.start, end: responseData.end });
        setSource(gamesData);
        setGames(gamesData);
        setDataLoaded(true);
        // setChange(true);
      } else {
        // handle the case where the server returns an error
        console.error(responseData);
      }
    } catch (error) {
      // handle network or parsing errors
      console.error(error);
    } finally {
      setDataLoaded(false);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      getAllGames(1);
    }
  }, []);
  useEffect(() => {
    getAllGames(1);
  }, [value]);
  const handleInputChange = (isOpen, string, id) => {
    if (
      string[0] != "" &&
      string[1] != "" &&
      string[2] != "" &&
      string[3] != ""
    ) {
      const updatedData = games.map((row) => {
        if (row.resultId === id) {
          if (isOpen) {
            return {
              ...row,
              resultString: `${string[0]}${string[1]}${string[2]}-${
                string[3]
              }${row.resultString.substring(5, 10)}`, // get the value of the custom text field component for this row
            };
          } else {
            return {
              ...row,
              resultString: `${row.resultString.substring(0, 5)}${string[0]}-${
                string[1]
              }${string[2]}${string[3]}`, // get the value of the custom text field component for this row
            };
          }
        } else {
          return row;
        }
      });
      setGames(updatedData);
    }
  };
  const handleSubmit = ({ isOpen, gameId, resultId, index }) => {
    const jwt = localStorage.getItem("jwt-token");
    if (!jwt) {
      // handle the case where the user is not logged in
      setDataLoaded(false);
      router.replace("/login");
      return;
    }
    let data = {
      ...time,
      gameId: gameId,
      resultId: resultId,
      resultString: isOpen
        ? `${games[index].resultString.substring(0, 5)}${source[
            index
          ].resultString.substring(5, 10)}`
        : `${source[index].resultString.substring(0, 5)}${games[
            index
          ].resultString.substring(5, 10)}`,
    };
    console.log(data);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}game/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwt,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          getAllGames(1);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleConfirmSubmit = (isOpen, gameId, resultId, index) => {
    handleOpen();
    setConfirmParams({ isOpen, gameId, resultId, index });
  };

  const handleConfirmRollCancel = (isOpen, resultId) => {
    if (isOpen) {
      handleRollbackOpen();
      setResultId(resultId);
    } else {
      handleCancelOpen();
      setResultId(resultId);
    }
  };
  const handleDialogAction = (action) => {
    setIsConfirm(false);
    if (action === "yes") {
      handleSubmit(confirmParams);
    }
  };
  const handleDialogRollback = (action) => {
    setIsRollback(false);
    if (action === "yes") {
      handleRollback(resultId);
    }
  };
  const handleDialogCancel = (action) => {
    setIsCancel(false);
    if (action === "yes") {
      handleCancel(resultId);
    }
  };
  const handleClose = () => {
    setIsConfirm(false);
  };
  const handleRollbackClose = () => {
    setIsRollback(false);
  };
  const handleCancelClose = () => {
    setIsCancel(false);
  };

  const handleOpen = () => {
    setIsConfirm(true);
  };
  const handleRollbackOpen = () => {
    setIsRollback(true);
  };
  const handleCancelOpen = () => {
    setIsCancel(true);
  };
  const handleRollback = (resultId) => {
    const jwt = localStorage.getItem("jwt-token");
    if (!jwt) {
      // handle the case where the user is not logged in
      setDataLoaded(false);
      router.replace("/login");
      return;
    }
    let data = {
      resultId: resultId,
    };
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}game/rollback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwt,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          getAllGames(1);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleCancel = (resultId) => {
    const jwt = localStorage.getItem("jwt-token");
    if (!jwt) {
      // handle the case where the user is not logged in
      setDataLoaded(false);
      router.replace("/login");
      return;
    }
    let data = {
      id: resultId,
      date: value.format("YYYY-MM-DD"),
    };
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}game/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwt,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          getAllGames(1);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <Container>
      <TableContainer
        component={Paper}
        sx={{ marginY: "3rem", width: "max-content" }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={value}
            inputFormat="DD/MM/YYYY"
            onChange={(newValue) => setValue(newValue)}
            renderInput={(params) => <TextField {...params} />}
            disableFuture
          />
        </LocalizationProvider>
      </TableContainer>
      {dataLoaded ? (
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
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ minWidth: 650, maxHeight: "27rem" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Market Name</TableCell>
                  <TableCell align="center">Open</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Close</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Rollback</TableCell>
                  <TableCell align="center">Cancel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: "auto" }}>
                {games.map((row, index) => (
                  <TableRow
                    isRow
                    disabled={row.isRowSet}
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <h3>{row.name}</h3>
                      <h5>{`( ${row.openbidding} - ${row.closingbidding} )`}</h5>
                    </TableCell>
                    <TableCell align="center">
                      <OtpInput
                        value={value}
                        id={row.resultId}
                        resultString={row.resultString.substring(0, 5)}
                        sourceString={source[index].resultString.substring(
                          0,
                          5
                        )}
                        handleInputChange={handleInputChange}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        disabled={row.isRowSet || row.isOpenSet}
                        onClick={(e) =>
                          handleConfirmSubmit(
                            true,
                            row.gameId,
                            row.resultId,
                            index
                          )
                        }
                        sx={{
                          "&:hover": {
                            borderColor: "#FFFFFF",
                            backgroundColor: "#2196f3",
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </TableCell>
                    <CloseInput
                      value={value}
                      id={row.resultId}
                      resultString={row.resultString.substring(5, 10)}
                      sourceString={source[index].resultString.substring(5, 10)}
                      handleInputChange={handleInputChange}
                    />
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        disabled={row.isRowSet || row.isCloseSet}
                        onClick={(e) =>
                          handleConfirmSubmit(
                            false,
                            row.gameId,
                            row.resultId,
                            index
                          )
                        }
                        sx={{
                          "&:hover": {
                            borderColor: "#FFFFFF",
                            backgroundColor: "#2196f3",
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="secondary"
                        variant="outlined"
                        disabled={row.isRowSet || !/\d/.test(row.resultString)}
                        onClick={(e) =>
                          handleConfirmRollCancel(true, row.resultId)
                        }
                        sx={{
                          "&:hover": {
                            borderColor: "#FFFFFF",
                            backgroundColor: "#19857b",
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        Rollback
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="error"
                        disabled={
                          (row.isPrevious == true ? false : row.isRowSet) ||
                          (!row.isOpenSet && !row.isCloseSet ? false : true)
                        }
                        onClick={(e) =>
                          handleConfirmRollCancel(false, row.resultId)
                        }
                        variant="outlined"
                        sx={{
                          "&:hover": {
                            borderColor: "#FFFFFF",
                            backgroundColor: "#ff1744",
                            color: "#FFFFFF",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <Dialog
        open={isConfirm}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to submit?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDialogAction("yes")}>Yes</Button>
          <Button onClick={() => handleDialogAction("no")}>No</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isRollback}
        keepMounted
        onClose={handleRollbackClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to rollback?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDialogRollback("yes")}>Yes</Button>
          <Button onClick={() => handleDialogRollback("no")}>No</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isCancel}
        keepMounted
        onClose={handleCancelClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to cancel the game?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDialogCancel("yes")}>Yes</Button>
          <Button onClick={() => handleDialogCancel("no")}>No</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
