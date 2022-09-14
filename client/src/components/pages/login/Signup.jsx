import React from "react";
import { Paper, Box, Typography, TextField } from "@mui/material";

export const Signup = () => {
  return (
    <Paper>
      <Box>
        <Box>
          <Typography>Registrar Usuario</Typography>
        </Box>
        <Box>
          <TextField label="Nombre de usuario" />
          <TextField label="Contraseña" />
          <TextField label="Revisar contraseña" />
        </Box>
        <Box>
          <TextField label="Nombre" />
          <TextField label="Apellido" />
          <TextField label="Email" />
        </Box>
      </Box>
    </Paper>
  );
};
