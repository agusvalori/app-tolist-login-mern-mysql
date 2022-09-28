import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const TareaContext = createContext();

const useTask = () => {
  const context = useContext(TareaContext);
  if (!context) {
    throw new Error("useUser deveria estar dentro de un AuthContextProvider");
  }
  return context;
};

const TareaContextProvider = (props) => {
  const [tasks, setTasks] = useState({});
  const { auth } = useAuth();

  const crearTarea = async (values) => {
    const { isAuthenticated, userId } = auth;
    try {
      if (isAuthenticated) {
        const result = await axios.post("http://localhost:4000/task/", {
          ...values,
          userId,
        });
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTareas = async () => {
    const { isAuthenticated, userId } = auth;
    try {
      if (isAuthenticated) {
        const result = await axios.get("http://localhost:4000/tasks/" + userId);
        setTasks(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (values) => {
    const { isAuthenticated } = auth;    
    try {
      if (isAuthenticated) {
        await axios.put("http://localhost:4000/task/"+values.id,values)
        obtenerTareas()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTarea = async (id) => {
    const { isAuthenticated } = auth;
    try {
      if (isAuthenticated) {
        await axios.delete("http://localhost:4000/task/"+id);
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TareaContext.Provider
      value={{ tasks, setTasks, obtenerTareas, crearTarea, editarTarea,eliminarTarea }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export { TareaContext, TareaContextProvider, useTask };
