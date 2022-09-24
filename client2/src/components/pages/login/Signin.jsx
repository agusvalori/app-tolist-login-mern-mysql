import { Alert, Box, Button, Paper, Snackbar, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useUser } from "../../../data/UsuarioContext";

export const Signin = () => {
  const { usuarios, loguearUsuario } = useUser();
  const initialValues = { username: "", password: "" };
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loguearUsuario(values);
    console.log(usuarios)
    console.log("usuarios?.isAuthenticated: ", usuarios?.isAuthenticated);
    if (usuarios?.isAuthenticated) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={5} sx={{ padding: "10px" }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyConten: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                name="username"
                label="Usuario"
                onChange={(event) => handleChange(event)}
              />
              <TextField
                sx={{ margin: "10px 0px" }}
                name="password"
                label="Contraseña"
                onChange={(event) => handleChange(event)}
              />
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="info"
                href="/signup"                
              >
                Registrar Usuario
              </Button>
              <Button variant="outlined" color="success" type="submit">
                Iniciar Sesion
              </Button>
            </Box>
          </Box>
        </form>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Snackbar
            open={open}
            autoHideDuration={1500}
            onClose={() => setOpen(false)}
          >
            <Alert
              severity={usuarios?.isAuthenticated ? "success" : "warning"}
              onClose={() => setOpen(false)}
            >
              {usuarios?.isAuthenticated
                ? "Usuario correcto"
                : "Usuario o contraseña invalidos"}
            </Alert>
          </Snackbar>
        </Stack>
      </Paper>
    </Box>
  );
};
