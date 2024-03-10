import React from "react";
import { Box, CircularProgress } from "@mui/material";

// circular loading component
const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="40px auto"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
