import React from "react";
import { Layout } from "./component/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { UsuarioContextProvider } from "./context/UsuarioContext";

export const App = () => {
  return (
    <UsuarioContextProvider>
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    </UsuarioContextProvider>
  );
};
