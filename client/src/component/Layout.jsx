import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./login/Signin";
import { Signup } from "./login/Signup";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { HomePage } from "./pages/inicio/HomePage";
import { TaskPage } from "./pages/tareas/TaskPage";
import { AboutPage } from "./pages/about/AboutPage";
import { NotFound } from "./pages/notFound/NotFound";
import { NavBar } from "./nav/NavBar";
import { TareaContextProvider } from "../context/TareaContext";
import { useUsuario } from "../context/UsuarioContext";

export const Layout = () => {
  const { auth } = useAuth();

  const IsAuthenticated = () => {
    const { obtenerUsuariosXId } = useUsuario();

    useEffect(() => {      
      obtenerUsuariosXId(auth?.userId);
    }, []);
    return (
      <TareaContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TareaContextProvider>
    );
  };

  const NotAuthenticated = () => {
    return (
      <>
        <Routes>
          <Route path="*" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    );
  };

  useEffect(() => {}, [auth]);

  return (
    <BrowserRouter>
      {auth.isAuthenticated ? <IsAuthenticated /> : <NotAuthenticated />}
    </BrowserRouter>
  );
};
