import { Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import NavigationRail from "../../components/home/navigation_rail";
import NavigationRailSmall from "../../components/home/navigation_rail_small";
import SearchBar from "../../components/home/search_bar";
import Dashboard from "./dashboard";
import SettingsPage from "./settings";
import Games from "./games";
import imageLoader from "../../helpers/image_loader";
import Winning from "./Winning";
import GameResults from "./GameResults";

import WithdrawRequest from "./WithdrawRequest";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function HomePage() {
  const router = useRouter();

  const [varActiveIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // code to run when the component is mounted
    console.log("Component mounted!");
    const jwt = localStorage.getItem("jwt-token");
    console.log(jwt);
    console.log(typeof jwt);
    if (
      jwt == undefined ||
      jwt == "undefined" ||
      jwt == "null" ||
      jwt == "" ||
      jwt == null
    ) {
      console.log("cleared");
      // Clear local storage or remove token
      localStorage.removeItem("jwt-token");
      console.log("cleared");
      // Replace the current route with the login page

      router.replace("/login");
    }
  }, []);

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          itemw
          xs={1}
          sm={1}
          md={2}
          sx={{
            minHeight: "100vh",
            boxShadow: "8px 4px 24px #111727",
            background: " #FFFFFF",
          }}
        >
          <Box>
            {/* APP LOGO  */}
            <Box my={5} ml={7}>
              <Image
                loader={imageLoader}
                src="logo.png"
                alt="logo"
                srcSet=""
                width={150}
                height={30}
              />
            </Box>
            {/* <Box py={0.8}></Box> */}

            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              <NavigationRail
                varActiveIndex={varActiveIndex}
                setActiveIndex={setActiveIndex}
                key="smallNavigationRail"
              />
            </Box>
            <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
              <NavigationRailSmall
                varActiveIndex={varActiveIndex}
                setActiveIndex={setActiveIndex}
                key="largeNavigationRail"
              />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={11}
          sm={11}
          md={10}
          sx={{
            backgroundColor: "#F0F7FD",
          }}
        >
          <Box sx={{ display: varActiveIndex === 0 ? "block" : "none" }}>
            <Box
              sx={{
                height: "5rem",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchBar />
            </Box>
            <Dashboard />
          </Box>

          <Box sx={{ display: varActiveIndex === 1 ? "block" : "none" }}>
            <Box
              sx={{
                height: "5rem",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchBar />
            </Box>
            <Games />
          </Box>
          <Box sx={{ display: varActiveIndex === 6 ? "block" : "none" }}>
            <Box>
              <WithdrawRequest />
            </Box>
          </Box>

          <Box sx={{ display: varActiveIndex === 8 ? "block" : "none" }}>
            <Winning />
          </Box>

          <Box sx={{ display: varActiveIndex === 9 ? "block" : "none" }}>
            <SettingsPage />
          </Box>

          {/* {varActiveIndex === 0 ? (
            <Box>
              <Box
                sx={{
                  height: "5rem",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchBar />
              </Box>
              <Dashboard />{" "}
            </Box>
          ) : varActiveIndex === 1 ? (
            <Box>
              <Box
                sx={{
                  height: "5rem",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchBar />
              </Box>
              <Games />{" "}
            </Box>
          ) : varActiveIndex === 7 ? (
            <Box>
              {" "}
              <SettingsPage />{" "}
            </Box>
          ) : (
            <Box></Box>
          )} */}
        </Grid>
      </Grid>
    </div>
  );
}
