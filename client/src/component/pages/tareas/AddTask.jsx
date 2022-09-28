import {
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { AddCircle, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import { useTask } from "../../../context/TareaContext";
import { useEffect } from "react";

export const AddTask = ({ itemEdit }) => {
  const initialValues = itemEdit
    ? {
        ...itemEdit.values,
        createdAt: dayjs(itemEdit?.values?.createdAt).format(
          "YYYY-MM-DDTHH:mm"
        ),
      }
    : {
        title: "",
        description: "",
        createdAt: dayjs(new Date()).format("YYYY-MM-DDTHH:mm"),
      };

  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const { crearTarea, editarTarea } = useTask();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemEdit) {
      editarTarea(values);
    } else {
      crearTarea(values);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(!open);
    setValues(initialValues);
  };

  return (
    <Box>
      {itemEdit ? (
        <Box>
          <IconButton onClick={handleClose}>
            <Edit />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={handleClose}>
            <AddCircle color="success" fontSize="large" />
          </IconButton>
        </Box>
      )}

      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={handleClose}
      >
        <Paper sx={{ width: "400px", padding: "10px" }}>
          <form onSubmit={(event) => handleSubmit(event)}>
            <Box sx={{ display: "grid", rowGap: "10px" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>Ingresar nueva tarea</Typography>
              </Box>
              <Box sx={{ display: "grid", rowGap: "10px" }}>
                <TextField
                  name="title"
                  label="Titulo"
                  onChange={(event) => handleChange(event)}
                  value={values.title}
                />
                <TextField
                  name="description"
                  label="Descripcion"
                  onChange={(event) => handleChange(event)}
                  value={values.description}
                />
                <TextField
                  name="createdAt"
                  type="datetime-local"
                  onChange={(event) => handleChange(event)}
                  value={values.createdAt}
                />
              </Box>
              <Box
                sx={{
                  display: "grid",
                  columnGap: "10px",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <Button type="submit" variant="outlined" color={"success"}>
                  {itemEdit ? "Editar" : "Agregar"}
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color={"warning"}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Modal>
    </Box>
  );
};
