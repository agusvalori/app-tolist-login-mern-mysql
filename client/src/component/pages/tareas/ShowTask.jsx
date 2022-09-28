import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { Delete } from "@mui/icons-material";
import { useTask } from "../../../context/TareaContext";
import { AddTask } from "./AddTask";
import dayjs from "dayjs";

export const ShowTask = ({ tasks }) => {
  const { eliminarTarea } = useTask();

  const handleDelete = (id) => {
    eliminarTarea(id);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>
          Total de tareas: {Array.isArray(tasks) ? tasks?.length : 0}
        </Typography>
      </Box>
      <Paper
        sx={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          height: "60vh",
          "&::-webkit-scrollbar": {
            width: "4px",
            display: "none" /* Ocultar scroll */,
          },
        }}
      >
        {Array.isArray(tasks)
          ? tasks?.map((item) => {
              return (
                <Paper sx={{ padding: "5px", margin: "5px 0px" }} key={item.id}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "90% 10%",
                      gridTemplateAreas: ". .",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Box>
                        <Typography>{item?.title}</Typography>
                        <Typography>{item?.description}</Typography>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography color="error" fontSize={"small"}>
                          {dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm")}hs
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid",
                        borderRadius: "15px",
                      }}
                    >
                      <AddTask itemEdit={{ values: item, edit: true }} />
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              );
            })
          : "No se encontraron tareas"}
      </Paper>
    </Box>
  );
};
