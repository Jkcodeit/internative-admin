import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import GameCard from "../../components/game/game_card";
import React, { useEffect, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import moment from "moment";
import { useRouter } from "next/router";

export default function MasterSheet() {
  const router = useRouter();

  var [isLoading, setIsLoading] = useState(false);
  var [games, setGames] = useState([]);
  var [dataLoaded, setDataLoaded] = useState(false);
  var [page, setPage] = useState(1);
  var [isReachedEnd, setIsReachedEnd] = useState(false);
  var [day, setDay] = useState(0);

  var dates = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const handleChange = (event) => {
    setDay(event.target.value);
    getAllGames(page, event.target.value);
  };

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
      getAllGames(page + 1, day);
    }
  };

  const previousPage = (e) => {
    e.preventDefault();

    if (page > 1) {
      setIsReachedEnd(false);
      setPage(page - 1);
      getAllGames(page - 1, day);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      getAllGames(1, day);
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
          Game Master Sheet{" "}
        </Typography>

        <br />
        <br />

        <FormControl
          sx={{
            width: "30%",
          }}
        >
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
          <div>
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
                      openStaus={`every ${dates[day]}`}
                      isDeleteButtonRequired={true}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
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
