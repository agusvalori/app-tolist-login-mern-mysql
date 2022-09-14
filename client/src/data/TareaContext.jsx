import axios from "axios";
import { createContext, useContext, useState } from "react";

const TareaContext = createContext();

const useTasks = () => {
  const context = useContext(TareaContext);
  if (!context) {
    throw new Error("useTasks deveria estar dentro de un TareaContextProvider");
  }
  return context;
};

const TareaContextProvider = (props) => {
  const [tareas, setTareas] = useState([]);

  const obtenerTareas = async () => {
    try {
      const result = await axios.get("http://localhost:4000/task");
      setTareas(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarTareas = async (values) => {
    try {
      await axios.post("http://localhost:4000/task", values);
      obtenerTareas();
    } catch (error) {
      console.log(error);
    }
  };
  const eliminarTareas = async (id) => {
    try {
      if (confirm("Esta seguro de eliminar la tarea")) {
        await axios.delete(`http://localhost:4000/task/${id}`);
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editarTareas = async (values) => {
    try {
      if (confirm("Esta seguro que quiere editar la tarea")) {
        await axios.put(`http://localhost:4000/task/${values.id}`, values);
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TareaContext.Provider
      value={{
        tareas,
        setTareas,
        obtenerTareas,
        agregarTareas,
        eliminarTareas,
        editarTareas,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export { TareaContext, TareaContextProvider, useTasks };
