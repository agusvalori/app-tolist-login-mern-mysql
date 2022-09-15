import passport from "passport";
import { pool } from "./db.js";

const obtenerUsuarioXId = async (id) => {
  return await pool.query("SELECT * FROM users WHERE id=?", [id]);
};

const registrarUsuario = passport.authenticate("local", {
  successReturnToOrRedirect: "/profile",
  failureRedirect: "/signup",
  failureMessage: true,
});

const eliminarUsuario = async (req, res) => {};

const editarUsuario = async (req, res) => {};

export {  
  registrarUsuario,
  obtenerUsuarioXId,
  eliminarUsuario,
  editarUsuario,
};
