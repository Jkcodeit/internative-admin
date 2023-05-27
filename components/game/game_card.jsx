import { ArrowForward } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

export default function GameCard({
  gameID,
  gameName,
  openTime,
  closingTime,
  resultCode,
  openStaus,
  isButtonRequired,
  isDeleteButtonRequired,
}) {
  const router = useRouter();

  const [disableButtonText, setDisableButtonText] = useState("Disable Game");

  const [isDisabling, setIsDisabling] = useState(false);

  const [deleteButtonText, setDeleteButtonText] = useState("Delete Game");

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteGame = async () => {
    if (!isDeleting) {
      var jwt = localStorage.getItem("jwt-token");
      setDeleteButtonText("Deleting...");
      setIsDeleting(true);

      var response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}game/delete/${gameID}`,
        {
          method: "PUT",
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
        router.reload();
      } else {
        alert(responseData["message"]);
      }

      setDeleteButtonText("Delete Game");
      setIsDeleting(false);
    }
  };

  const disableGame = async () => {
    if (!isDisabling) {
      var jwt = localStorage.getItem("jwt-token");
      setDisableButtonText("Disabling...");
      setIsDisabling(true);

      var response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}game/cancel/${gameID}`,
        {
          method: "PUT",
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
        router.reload();
      } else {
        alert(responseData["message"]);
      }

      setDisableButtonText("Disable Game");
      setIsDisabling(false);
    }
  };

  return (
    <div>
      <Box
        sx={{
          //   height: "12rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "1rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
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
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "red",
                marginBottom: "0.1rem",
              }}
            >
              {gameName}
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "0.1rem",
              }}
            >
              {resultCode}
            </Typography>
          </Box>

          {/* BID TIME CONTAINER  */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "#74B18B",
                marginBottom: "0.3rem",
              }}
            >
              Open {openTime}
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "#CB4741",
              }}
            >
              Close {closingTime}
            </Typography>
          </Box>

          {/*GO INSIDE CONTAINER  */}
          <div
            onClick={() => {
              router.push({
                pathname: "/game/[gameId]",
                query: { gameId: gameID },
              });
            }}
          >
            <Box
              sx={{
                height: "4rem",
                width: "4rem",
                borderRadius: "4rem",
                backgroundColor: "#B2F4CE",
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <ArrowForward />
              </IconButton>
            </Box>
          </div>
        </Box>

        <br />
        {/* BELOW TEXT  */}
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#74B18B",
          }}
        >
          Bidding is running {openStaus}
        </Typography>

        <br />
        {/* DATE TEXT ONLY FOR FEW MODULES  */}
        {isButtonRequired === true ? (
          <Box>
            <Button
              variant="outlined"
              sx={{
                marginRight: "2rem",
              }}
            >
              Anounce Results
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => {
                e.preventDefault();
                disableGame();
              }}
            >
              {disableButtonText}
            </Button>
          </Box>
        ) : (
          <></>
        )}

        {isDeleteButtonRequired === true ? (
          <Box>
            <Button
              variant="outlined"
              sx={{
                marginRight: "2rem",
              }}
            >
              Edit Game
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => {
                e.preventDefault();
                deleteGame();
              }}
            >
              {deleteButtonText}
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
}
