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
  DialogContent,
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

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmParams, setConfirmParams] = useState({});

  const WithdrawRequest = async (page) => {
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
        `${process.env.NEXT_PUBLIC_BASE_URL_API}wallet/getWithdrawRequest`,
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
        const gamesData = responseData.data.map((game) => ({
          amount: game.amount,
          requestId: game.id,
          phoneNumber: game.userId.phoneNumber || "",
          winning: game.walletId.gameWinning || 0,
          wallet: game.walletId.amountInWallet || 0,
        }));
        setGames(gamesData);
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
      WithdrawRequest(1);
    }
  }, []);
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
  const handleSubmit = () => {
    setDataLoaded(true);
    try {
      const jwt = localStorage.getItem("jwt-token");
      if (!jwt) {
        // handle the case where the user is not logged in
        setDataLoaded(false);
        router.replace("/login");
        return;
      }
      let data = {
        ...confirmParams,
        description: description,
      };
      console.log(data);
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}wallet/updateWithdrawRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": jwt,
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => {
          if (response.ok) {
            WithdrawRequest(1);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      // handle network or parsing errors
      console.error(error);
    } finally {
      setDataLoaded(false);
    }
  };
  const handleConfirmSubmit = (withdrawrequestId, status) => {
    handleOpen();
    if (status == 1) {
      setDescription("none");
      setValue("Are you sure you want to approve application ?");
    } else {
      setDescription("");
      setValue("Are you sure you want to reject application ?");
    }
    setConfirmParams({ withdrawrequestId, status });
  };

  const handleDialogAction = (action) => {
    setIsConfirm(false);
    console.log(action);
    if (action === "yes") {
      handleSubmit(confirmParams);
    }
  };
  const handleClose = () => {
    setIsConfirm(false);
  };

  const handleOpen = () => {
    setIsConfirm(true);
  };
  return (
    <Container sx={{ height: "100vh", marginY: "4rem" }}>
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
                  <TableCell align="center">User Phone</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Balance</TableCell>
                  <TableCell align="center">Winning</TableCell>
                  <TableCell align="center">Approve</TableCell>
                  <TableCell align="center">Reject</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: "auto" }}>
                {games.length > 0 ? (
                  games.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <h3>{row.phoneNumber}</h3>
                      </TableCell>
                      <TableCell align="center">
                        <h3>{row.amount}</h3>{" "}
                      </TableCell>
                      <TableCell align="center">
                        <h3>{row.winning}</h3>
                      </TableCell>
                      <TableCell align="center">
                        <h3>{row.wallet}</h3>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={(e) => handleConfirmSubmit(row.requestId, 1)}
                          sx={{
                            "&:hover": {
                              borderColor: "#FFFFFF",
                              backgroundColor: "#19857b",
                              color: "#FFFFFF",
                            },
                          }}
                        >
                          Approve
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={(e) => handleConfirmSubmit(row.requestId, 2)}
                          sx={{
                            "&:hover": {
                              borderColor: "#FFFFFF",
                              backgroundColor: "#ff1744",
                              color: "#FFFFFF",
                            },
                          }}
                        >
                          Reject
                        </Button>
                      </TableCell>
                      {/*} <TableCell align="center">
                      <Button
                        color="error"
                        disabled={
                          row.isRowSet ||
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
                    </TableCell> */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={6} align="center">
                      <h3>No Withdrawal Request Found</h3>
                    </TableCell>
                  </TableRow>
                )}
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
        <DialogTitle>{value}</DialogTitle>
        {description != "none" ? (
          <DialogContent>
            <TextField
              autoFocus
              label="Reject Reason"
              placeholder="Reason"
              multiline
              sx={{
                width: "100%",
                marginY: "2rem",
              }}
              rows={4}
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
        ) : (
          ""
        )}
        <DialogActions>
          <Button onClick={() => handleDialogAction("yes")}>Yes</Button>
          <Button onClick={() => handleDialogAction("no")}>No</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
