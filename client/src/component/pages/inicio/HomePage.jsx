import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useUsuario } from "../../../context/UsuarioContext";

export const HomePage = () => {
  const { usuarios } = useUsuario();
  const {auth} = useAuth()
  console.log(usuarios)
  console.log(auth)

  return (
    <Box sx={{ height: "99vh" }}>
      <Paper></Paper>
    </Box>
  );
};
