import React from "react";
import { Box } from "@mui/material";

export const Layout = () => {
  const IsAuthenticated = () => {
    return (
      <>
        <Box>Usuario Autenticado</Box>
      </>
    );
  };

  const NotAuthenticated = () => {
    return (
      <>
        <Box>Usuario No Autenticado</Box>
      </>
    );
  };
  return NotAuthenticated();
};
