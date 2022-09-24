import React from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontSize: "25px",
            }}
            to={"/"}
            component={Link}
          >
            Lista de tareas
          </Typography>
          <Typography
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
            to={"/"}
            component={Link}
          >
            Inicio
          </Typography>
          <Typography
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
            to={"/task"}
            component={Link}
          >
            Tareas
          </Typography>
          <Typography
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
            to={"/about"}
            component={Link}
          >
            About
          </Typography>
          <IconButton sx={{backgroundColor:"rgba(150, 150, 150, 0.2)"}} >
            <AccountCircleIcon fontSize="large" sx={{color:'white'}} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
