import { createContext, useContext, useState } from "react";

const UsuarioContext = createContext();

const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error(
      "useUser deveria estar dentro de un UsuarioContextProvider"
    );
  }
  return context;
};

const UsuarioContextProvider = (props) => {
  const [usuarios, setUsuarios] = useState([]);

  const crearUsuario = async (values) => {};

  const obtenerUsuarios = async (values) => {};

  const obtenerUsuariosXId = async (values) => {};

  const obtenerUsuariosXUsername = async (values) => {};

  const obtenerUsuariosXEmail = async (values) => {};
};
