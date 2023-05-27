import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import GameCard from "../../components/game/game_card";
import React, { useEffect, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import moment from "moment";
import { useRouter } from "next/router";

export default function ActiveGames() {
  const router = useRouter();

  var [isLoading, setIsLoading] = useState(false);
  var [games, setGames] = useState([]);
  var [dataLoaded, setDataLoaded] = useState(false);
  var [page, setPage] = useState(1);
  var [isReachedEnd, setIsReachedEnd] = useState(false);

  var currentDate = new Date();

  const getAllGames = async (page) => {
    var jwt = localStorage.getItem("jwt-token");
    if (!isLoading) {
      setIsLoading(true);

      var response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}game/current?page=${page}&limit=10`,
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
        if (responseData["games"].length < 10) {
          setIsReachedEnd(true);
        }
        setGames(responseData["games"]);
        setDataLoaded(true);
      }

      setIsLoading(false);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();

    if (!isReachedEnd) {
      setPage(page + 1);
      getAllGames(page + 1);
    }
  };

  const previousPage = (e) => {
    e.preventDefault();

    if (page > 1) {
      setIsReachedEnd(false);
      setPage(page - 1);
      getAllGames(page - 1);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      getAllGames(1);
    }
  }, [dataLoaded]);

  return (
    <div>
      <Box
        p={6}
        sx={{
          backgroundColor: "#F0F7FD",
          minHeight: "100vh",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.0rem",
            fontWeight: "500",
            ":hover": { textDecoration: "underline" },
          }}
        >
          Active Games
        </Typography>

        <br />
        <br />

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
        ) : games.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1.4rem",
              fontWeight: "600",
            }}
          >
            No games to show
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {games.map((game) => (
              <Grid item xs={12} sm={6} md={4} key={game["id"]}>
                <div>
                  <GameCard
                    key={game["id"]}
                    gameID={game["id"]}
                    gameName={game["name"]}
                    resultCode={
                      game["results"] === undefined
                        ? "***_**_***"
                        : game["results"].length === 0
                        ? "***_**_***"
                        : game["results"][0][""]
                    }
                    openTime={moment(game["openBiddingTime"]).format("LT")}
                    closingTime={moment(game["closingBiddingTime"]).format(
                      "LT"
                    )}
                    openStaus={moment(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        currentDate.getDate(),
                        new Date(game["openBiddingTime"]).getHours(),
                        new Date(game["openBiddingTime"]).getMinutes(),
                        new Date(game["openBiddingTime"]).getSeconds()
                      )
                    ).fromNow()}
                    isButtonRequired={false}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        )}

        <br />
        <br />

        <Box
          sx={{
            width: "15rem",
            borderRadius: "10px",
            background: " #F2F2F2",
            boxShadow: "inset 1px 1px 8px 1px rgba(0, 0, 0, 0.07)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.2rem",
            cursor: "pointer",
          }}
        >
          {/* PREVIOUS BUTTON */}
          <div
            onClick={(e) => {
              previousPage(e);
            }}
          >
            <Box
              sx={{
                width: "5rem",
                heigth: "15rem",
                borderRadius: "10px",
                background: " #FFFF",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowBackIos />
            </Box>
          </div>
          {/* CURRENT PAGE  */}
          <Box>
            <Typography>{page}</Typography>
          </Box>
          {/* NEXT PAGE  */}
          <div
            onClick={(e) => {
              nextPage(e);
            }}
          >
            <Box
              sx={{
                width: "5rem",
                heigth: "15rem",
                borderRadius: "10px",
                background: " #FFFF",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowForwardIos />
            </Box>
          </div>
        </Box>
      </Box>
    </div>
  );
}
