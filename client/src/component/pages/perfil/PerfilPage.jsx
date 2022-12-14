import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useUsuario } from "../../../context/UsuarioContext";
import dayjs from "dayjs";

export const PerfilPage = () => {
  const [open, setOpen] = useState(false);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const [changePass, setChangePass] = useState(true);
  const { usuarios, actualizarPassword, validarPassword } = useUsuario();

  const handleChangeCheckBok = (event) => {
    const { checked } = event.target;
    setChangePass(!checked);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
    setChangePass(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    
    const validacion = await validarPassword(values);    
    if (validacion.length === 0) {
      const res = await actualizarPassword(values, usuarios.id);
      console.log("actualizarPassword: ",res)
    } else {
      console.log("No se pudo actualizar por....", validacion);
    }
  };

  return (
    <Box>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{ backgroundColor: "rgba(150, 150, 150, 0.2)" }}
      >
        <AccountCircle fontSize="large" sx={{ color: "white" }} />
      </IconButton>
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={() => handleClose()}
      >
        <Paper sx={{ width: "95%", height: "90%", padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Box display={"flex"}>
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Usuario:
              </Typography>
              <Typography>{usuarios?.username}</Typography>
            </Box>
            <Box display={"flex"}>
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Email:
              </Typography>
              <Typography>{usuarios?.email}</Typography>
            </Box>
            <Box display={"flex"}>
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Nombre:{" "}
              </Typography>
              <Typography>{usuarios?.name}</Typography>
            </Box>
            <Box display={"flex"}>
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Apellido:
              </Typography>
              <Typography>{usuarios?.lastname}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Box>
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Cuenta creada el:
              </Typography>
              <Typography>
                {dayjs(usuarios?.createdAt).format("DD/MM/YYYY - HH:mm")}hs
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Ultima conexion:
              </Typography>
              <Typography>
                {dayjs(usuarios?.lastLogin).format("DD/MM/YYYY - HH:mm")}hs
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Cambiar contrase??a</Typography>
              <Checkbox
                name="checkChangePass"
                onChange={(event) => handleChangeCheckBok(event)}
              />
            </Box>
            <form onSubmit={() => handleSubmit(event)}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  onChange={(event) => handleChangeInput(event)}
                  disabled={changePass}
                  name="currentPassword"
                  label="Clave Actual"
                />
                <TextField
                  onChange={(event) => handleChangeInput(event)}
                  disabled={changePass}
                  name="newPassword"
                  label="Nueva clave"
                />
                <TextField
                  onChange={(event) => handleChangeInput(event)}
                  disabled={changePass}
                  name="repeatNewPassword"
                  label="Repita la Clave Nueva"
                />
                <Button type={"submit"} disabled={changePass}>
                  Cambiar contrase??a
                </Button>
              </Box>
            </form>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button>Cerrar Sesion</Button>
            <Button onClick={() => handleClose()}>Cancelar</Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};
