import { Router } from "express";
import {
  agregarTarea,
  editarTarea,
  eliminarTarea,
  obtenerTareas,
  obtenerTareaXId,
  obtenerTareasXUsuario
} from "../data/taskData.js";

const taskRoutes = Router();
taskRoutes.post("/task", agregarTarea);
taskRoutes.get("/task", obtenerTareas);
taskRoutes.get("/tasks/:userID", obtenerTareasXUsuario);
taskRoutes.get("/task/:id", obtenerTareaXId);
taskRoutes.put("/task/:id", editarTarea);
taskRoutes.delete("/task/:id", eliminarTarea);

export default taskRoutes;
