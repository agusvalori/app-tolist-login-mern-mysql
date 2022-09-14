import { Router } from "express";
import { UNSAFE_NavigationContext } from "react-router-dom";
import { iniciarSesionUsuario, registrarUsuario } from "../data/userData.js";
const userRoutes = Router();

userRoutes.get("/signin", (req, res) => {
  console.log("/signin")
  console.log("req.user: ",req.user);
  console.log("req.session: ",req.session);
  console.log("req.isAuthenticated(): ",req.isAuthenticated());
  console.log("Cookies: ", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);
  res.json({ message: "Signin" });
});

userRoutes.post("/signin", iniciarSesionUsuario);

userRoutes.post("/signup", registrarUsuario);

userRoutes.get("/profile", (req, res) => {
  console.log("/profile")
  console.log("req.user: ",req.user);
  console.log("req.session: ",req.session);
  console.log("req.isAuthenticated(): ",req.isAuthenticated());
  console.log("Cookies: ", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);
  res.json({ message: "Profile" });
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
