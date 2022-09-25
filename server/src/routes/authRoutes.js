import { Router } from "express";
import passport from "passport";
import { crearUsuario } from "../data/userData.js";

const authRoutes = Router();

authRoutes.get("/signin", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

authRoutes.post(
  "/signin",
  passport.authenticate("local.signin", {
    failureRedirect: "/signin",
  }),
  (req, res) => {
    if (req.isAuthenticated()) {
      delete req.user.password;
      res.json({ ...req.user, isAuthenticated: true });
    }
  }
);

authRoutes.post("/signup", crearUsuario);

authRoutes.get("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) {
      return error;
    } else {
      res.redirect("/login");
    }
  });
});

export { authRoutes };
