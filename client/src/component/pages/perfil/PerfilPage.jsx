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
  const [changePass, setChangePass] = useState(true);
  const { usuarios } = useUsuario();

  const handleChangeCheckBok = (event) => {
    const { checked } = event.target;
    setChangePass(!checked);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
  };

  const handleClose = () => {
    setOpen(false);
    setChangePass(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
              <Typography>Cambiar contraseña</Typography>
              <Checkbox
                name="checkChangePass"
                onChange={(event) => handleChangeCheckBok(event)}
              />
            </Box>
            <form>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  disabled={changePass}
                  name="currentPassword"
                  label="Clave Actual"
                />
                <TextField
                  disabled={changePass}
                  name="newPassword"
                  label="Nueva clave"
                />
                <TextField
                  disabled={changePass}
                  name="repeatNewPassword"
                  label="Repita la Clave Nueva"
                />
                <Button disabled={changePass}>Cambiar contraseña</Button>
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
