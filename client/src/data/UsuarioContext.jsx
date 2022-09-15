import axios from "axios";
import { createContext, useContext, useState } from "react";

const UsuarioContext = createContext();

const useUser = () => {
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

  const loguearUsuario = async (values) => {
    console.log("LoguearUsuario")
    try {
      const result = await axios.post("http://localhost:4000/signin", values);
      console.log("result: ",result);
    } catch (error) {
      console.log(error);
    }
  };

  const registrarUsuario = async (usuario) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const editarUsuario = async (usuario) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        loguearUsuario,
        registrarUsuario,
        editarUsuario,
        eliminarUsuario,
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioContext, UsuarioContextProvider, useUser };
