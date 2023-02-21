import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

const ComingSoonPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "whitesmoke",
        pb: 25,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          New Feature Coming Soon
        </Typography>
        <Typography variant="body2">
          Please check back later for updates.
        </Typography>
      </Box>
    </Box>
  );
};

export default ComingSoonPage;
