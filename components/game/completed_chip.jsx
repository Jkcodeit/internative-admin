import { Box, Typography } from "@mui/material";

export default function CompletedChip() {
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
          background: "#74B18B",
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
          Completed
        </Typography>
      </Box>
    </div>
  );
}
