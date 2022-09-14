import React, { useEffect, useState } from "react";
import { useTasks } from "../../../data/TareaContext";
import { CrearTareas } from "./CrearTareas";
import { MostrarTareas } from "./MostrarTareas";

export const TareasPage = () => {
  const { obtenerTareas } = useTasks(); 
  let currentDate = new Date()
  
  const initialValues={title:"",description:"",createdAt:currentDate.toISOString().split(".")[0]}
  const [values, setValues] = useState(initialValues)   

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div>
      <section>
        <div>
          <CrearTareas values={values} setValues={setValues} initialValues={initialValues} />
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
