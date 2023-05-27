import { Container, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Bar, BarChart, Line, LineChart, Tooltip } from "recharts";
import Card from "../../components/dashboard/card";
import ViewCard from "../../components/dashboard/view_card";

import GameResults from "./GameResults";
export default function Dashboard() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 450, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 50, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 550, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 50, pv: 2400, amt: 2400 },
  ];
  return (
    <Container sx={{ marginY: "3rem" }}>
      <Grid container spacing={4}>
        <Grid item xs={6} sm={4} md={3}>
          {/* TOTAL USERS  */}
          <Card image="person_green.png" title="Total Users" count="250" />
        </Grid>

        {/* TODAY'S GAMES  */}
        <Grid item xs={6} sm={4} md={3}>
          <Card image="person_orange.png" title="Today's Games" count="20" />
        </Grid>

        {/* TOTAL GAMES  */}
        <Grid item xs={6} sm={4} md={3}>
          <Card image="person_pink.png" title="Total Games" count="200" />
        </Grid>

        {/* TOTAL INCOME  */}
        <Grid item xs={6} sm={4} md={3}>
          <Card image="person_red.png" title="Total Income" count="20" />
        </Grid>

        {/* TODAY'S INCOME  */}
        <Grid item xs={6} sm={4} md={3}>
          <Card image="person_sky.png" title="Today’s Income" count="20" />
        </Grid>

        {/* WITHDRAWALS  */}
        <Grid item xs={6} sm={4} md={3}>
          <Card image="person_purple.png" title="Withdrawals" count="20" />
        </Grid>

        {/* WITHDRAWALS  */}
        <Grid item xs={6} sm={4} md={3}>
          <ViewCard title="Bid History" />
        </Grid>

        {/* MANAGE APP  */}

        <Grid item xs={6} sm={4} md={3}>
          <ViewCard title="Manage App" />
        </Grid>

        {/* GRAPH CARDS  */}
        {/* <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              // height: "10rem",
              backgroundColor: "#FFFFFF",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontSize: "1.0rem",
                fontWeight: "500",
                color: "rgba(18, 31, 62, 0.4)",
                ":hover": { textDecoration: "underline" },
              }}
            >
              Income{" "}
            </Typography>
            <center>
              <LineChart
                width={350}
                height={250}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#A6CEE3"
                  strokeWidth={5}
                />
                <Tooltip />
              </LineChart>
            </center>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Typography
              noWrap
              sx={{
                fontSize: "1.0rem",
                fontWeight: "500",
                color: "rgba(18, 31, 62, 0.4)",
                ":hover": { textDecoration: "underline" },
              }}
            >
              Usres Registered{" "}
            </Typography>
            <center>
              <BarChart width={350} height={250} data={data}>
                <Tooltip wrapperStyle={{ width: 100 }} />
                <Bar dataKey="uv" fill="#EF8B8C" barSize={30} />
              </BarChart>
            </center>
          </Box>
        </Grid> */}
      </Grid>

      <GameResults />
    </Container>
  );
}
