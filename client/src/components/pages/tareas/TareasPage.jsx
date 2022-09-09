import React, { useEffect } from "react";
import { useTasks } from "../../../data/TareaContext";
import { CrearTareas } from "./CrearTareas";
import { MostrarTareas } from "./MostrarTareas";

export const TareasPage = () => {
  const { obtenerTareas } = useTasks();    

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div>
      <section>
        <div>
          <CrearTareas/>
        </div>
      </section>
      <section>
        <div>
          <MostrarTareas />
        </div>
      </section>
    </div>
  );
};
