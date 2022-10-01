import { Router } from "express";
import {
  actualizarPassword,
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
userRoutes.put("/user/password/:userId", actualizarPassword);
userRoutes.delete("/user/:id", eliminarUsuario);

export { userRoutes };
