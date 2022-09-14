import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { About } from "./components/pages/About";
import { HomePage } from "./components/pages/home/HomePage";
import { NotFound } from "./components/pages/NotFound";
import { TareasPage } from "./components/pages/tareas/tareasPage";
import { TareaContextProvider } from "./data/TareaContext";
import { UsuarioContextProvider } from "./data/UsuarioContext";

export const App = () => {
  return (
    <UsuarioContextProvider>
      <NavBar />

      <TareaContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task" element={<TareasPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TareaContextProvider>
    </UsuarioContextProvider>
  );
};
