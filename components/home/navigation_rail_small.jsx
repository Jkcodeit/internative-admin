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

export default function NavigationRailSmall({
  varActiveIndex,
  setActiveIndex,
}) {
  var activeColor = "#FFFF";
  var inactiveColor = "#111727";

  return (
    <div>
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 0 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <Dashboard
            sx={{
              color: varActiveIndex === 0 ? activeColor : inactiveColor,
            }}
          />
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 1 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <Casino
            sx={{
              color: varActiveIndex === 1 ? activeColor : inactiveColor,
            }}
          />
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 2 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <Person3
            sx={{
              color: varActiveIndex === 2 ? activeColor : inactiveColor,
            }}
          />
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 3 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <Forum
            sx={{
              color: varActiveIndex === 3 ? activeColor : inactiveColor,
            }}
          />
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 4 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <Wallet
            sx={{
              color: varActiveIndex === 4 ? activeColor : inactiveColor,
            }}
          />
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 5 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <Payments
            sx={{
              color: varActiveIndex === 5 ? activeColor : inactiveColor,
            }}
          />
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 6 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <CampaignIcon
            sx={{
              color: varActiveIndex === 6 ? activeColor : inactiveColor,
            }}
          />
        </Box>
      </div>

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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 7 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <AppSettingsAlt
            sx={{
              color: varActiveIndex === 7 ? activeColor : inactiveColor,
            }}
          />
        </Box>
      </div>
      {/* MANAGE CONFIG */}

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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 8 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <AppSettingsAlt
            sx={{
              color: varActiveIndex === 8 ? activeColor : inactiveColor,
            }}
          />
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
          m={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            backgroundColor: varActiveIndex === 9 ? inactiveColor : activeColor,
            borderRadius: "1rem",
          }}
        >
          <Settings
            sx={{
              color: varActiveIndex === 9 ? activeColor : inactiveColor,
            }}
          />
        </Box>
      </div>
    </div>
  );
}
