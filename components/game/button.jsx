import { Box, Typography } from "@mui/material";

export default function Button({ title }) {
  return (
    <div>
      <Box
        sx={{
          height: "4rem",
          background: "#0075FF",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{ color: "#FFF", fontSize: "1.2rem", fontWeight: "500" }}
        >
          {title}
        </Typography>
      </Box>
    </div>
  );
}
