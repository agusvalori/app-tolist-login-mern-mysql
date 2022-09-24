import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { useUser } from "../../../data/UsuarioContext";

export const HomePage = () => {
  const { usuarios } = useUser();  
  return (
    <Paper
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Bienvenido</Typography>
        <Typography variant="h4">a</Typography>
        <Typography variant="h5">Lista de Tareas</Typography>
        <Typography variant="h5">usuario: {usuarios?.name}</Typography>
      </Box>
    </Paper>
  );
};
