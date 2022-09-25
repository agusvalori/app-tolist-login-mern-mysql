import { Router } from "express";
import {
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  obtenerUsuarioXEmail,
  obtenerUsuarioXId,
  obtenerUsuarioXUsername,
} from "../data/userData.js";
const userRoutes = Router();

userRoutes.get("/user/username/:username", obtenerUsuarioXUsername);
userRoutes.get("/user/email/:email", obtenerUsuarioXEmail);
userRoutes.get("/user/:id", obtenerUsuarioXId);
userRoutes.post("/user", crearUsuario);
userRoutes.put("/user/:id", editarUsuario);
userRoutes.delete("/user/:id", eliminarUsuario);

export { userRoutes };
