import React from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import { HighlightOffOutlined, EditOutlined } from "@mui/icons-material";
import { useTasks } from "../../../data/TareaContext";

export const MostrarTareas = ({setValues}) => {
  const {tareas, eliminarTareas}=useTasks()
  
  return (
    <Paper sx={{ padding: "10px", margin: "10px" }}>
      <Box textAlign={"center"}>
        <Typography variant="h5">
          Mostrar Tareas: {tareas.length}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "45vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "4px",
            display: "none" /* Ocultar scroll */,
          },
        }}
      >
        {tareas.map((task) => {
          return (
            <Paper
              key={task.id}
              sx={{
                padding: "5px",
                margin: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "90%", textAlign: "center" }}>
                <Typography variant="h6" color="primary">
                  {task.title}
                </Typography>
                <Typography>{task.description}</Typography>
                <Typography fontSize={"small"} color="error">
                  {task.createdAt}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton onClick={()=>eliminarTareas(task.id)}>
                  <HighlightOffOutlined color="warning" />
                </IconButton>
                <IconButton onClick={()=>setValues({...task,createdAt:task.createdAt.split(".")[0]})}>
                  <EditOutlined color="info" />
                </IconButton>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Paper>
  );
};
