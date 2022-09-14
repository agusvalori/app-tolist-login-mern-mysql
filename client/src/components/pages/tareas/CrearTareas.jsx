import React from "react";
import { Paper, Box, Button, TextField } from "@mui/material";
import { useTasks } from "../../../data/TareaContext";

export const CrearTareas = ({ values, setValues, initialValues }) => {
  const { agregarTareas, editarTareas } = useTasks();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.id) {
      editarTareas(values);
    } else {
      agregarTareas(values);
    }

    setValues(initialValues);
  };

  return (
    <Paper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h3>{values.id ? "Editar" : "Crear"} Tareas</h3>
      </Box>

      <form onSubmit={(event) => handleSubmit(event)}>
      <Box sx={{display:"flex", justifyContent:'space-evenly'}} >
          
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
            type={"datetime-local"}
            name="createdAt"
            onChange={(event) => handleChange(event)}
            value={values.createdAt}
          />
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", margin:"5px"}} >
          <Button sx={{margin:'5px'}} variant="outlined" color="secondary" type="submit">{values.id ? "Editar" : "Guardar"}</Button>
          {values.id ? (
            <Button sx={{margin:'5px'}} variant="outlined" color="success" onClick={() => setValues(initialValues)}>
              Limpiar
            </Button>
          ) : (
            ""
          )}
        </Box>
      </form>
    </Paper>
  );
};
