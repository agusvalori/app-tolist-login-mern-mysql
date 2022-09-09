import { Router } from "express";
import { UNSAFE_NavigationContext } from "react-router-dom";
import { iniciarSesionUsuario, registrarUsuario } from "../data/userData.js";
import { isLoggedIn, isNotLoggedIn } from "../lib/isLoggedIn.js";
const userRoutes = Router();

userRoutes.get("/login", (req, res) => {
  if (isNotLoggedIn) {
    res.json({ message: "login: usuario No logeado" });
  } else {
    res.json({ message: "login: usuario logeado" });
  }
});

userRoutes.post("/signin", iniciarSesionUsuario);

userRoutes.post("/signup", registrarUsuario);


userRoutes.get("/profile", (req, res) => {
    if(isLoggedIn){
        res.send("profile: Usuario logeado")
    }else{
        res.send("Profile: Usuario no logeado")
    }
});

userRoutes.post("/profile", isLoggedIn, (req, res) => {
  res.json({ message: "Profile: hola pepe" });
});

userRoutes.get("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) {
      return UNSAFE_NavigationContext(error);
    } else {
      res.redirect("/login");
    }
  });
});

export { userRoutes };
