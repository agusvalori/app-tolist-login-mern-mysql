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
  const [validacion, setValidacion] = useState(false);

  const loguearUsuario = async (values) => {
    try {
      const result = await axios.post("http://localhost:4000/signin", values);
      setUsuarios(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const registrarUsuario = async (values) => {
    try {
      const result = await axios.post("http://localhost:4000/signup", values);
      if (result.data) {
        await loguearUsuario(values);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editarUsuario = async (values) => {
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

  const obtenerUsuarioXUsername = async (username) => {
    const result = await axios.get(
      "http://localhost:4000/user/username/" + username
    );

    return result.data;
  };

  const obtenerUsuarioXEmail = async (email) => {
    const result = await axios.get("http://localhost:4000/user/email/" + email);
    return result.data;
  };

  const validarUsuario = async (values) => {
    const { username, password, email, name, lastname } = values;
    let result = [];
    try {
      //USERNAME
      if (username.length === 0 || username.includes(" ")) {
        result.push({
          atributo: "username",
          mensaje: "Usuario invalido: Contiene espacios en blanco",
        });
      } else {
        let res = await obtenerUsuarioXUsername(username);
        if (res) {
          result.push({
            atributo: "username",
            mensaje: "Usuario invalido: Ya existe",
          });
        }
      }

      //PASSWORD
      if (password.length <= 7) {
        result.push({
          atributo: "password",
          mensaje: "Clave invalida: Tiene menos de 8 caracteres",
        });
      } else if (password.includes(" ")) {
        result.push({
          atributo: "password",
          mensaje: "Clave invalida: Contiene espacios en blanco",
        });
      }

      //EMAIL
      if (email.length === 0 || email.includes(" ")) {
        result.push({
          atributo: "email",
          mensaje: "Email invalido: Contiene espacios en blanco",
        });
      } else {
        let res = await obtenerUsuarioXEmail(email);
        if (res) {
          result.push({
            atributo: "email",
            mensaje: "Email invalido: Ya existe",
          });
        }
      }

      //NAME
      if (name.length === 0) {
        result.push({
          atributo: "name",
          mensaje: "Nombre invalido: Contiene espacios en blanco",
        });
      } else if (/\d/.test(name)) {
        result.push({
          atributo: "name",
          mensaje: "Nombre invalido: Contiene numeros",
        });
      }

      //LASTNAME

      if (lastname.length === 0) {
        result.push({
          atributo: "lastname",
          mensaje: "Apellido invalido: Contiene espacios en blanco",
        });
      } else if (/\d/.test(lastname)) {
        result.push({
          atributo: "lastname",
          mensaje: "Apellido invalido: Contiene numeros",
        });
      }
    } catch (error) {
      console.log("Error al validar los datos del usuario\n", error.message);
      result.push({ atributo: "lastname", mensaje: "Apellido invalido" });
    }
    setValidacion(result);
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        validacion,
        setValidacion,
        loguearUsuario,
        registrarUsuario,
        editarUsuario,
        eliminarUsuario,
        validarUsuario,
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioContext, UsuarioContextProvider, useUser };
