import { Box, Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useTask } from "../../../context/TareaContext";
import { AddTask } from "./AddTask";
import { ShowTask } from "./ShowTask";

export const TaskPage = () => {
  const { tasks, obtenerTareas } = useTask();
  useEffect(() => {
    obtenerTareas()
  }, [])
  
  return (
    <Box>
      <Box>
        <AddTask />
      </Box>
      <Box>
        <ShowTask tasks={tasks} />
      </Box>
    </Box>
  );
};
