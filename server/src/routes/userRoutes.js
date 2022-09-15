import { Router } from "express";
import passport from "passport";
import { UNSAFE_NavigationContext } from "react-router-dom";
import { registrarUsuario } from "../data/userData.js";
const userRoutes = Router();

userRoutes.get("/signin", (req, res) => {
  console.log("/signin");
  console.log("req.user: ", req.user);
  console.log("req.session: ", req.session);
  console.log("req.isAuthenticated(): ", req.isAuthenticated());
  console.log("Cookies: ", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);
  res.json({ message: "Signin" });
});

userRoutes.post(
  "/signin",
  passport.authenticate("local.signin", {    
    failureRedirect: "/signin",    
  }),
  (req, res) => {  
    console.log("isAuthenticated: ",req.isAuthenticated())    
    res.json(req.user);
  }
);

userRoutes.post("/signup", registrarUsuario);

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
