import { Add } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ButtonCards from "../../components/dashboard/button_cards";
import Card from "../../components/dashboard/card";
import ViewCard from "../../components/dashboard/view_card";

export default function Games() {
  const router = useRouter();
  return (
    <div>
      <Container
        sx={{
          marginTop: "2rem",
        }}
      >
        <Typography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
          Games
        </Typography>

        <br />
        <br />

        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={3}>
            <Card image="game.png" title="Total Games" count="250" />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Card image="game.png" title="Total Active Games" count="250" />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Card image="game.png" title="Total Completed Games" count="250" />
          </Grid>
        </Grid>

        <br />
        <br />

        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={3}>
            <div
              onClick={() => {
                router.push("/game/addAGame");
              }}
            >
              <ButtonCards icon="add" title="Add Game" />
            </div>
          </Grid>

          <Grid item xs={6} sm={4} md={3}></Grid>
        </Grid>

        <br />
        <br />

        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={3}>
            <div
              onClick={() => {
                router.push("/game/activeGames");
              }}
            >
              <ViewCard title="View Active Games" />
            </div>
          </Grid>

          {/* <Grid item xs={6} sm={4} md={3}>
            <div
              onClick={() => {
                router.push("/game/completedGames");
              }}
            >
              <ViewCard title="View Completed Games" />
            </div>
          </Grid> */}

          {/* <Grid item xs={6} sm={4} md={3}>
            <div
              onClick={() => {
                router.push("/game/upcomingGames");
              }}
            >
              <ViewCard title="View Upcoming Games" />
            </div>
          </Grid> */}

          <Grid item xs={6} sm={4} md={3}>
            <div
              onClick={() => {
                router.push("/game/cancelledGames");
              }}
            >
              <ViewCard title="View Disabled Games" />
            </div>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <div
              onClick={() => {
                router.push("/game/gameResults");
              }}
            >
              <ViewCard title="Game Results" />
            </div>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <div
              onClick={() => {
                router.push("/game/masterSheet");
              }}
            >
              <ViewCard title="Master Sheet" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
