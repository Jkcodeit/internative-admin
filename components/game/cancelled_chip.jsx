import { Box, Typography } from "@mui/material";

export default function CancelledChip() {
  return (
    <div>
      <Box
        sx={{
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          maxHeight: "3rem",
          marginTop: "2rem",
          background: "#CB4741",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "2rem",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: "#FFFF",
            fontWeight: "600",
          }}
        >
          Cancelled
        </Typography>
      </Box>
    </div>
  );
}
