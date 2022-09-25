import { Router } from "express";
import {
  agregarTarea,
  editarTarea,
  eliminarTarea,  
  obtenerTareasXUsuario
} from "../data/taskData.js";

const taskRoutes = Router();
taskRoutes.post("/task", agregarTarea);
taskRoutes.get("/tasks/:userID", obtenerTareasXUsuario);
taskRoutes.put("/task/:id", editarTarea);
taskRoutes.delete("/task/:id", eliminarTarea);

export {taskRoutes};
