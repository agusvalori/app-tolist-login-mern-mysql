import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useUser } from "../../../data/UsuarioContext";
import { useEffect } from "react";

export const Signup = () => {
  const { registrarUsuario, validacion, validarUsuario } = useUser();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
  };
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleClose = () => {
    setValues(initialValues);
    setOpenModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    await validarUsuario(values);

    if (validacion.length === 0) {
      if (await registrarUsuario(values)) {
        setMensaje("Usuario agregado exitosamente");
      }
    }
    setOpen(true);
  };

  useEffect(() => {}, [validacion, mensaje]);
  return (
    <Box
      sx={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "300px", padding: "15px" }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h5">Registrar Usuario</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                name="username"
                label="Nombre de usuario"
                onChange={(event) => handleChange(event)}
                value={values.username}
                error={
                  Array.isArray(validacion) &&
                  validacion.findIndex(
                    (item) => item.atributo === "username"
                  ) != -1
                }
                helperText={
                  Array.isArray(validacion)
                    ? validacion.find((item) => item.atributo === "username")
                        ?.mensaje
                    : ""
                }
              />
              <TextField
                sx={{ margin: "10px 0px" }}
                name="password"
                type="password"
                label="Contraseña"
                onChange={(event) => handleChange(event)}
                value={values.password}
                error={
                  Array.isArray(validacion) &&
                  validacion.findIndex(
                    (item) => item.atributo === "password"
                  ) != -1
                }
                helperText={
                  Array.isArray(validacion)
                    ? validacion.find((item) => item.atributo === "password")
                        ?.mensaje
                    : ""
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                name="name"
                label="Nombre"
                onChange={(event) => handleChange(event)}
                value={values.name}
                error={
                  Array.isArray(validacion) &&
                  validacion.findIndex((item) => item.atributo === "name") != -1
                }
                helperText={
                  Array.isArray(validacion)
                    ? validacion.find((item) => item.atributo === "name")
                        ?.mensaje
                    : ""
                }
              />
              <TextField
                name="lastname"
                sx={{ margin: "10px 0px" }}
                label="Apellido"
                onChange={(event) => handleChange(event)}
                value={values.lastname}
                error={
                  Array.isArray(validacion) &&
                  validacion.findIndex(
                    (item) => item.atributo === "lastname"
                  ) != -1
                }
                helperText={
                  Array.isArray(validacion)
                    ? validacion.find((item) => item.atributo === "lastname")
                        ?.mensaje
                    : ""
                }
              />
              <TextField
                name="email"
                type={"email"}
                label="Email"
                onChange={(event) => handleChange(event)}
                value={values.email}
                error={
                  Array.isArray(validacion) &&
                  validacion.findIndex((item) => item.atributo === "email") !=
                    -1
                }
                helperText={
                  Array.isArray(validacion)
                    ? validacion.find((item) => item.atributo === "email")
                        ?.mensaje
                    : ""
                }
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {mensaje === "" ? (
              <Button
                type={"submit"}
                sx={{ margin: "0px 5px" }}
                variant="outlined"
                color="success"
              >
                Registrar
              </Button>
            ) : (
              <Button
                sx={{ margin: "0px 5px" }}
                variant="outlined"
                color="success"
              >
                Cargando...
              </Button>
            )}
            <Button
              onClick={handleClose}
              href="/signin"
              sx={{}}
              variant="outlined"
              color="warning"
            >
              Cancelar
            </Button>
          </Box>
        </form>

        <Stack sx={{ width: "100%" }} spacing={2}>
          <Snackbar
            open={open}
            autoHideDuration={2500}
            onClose={() => {
              setOpen(false);
            }}
          >
            <Alert
              severity={mensaje == "" ? "error" : "success"}
              variant="filled"
              onClose={() => {
                setOpen(false);
                setMensaje("");
              }}
            >
              {mensaje == "" ? "Datos de usuario invalido" : mensaje}
            </Alert>
          </Snackbar>
        </Stack>
      </Paper>
    </Box>
  );
};
