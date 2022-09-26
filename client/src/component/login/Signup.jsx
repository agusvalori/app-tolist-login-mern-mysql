import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useUsuario } from "../../context/UsuarioContext";

export const Signup = () => {
  const {validarUsuario} = useUsuario()
  const initialValues = {
    username: "",
    password: "",
    email: "",
    name: "",
    lastname: "",
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let result = await validarUsuario(values)
    console.log(result)
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
      <Paper sx={{ width: "350px", padding: "15px" }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Box sx={{ display: "grid", rowGap: "10px" }}>
            <Box sx={{textAlign:'center'}} >
              <Typography>Registrar Usuario</Typography>
            </Box>
            <Box sx={{ display: "grid", rowGap: "10px" }}>
              <TextField
                name="username"
                label="Usuario"
                onChange={(event) => handleChange(event)}
              />
              <TextField
                name="password"
                label="Contraseña"
                onChange={(event) => handleChange(event)}
              />
              <TextField
                name="email"
                label="Correo electronico"
                onChange={(event) => handleChange(event)}
              />
            </Box>
            <Box sx={{ display: "grid", rowGap: "10px" }}>
              <TextField
                name="name"
                label="Nombre"
                onChange={(event) => handleChange(event)}
              />
              <TextField
                name="lastname"
                label="Apellido"
                onChange={(event) => handleChange(event)}
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
              <Button variant="outlined" color={"error"} >Cancelar</Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
