import { pool } from "./db.js";

const agregarTarea = async (req, res) => {
 try {
  const { title, description, fecha, userId } = req.body;
  const [result] = await pool.query(
    "INSERT INTO tareas(title, description,userId) VALUES(?,?,?)",
    [title, description, userId]
  );
  res.send({ status: true,  message: "Tarea agregada correctamente", value:result.insertId});
 } catch (error) {
  return res.json({ status: false, message: error.message });
}
};

const obtenerTareasXUsuario = async (req, res) => {
  try {
    const { userID } = req.params;
    const [rows] = await pool.query("SELECT * FROM tareas WHERE userId=?", [
      userID,
    ]);
    if (rows.length !== 0) {
      res.send(rows);
    } else {
      res.send(false);
    }
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const editarTarea = async (req, res) => {
  try {
    const tarea = req.body;
    const id = req.params.id;
    const result = await pool.query("UPDATE tareas SET ? WHERE id=?", [
      tarea,
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.json({ status: false, message: "La tarea no se pudo editar" });
    }
    res.json({ message: "Tarea editada" });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM tareas WHERE id=?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "La tarea no se pudo eliminar" });
    }
    res.json({ status: true, message: "Tarea eliminada" });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

export { agregarTarea, obtenerTareasXUsuario, editarTarea, eliminarTarea };
