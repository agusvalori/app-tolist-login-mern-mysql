import React from "react";
import { Form, Formik } from "formik";
import { Paper, Box } from "@mui/material";
import { useTasks } from "../../../data/TareaContext";

export const CrearTareas = () => {
  const { agregarTareas } = useTasks();
  return (
    <Paper>
      <Box>
        <h3>Crear Tareas</h3>
      </Box>
      <Formik
        initialValues={{ title: "", description: "", createdAt: "" }}
        onSubmit={async (values, actions) => {
          agregarTareas(values, actions);
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>Titulo</label>
            <input
              type={"text"}
              name="title"
              onChange={handleChange}
              value={values.title}
            />

            <label>Descripcion</label>
            <input
              type={"text"}
              name="description"
              onChange={handleChange}
              value={values.description}
            />

            <label>Fecha</label>
            <input
              type={"datetime-local"}
              name="createdAt"
              onChange={handleChange}
              value={values.createdAt}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando...." : "Guardar"}
            </button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
