import { Box } from "@mui/material";
import React from "react";
import { Layout } from "./components/pages/Layout";
import { UsuarioContextProvider } from "./data/UsuarioContext";

export const App = () => {
  return (
    <UsuarioContextProvider>
      <Layout />
    </UsuarioContextProvider>
  );
};
