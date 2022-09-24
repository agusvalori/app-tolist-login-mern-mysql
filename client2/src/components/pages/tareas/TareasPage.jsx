import React, { useEffect, useState } from "react";
import { obtenerTareasXUsuario } from "../../../../../server/src/data/taskData";
import { useTasks } from "../../../data/TareaContext";
import { useUser } from "../../../data/UsuarioContext";
import { CrearTareas } from "./CrearTareas";
import { MostrarTareas } from "./MostrarTareas";

export const TareasPage = () => {
  const { obtenerTareasXUsuario } = useTasks();
  const { usuarios } = useUser();
  let currentDate = new Date();

  const initialValues = {
    title: "",
    description: "",
    createdAt: currentDate.toISOString().split(".")[0],
  };
  const [values, setValues] = useState(initialValues);

  useEffect(() => {    
    obtenerTareasXUsuario(usuarios);
    console.log("Username: ",usuarios.username)
  }, []);

  return (
    <div>
      <section>
        <div>
          <CrearTareas
            values={values}
            setValues={setValues}
            initialValues={initialValues}
          />
        </div>
      </section>
      <section>
        <div>
          <MostrarTareas setValues={setValues} />
        </div>
      </section>
    </div>
  );
};
