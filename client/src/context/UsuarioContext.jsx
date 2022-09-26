import axios from "axios";
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

  const obtenerUsuariosXId = async (values) => {
    try {
      const result = await axios.get(
        "http://localhost:4000/user/username/",
        values
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerUsuariosXUsername = async (username) => {
    try {
      const result = await axios.get(
        "http://localhost:4000/user/username/" + username
      );
      if (result.data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const obtenerUsuariosXEmail = async (email) => {
    try {
      const result = await axios.get(
        "http://localhost:4000/user/email/" + email
      );
      if (result.data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const validarUsuario = async (values) => {
    const { username, password, email, name, lastname } = values;
    const result = [];
    //Validamos Username
    if (username.length == 0) {
      result.push({ atributo: "username", message: "Usuario vacio" });
    } else {
      if (username.includes(" ")) {
        result.push({
          atributo: "username",
          message: "Usuario tiene un espacio",
        });
      } else if (await obtenerUsuariosXUsername(username)) {
        result.push({
          atributo: "username",
          message: "Usuario en uso",
        });
      }
    }
    //Validamos Password
    if (password.length == 0) {
      result.push({ atributo: "password", message: "Contraseña Vacia" });
    } else {
      if (password.includes(" ")) {
        result.push({
          atributo: "password",
          message: "Contraseña tiene un espacio",
        });
      }
    }
    //Validamos Email
    if (email.length == 0) {
      result.push({ atributo: "email", message: "Email Vacio" });
    } else {
      if (email.includes(" ")) {
        result.push({
          atributo: "email",
          message: "Email tiene un espacio",
        });
      } else if (await obtenerUsuariosXEmail(email)) {
        result.push({
          atributo: "email",
          message: "Email en uso",
        });
      }
    }

    //Validamos Nombre
    if (name.length != 0) {
      if (/\d/.test(name)) {
        result.push({
          atributo: "name",
          message: "Nombre tiene numeros",
        });
      }
    }
    //Validamos Apellido
    if (lastname.length != 0) {
      if (/\d/.test(lastname)) {
        result.push({
          atributo: "lastname",
          message: "Apellido tiene numeros",
        });
      }
    }
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
