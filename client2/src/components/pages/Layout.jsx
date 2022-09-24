import React from "react";
import { Route, Routes } from "react-router-dom";
import { TareaContextProvider } from "../../data/TareaContext.jsx";
import { NavBar } from "../navbar/NavBar.jsx";
import { HomePage } from "./home/HomePage";
import { TareasPage } from "./tareas/TareasPage";
import { About } from "./About";
import { NotFound } from "./NotFound";
import { useUser } from "../../data/UsuarioContext";
import { Signin } from "./login/Signin.jsx";
import { Signup } from "./login/Signup.jsx";

export const Layout = () => {
  const { usuarios } = useUser();

  const IsAuthenticated = () => {
    return (
      <>
        <NavBar />
        <TareaContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/task" element={<TareasPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TareaContextProvider>
      </>
    );
  };

  const NotAuth = () => {
    return (
      <Routes>
        <Route path="*" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />                
      </Routes>
    );
  };

  return (
    <>{usuarios?.isAuthenticated === true ? IsAuthenticated() : NotAuth()}</>
  );
};
