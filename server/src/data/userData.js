import { pool } from "./db.js";

const eliminarUsuario = async (req, res) => {};

const editarUsuario = async (req, res) => {};

const obtenerUsuarioXId = async (id) => {
  return await pool.query("SELECT * FROM users WHERE id=?", [id]);
};

const obtenerUsuarioXUsername = async (req, res) => {
  const { username } = req.params;
  const [rows] = await pool.query("SELECT * FROM users WHERE username=?", [username]);
  if(rows.length===0){
    //El username no existe
    return res.send(false)
  }else{
    //el username ya existe
    return res.send(rows[0])
  }
  
};

const obtenerUsuarioXEmail = async (req, res) => {
  const { email } = req.params;
  const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
  if(rows.length===0){
    //El email no existe
    return res.send(false)
  }else{
    //el email ya existe
    return res.send(rows[0])
  }
};

export {
  obtenerUsuarioXId,
  obtenerUsuarioXUsername,
  obtenerUsuarioXEmail,
  eliminarUsuario,
  editarUsuario,
};
