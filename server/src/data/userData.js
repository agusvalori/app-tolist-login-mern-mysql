import { HelpersCrypt } from "../lib/HelpersCrypt.js";
import { pool } from "./db.js";

const crearUsuario = async (req, res) => {
  try {
    const { username, password, name, lastName, email, lastLogin, createdAt } =
      req.body;

    const user = {
      username,
      password: await HelpersCrypt.encryptPassword(password),
      name,
      lastName,
      email,
    };

    const [result] = await pool.query("INSERT INTO users SET ?", [user]);

    if (result) {
      user.id = result.insertId;
      delete user.password;
      return res.json({ ...user, isAuthenticated: true });
    }
    res.send({ status: false, message: "No se pudo agregar el usuario" });
  } catch (error) {
    /*
    error.code
    ER_DUP_ENTRY: Cuando hay valores duplicados
    ER_BAD_NULL_ERROR: Cuando una valor requerido falta 
    */
    res.send({ status: false, message: `${error.code}:${error.message}` });
  }
};

const obtenerUsuarioXId = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "SELECT id,username,email,name,lastname,lastLogin,createdAt,verifyEmail FROM users WHERE id=?",
    [id]
  );
  if (result.length === 0) {
    //El id no existe
    return res.send(false);
  } else {
    //el id ya existe
    return res.send({ ...result[0], isAuthenticated: true });
  }
};

const obtenerUsuarioXUsername = async (req, res) => {
  const { username } = req.params;
  const [rows] = await pool.query(
    "SELECT id,username,email,name,lastname,lastLogin,createdAt,verifyEmail  FROM users WHERE username=?",
    [username]
  );
  if (rows.length === 0) {
    //El username no existe
    return res.send(false);
  } else {
    //el username ya existe
    return res.send(rows[0]);
  }
};

const obtenerUsuarioXEmail = async (req, res) => {
  const { email } = req.params;
  const [rows] = await pool.query(
    "SELECT  id,username,email,name,lastname,lastLogin,createdAt,verifyEmail  FROM users WHERE email=?",
    [email]
  );
  if (rows.length === 0) {
    //El email no existe
    return res.send(false);
  } else {
    //el email ya existe
    return res.send(rows[0]);
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM users WHERE id=?", id);
    console.log(result.affectedRows);
    if (result.affectedRows === 1) {
      return res.send({
        status: true,
        message: "Usuario eliminado correctamente",
      });
    }
    res.send({
      status: false,
      message: "No se encontro el usuario a eliminar",
    });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("UPDATE users SET ? WHERE id=?", [
      req.body,
      id,
    ]);
    if (result.affectedRows === 0) {
      res.send({
        status: false,
        message: "El Usuario no se pudo editar correctamente",
      });
    }
    res.send({ status: true, message: "Usuario editado" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const actualizarPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword, repeatNewPassword } = req.body;
    const [resPassword] = await pool.query(
      "SELECT password FROM users WHERE id=?",
      [userId]
    );

    
    if (resPassword?.length != 0) {
      if (
        await HelpersCrypt.comparePassword(
          currentPassword,
          resPassword[0]?.password
        )
      ) {
        const password =  await HelpersCrypt.encryptPassword(newPassword)
        const [result] = await pool.query("UPDATE users SET ? WHERE id=?", [
          {password:password},
          userId,
        ]);

        if(result.affectedRows===1){
          res.send({
            status: true,
            atributo: "newPassword",
            message: "Clave actualizada",
          });
        }else{
          res.send({
            status: false,
            atributo: "newPassword",
            message: "Error al actualicar la nueva clave compuebe si se cambio",
          });
        }        

      } else {
        res.send({
          status: false,
          atributo: "currentPassword",
          message: "Clave invalida",
        });
      }
    } else {
      res.send({
        status: false,
        atributo: "userId",
        message: "Usuario Invalido",
      });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

export {
  crearUsuario,
  obtenerUsuarioXId,
  obtenerUsuarioXUsername,
  obtenerUsuarioXEmail,
  eliminarUsuario,
  editarUsuario,
  actualizarPassword,
};
