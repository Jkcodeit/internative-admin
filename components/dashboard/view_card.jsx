import { ArrowForward } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export default function ViewCard({ title }) {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "1rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          mb={3}
          sx={{
            fontSize: "1.0rem",
            fontWeight: "500",
            color: "rgba(18, 31, 62, 0.4)",
            ":hover": { textDecoration: "underline" },
          }}
        >
          {title}
        </Typography>
        <center>
          <Box
            sx={{
              background: "#0075FF",
              borderRadius: "5rem",
            }}
          >
            <IconButton sx={{ height: "5rem", width: "5rem" }}>
              <ArrowForward sx={{ color: "#FFFF" }} />
            </IconButton>
          </Box>
        </center>
      </Box>
    </div>
  );
}
