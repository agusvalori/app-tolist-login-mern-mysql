import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser deveria estar dentro de un AuthContextProvider");
  }
  return context;
};

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState([]);

  const loginUsuario = async (values) => {
    
  };

  const signupUsuario = async (values) => {};

  const logoutUsuario = async (values) => {};
};
