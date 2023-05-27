//THIS IS THE DYNAMIC ROUTE [gameId] IS THE GAME ID WHICH PASSED IN THE NAVIGATION

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "../../components/game/button";
import CancelledChip from "../../components/game/cancelled_chip";
import CompletedChip from "../../components/game/completed_chip";

export default function ViewAGame() {
  const router = useRouter();

  const [game, setGame] = useState({});

  const [isDataLoaded, setDataLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const getGame = async () => {
    const gameId = router.query.gameId;
    var jwt = localStorage.getItem("jwt-token");
    if (!isLoading) {
      console.log("In");
      setIsLoading(true);
      var response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}game/${gameId}`,
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
        setGame(responseData["game"]);
        setDataLoaded(true);
      } else {
        setError(true);
        setErrorMessage(responseData["message"]);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isDataLoaded) {
      getGame();
    }
  }, [isDataLoaded]);

  return (
    <div>
      <Container>
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
        ) : isError ? (
          <center>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1.4rem",
                fontWeight: "600",
              }}
            >
              {errorMessage}
            </Typography>
          </center>
        ) : (
          <div>
            <br />

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  sx={{
                    fontSize: "2.0rem",
                    fontWeight: "500",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  {game["name"]}
                </Typography>
              </Grid>

              {game["isCancelled"] ? (
                <CancelledChip />
              ) : game["isResultAnnounced"] ? (
                <CompletedChip />
              ) : (
                <></>
              )}
            </Grid>
            <br />
            <br />
            {/* ALL DATES AND TIMINGS */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  sx={{
                    fontSize: "1.15rem",
                    fontWeight: "500",
                  }}
                >
                  Result :{" "}
                  {game["results"] === undefined
                    ? "***_**_***"
                    : game["results"].length === 0
                    ? "***_**_***"
                    : game["results"][0][""]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  sx={{
                    fontSize: "1.15rem",
                    fontWeight: "500",
                    color: "#74B18B",
                  }}
                >
                  Open : {moment(game["openBiddingTime"]).format("LT")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  sx={{
                    fontSize: "1.15rem",
                    fontWeight: "500",
                    color: "#CB4741",
                  }}
                >
                  Close : {moment(game["closingBiddingTime"]).format("LT")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography
                  sx={{
                    fontSize: "1.15rem",
                    fontWeight: "500",
                    color: "#74B18B",
                  }}
                >
                  Open Date : {moment(game["openBiddingTime"]).format("ll")}
                </Typography>
              </Grid>
              <br />
              <br />
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
}
