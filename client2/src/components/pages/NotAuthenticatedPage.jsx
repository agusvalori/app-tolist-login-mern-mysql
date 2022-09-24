import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const NotAuthenticatedPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "50%", height: "50%",display: "flex",
        justifyContent: "center",
        alignItems: "center", }}>
        <Box>
          <Typography variant="h4">Usuario no autentificado</Typography>
        </Box>
      </Paper>
    </Box>
  );
};
