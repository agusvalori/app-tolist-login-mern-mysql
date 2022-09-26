import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUsuario } from "../../context/UsuarioContext";

export const Signup = () => {
  const { validarUsuario } = useUsuario();
  const { signupUsuario } = useAuth();
  const initialValues = {
    username: "",
    password: "",
    email: "",
    name: "",
    lastname: "",
  };
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let result = await validarUsuario(values);
    if (result.length === 0) {
      setMessage(result);
      signupUsuario(values);
    } else {
      setOpen(true);
      setMessage(result);
    }
  };

  useEffect(() => {}, [message]);

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "350px", padding: "15px" }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Box sx={{ display: "grid", rowGap: "10px" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography>Registrar Usuario</Typography>
            </Box>
            <Box sx={{ display: "grid", rowGap: "10px" }}>
              <TextField
                name="username"
                label="Usuario"
                onChange={(event) => handleChange(event)}
                error={
                  message?.filter((item) => item?.atributo === "username")
                    .length != 0
                }
                helperText={
                  message?.filter((item) => item?.atributo === "username")[0]
                    ?.message
                }
              />
              <TextField
                name="password"
                label="Contraseña"
                type="password"
                onChange={(event) => handleChange(event)}
                error={
                  message?.filter((item) => item?.atributo === "password")
                    .length != 0
                }
                helperText={
                  message?.filter((item) => item?.atributo === "password")[0]
                    ?.message
                }
              />
              <TextField
                name="email"
                label="Correo electronico"
                type="email"
                onChange={(event) => handleChange(event)}
                error={
                  message?.filter((item) => item?.atributo === "email")
                    .length != 0
                }
                helperText={
                  message?.filter((item) => item?.atributo === "email")[0]
                    ?.message
                }
              />
            </Box>
            <Box sx={{ display: "grid", rowGap: "10px" }}>
              <TextField
                name="name"
                label="Nombre"
                onChange={(event) => handleChange(event)}
                error={
                  message?.filter((item) => item?.atributo === "name").length !=
                  0
                }
                helperText={
                  message?.filter((item) => item?.atributo === "name")[0]
                    ?.message
                }
              />
              <TextField
                name="lastname"
                label="Apellido"
                onChange={(event) => handleChange(event)}
                error={
                  message?.filter((item) => item?.atributo === "lastname")
                    .length != 0
                }
                helperText={
                  message?.filter((item) => item?.atributo === "lastname")[0]
                    ?.message
                }
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                columnGap: "5px",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Button type={"submit"} variant="outlined">
                Registrar
              </Button>
              <Button variant="outlined" color={"error"}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
      <Stack>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="error" onClose={() => setOpen(false)}>
            Datos de usuario incorrectos
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};
