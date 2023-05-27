import {
  Dashboard,
  Casino,
  Person3,
  Forum,
  Wallet,
  Payments,
  AppSettingsAlt,
  Settings,
} from "@mui/icons-material";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Box, Typography } from "@mui/material";
import Config from "../../pages/config";

export default function NavigationRail({ varActiveIndex, setActiveIndex }) {
  var activeColor = "#FFFF";
  var inactiveColor =
    "linear-gradient(90deg, rgba(0, 117, 255, 0.1) 0%, rgba(0, 117, 255, 0) 117.12%)";

  var activeTextColor = "#0075FF";

  var inactiveTextColor = "#121F3E66";

  return (
    <div>
      <Typography
        pl={5}
        my={3}
        noWrap
        component="p"
        sx={{
          color: inactiveTextColor,
          fontSize: "0.9rem",
          fontWeight: "500",
          textTransform: "uppercase",
        }}
      >
        Managements
      </Typography>
      {/* DASHBOARD CARD */}
      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 0) {
            setActiveIndex(0);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 0 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 0 ? "4px solid #0075FF" : "",
          }}
        >
          <Dashboard
            sx={{
              color: varActiveIndex === 0 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            noWrap
            component="p"
            sx={{
              color: varActiveIndex === 0 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Dashboard
          </Typography>
        </Box>
      </div>

      {/* GAME CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 1) {
            setActiveIndex(1);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 1 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 1 ? "4px solid #0075FF" : "",
          }}
        >
          <Casino
            sx={{
              color: varActiveIndex === 1 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            component="p"
            noWrap
            sx={{
              color: varActiveIndex === 1 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Games
          </Typography>
        </Box>
      </div>

      {/* USERS CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 2) {
            setActiveIndex(2);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 2 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 2 ? "4px solid #0075FF" : "",
          }}
        >
          <Person3
            sx={{
              color: varActiveIndex === 2 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            component="p"
            noWrap
            sx={{
              color: varActiveIndex === 2 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Users
          </Typography>
        </Box>
      </div>

      {/* CHAT CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 3) {
            setActiveIndex(3);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 3 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 3 ? "4px solid #0075FF" : "",
          }}
        >
          <Forum
            sx={{
              color: varActiveIndex === 3 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            component="p"
            noWrap
            sx={{
              color: varActiveIndex === 3 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Chats
          </Typography>
        </Box>
      </div>

      {/* WALLET CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 4) {
            setActiveIndex(4);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 4 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 4 ? "4px solid #0075FF" : "",
          }}
        >
          <Wallet
            sx={{
              color: varActiveIndex === 4 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            noWrap
            component="p"
            sx={{
              color: varActiveIndex === 4 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Wallet
          </Typography>
        </Box>
      </div>

      {/* TRANSACTIONS CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 5) {
            setActiveIndex(5);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 5 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 5 ? "4px solid #0075FF" : "",
          }}
        >
          <Payments
            sx={{
              color: varActiveIndex === 5 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            noWrap
            component="p"
            sx={{
              color: varActiveIndex === 5 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Transactions
          </Typography>
        </Box>
      </div>

      {/* CONFIG CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 6) {
            setActiveIndex(6);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 6 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 6 ? "4px solid #0075FF" : "",
          }}
        >
          <CampaignIcon
            sx={{
              color: varActiveIndex === 6 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            noWrap
            component="p"
            sx={{
              color: varActiveIndex === 6 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Withdraw
          </Typography>
        </Box>
      </div>

      <Typography
        pl={5}
        my={3}
        noWrap
        component="p"
        sx={{
          color: inactiveTextColor,
          fontSize: "0.9rem",
          fontWeight: "500",
          textTransform: "uppercase",
        }}
      >
        Support
      </Typography>

      {/* MANAGE APP CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 7) {
            setActiveIndex(7);
          }
        }}
        style={{}}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 7 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 7 ? "4px solid #0075FF" : "",
          }}
        >
          <AppSettingsAlt
            sx={{
              color: varActiveIndex === 7 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            noWrap
            component="p"
            sx={{
              color: varActiveIndex === 7 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Manage App
          </Typography>
        </Box>
      </div>

      {/* MANAGE CONFIG*/}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 8) {
            setActiveIndex(8);
          }
        }}
        style={{}}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            background: varActiveIndex === 8 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 8 ? "4px solid #0075FF" : "",
          }}
        >
          <AppSettingsAlt
            sx={{
              color: varActiveIndex === 8 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            noWrap
            component="p"
            sx={{
              color: varActiveIndex === 8 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Config
          </Typography>
        </Box>
      </div>

      {/* SETTINGS CARD */}

      <div
        onClick={(e) => {
          e.preventDefault();
          if (varActiveIndex !== 9) {
            setActiveIndex(9);
          }
        }}
      >
        <Box
          fixed
          component="center"
          py={2.3}
          my={2}
          pl={5}
          sx={{
            alignItems: "center",
            justifyContent: "left",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 9 ? inactiveColor : activeColor,
            borderLeft: varActiveIndex === 9 ? "4px solid #0075FF" : "",
          }}
        >
          <Settings
            sx={{
              color: varActiveIndex === 9 ? activeTextColor : inactiveTextColor,
            }}
          />
          <Typography
            pl={2}
            component="p"
            noWrap
            sx={{
              color: varActiveIndex === 9 ? activeTextColor : inactiveTextColor,
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            Settings
          </Typography>
        </Box>
        <br />
        <br />
        <hr />
        <Typography
          pl={5}
          my={3}
          noWrap
          component="p"
          sx={{
            color: "black",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          © Instant Gamez. 2022
        </Typography>
      </div>
    </div>
  );
}
