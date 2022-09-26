import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser deveria estar dentro de un AuthContextProvider");
  }
  return context;
};

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, userId: null });

  const loginUsuario = async (values) => {
    try {
      const result = await axios.post("http://localhost:4000/signin", values);
      if (result?.data?.isAuthenticated && result?.data?.id) {
        setAuth({
          isAuthenticated: result?.data?.isAuthenticated,
          userId: result?.data?.id,
        });
      } else {
        setAuth({
          isAuthenticated: false,
          userId: null,
        });
      }
    } catch (error) {}
  };

  const signupUsuario = async (values) => {
    try {
      const result = await axios.post("http://localhost:4000/signup", values);      
      if (result?.data?.isAuthenticated && result?.data?.id) {
        setAuth({
          isAuthenticated: result?.data?.isAuthenticated,
          userId: result?.data?.id,
        });
      }
    } catch (error) {}
  };

  const logoutUsuario = async (values) => {};

  return (
    <AuthContext.Provider
      value={{ auth, loginUsuario, signupUsuario, logoutUsuario }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider, useAuth };
