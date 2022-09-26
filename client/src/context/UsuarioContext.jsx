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

  const obtenerUsuariosXId = async (values) => {};

  const obtenerUsuariosXUsername = async (values) => {};

  const obtenerUsuariosXEmail = async (values) => {};

  const validarUsuario = async (values) => {
    const { username, password, email, name, lastname } = values;
    const result = [];
    //Validamos Username
    if (username.length == 0) {
      result.push({ atributo: "username", message: "Usuario Vacio" });
    }else{
      
    }
    //Validamos Password
    if (password.length == 0) {
      result.push({ atributo: "Contraseña", message: "Usuario Vacio" });
    }
    //Validamos Email
    if (email.length == 0) {
      result.push({ atributo: "Email", message: "Usuario Vacio" });
    }
    //Validamos Nombre
    //Validamos Apellido

    return result;
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        setUsuarios,
        crearUsuario,        
        obtenerUsuariosXId,
        obtenerUsuariosXEmail,
        obtenerUsuariosXUsername,
        validarUsuario,
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};

export { useUsuario, UsuarioContext, UsuarioContextProvider };
