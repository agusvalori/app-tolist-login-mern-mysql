import passport from "passport";
import { pool } from "./db.js";

const iniciarSesionUsuario = (req, res, next) => {
  passport.authenticate("local.signin", {
    successReturnToOrRedirect: "/profile",
    failureRedirect: "/signin",
    failureMessage: true,
  })(req, res, next);
};

const obtenerUsuarioXId = async (id) => {
  return await pool.query("SELECT * FROM users WHERE id=?", [id]);
};

const registrarUsuario = passport.authenticate("local.signup", {
  successReturnToOrRedirect: "/profile",
  failureRedirect: "/signup",
  successMessage: "hola como estas vos todo bien",
  failureMessage: true,
});
const eliminarUsuario = async (req, res) => {};

const editarUsuario = async (req, res) => {};

export {
  iniciarSesionUsuario,
  registrarUsuario,
  obtenerUsuarioXId,
  eliminarUsuario,
  editarUsuario,
};
