import { Box, Typography } from "@mui/material";
import Image from "next/image";
import imageLoader from "../../helpers/image_loader";

export default function Card({ image, title, count }) {
  return (
    <div>
      <Box
        sx={{
          height: "12rem",
          backgroundColor: "#FFFFFF",
          borderRadius: "1rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            loader={imageLoader}
            src={image}
            alt="logo"
            srcset=""
            width={30}
            height={30}
          />
          <Typography
            noWrap
            sx={{
              fontSize: "1.0rem",
              fontWeight: "500",
              color: "rgba(18, 31, 62, 0.4)",
              ":hover": { textDecoration: "underline" },
            }}
            ml={3}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#111727",
            textAlign: "center",
          }}
        >
          {count}
        </Typography>
        <Box></Box>
      </Box>
    </div>
  );
}
