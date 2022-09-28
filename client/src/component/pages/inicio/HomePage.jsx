import React from "react";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useUsuario } from "../../../context/UsuarioContext";

export const HomePage = () => {
  const { usuarios } = useUsuario();

  return (
    <Box sx={{padding:'10px'}} >
      <Paper sx={{display:'flex', justifyContent:'center',alignItems: "center", height: "80vh" }}>
        <Box sx={{textAlign:'center'}}>
          <Typography variant="h2" >Bienvenido</Typography>
          <Typography  variant="h2" >{usuarios?.username}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};
