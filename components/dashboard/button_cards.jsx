import { Add, EmojiEvents } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function ButtonCards({ title, icon }) {
  return (
    <div>
      <Box
        sx={{
          height: "4rem",
          background: "#FFFF",
          // border: "2px solid black",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {icon === "add" ? (
          <Add fontSize="large" sx={{ color: "black" }} />
        ) : icon === "win" ? (
          <EmojiEvents fontSize="large" sx={{ color: "black" }} />
        ) : (
          <></>
        )}
        <Typography
          ml={3}
          sx={{ color: "black", fontSize: "1.2rem", fontWeight: "500" }}
        >
          {title}
        </Typography>
      </Box>
    </div>
  );
}
