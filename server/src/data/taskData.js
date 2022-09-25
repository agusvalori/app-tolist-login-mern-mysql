import { pool } from "./db.js";

const agregarTarea = async (req, res) => {
  const { title, description, fecha } = req.body;
  const [result] = await pool.query(
    "INSERT INTO tareas(title, description) VALUES(?,?)",
    [title, description]
  );
  res.send({ id: result.insertId, title, description });
};


const obtenerTareasXUsuario = async (req, res) => {    
  try {
    const { userID } = req.params;
    const [rows] = await pool.query("SELECT * FROM tareas WHERE userId=?",[userID]);
    if(rows.length!==0){
      res.send(rows)
    }else{
      res.send(false)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "La tarea no se pudo editar" });
    }
    res.json({ message: "Tarea editada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM tareas WHERE id=?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "La tarea no se pudo eliminar" });
    }
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  agregarTarea,  
  obtenerTareasXUsuario,
  editarTarea,
  eliminarTarea,
};
