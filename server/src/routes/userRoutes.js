import { Router } from "express";
import { UNSAFE_NavigationContext } from "react-router-dom";
import { iniciarSesionUsuario, registrarUsuario } from "../data/userData.js";
import { isLoggedIn, isNotLoggedIn } from "../lib/isLoggedIn.js";
const userRoutes = Router();

userRoutes.get("/signin", (req, res) => {
  console.log(req.user);
  console.log(req.session);
  console.log(req.isAuthenticated());
  console.log("Cookies: ", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);
  res.send("Aca estamos viendo que hacer");
});

userRoutes.post("/signin", iniciarSesionUsuario);

userRoutes.post("/signup", registrarUsuario);

userRoutes.get("/profile", (req, res) => {
  console.log(req.isAuthenticated());
  res.json({ message: "Profile: hola pepe get" });
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
