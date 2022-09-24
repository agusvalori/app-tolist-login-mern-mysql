import { Router } from "express";
import passport from "passport";
import {
  obtenerUsuarioXEmail,
  obtenerUsuarioXUsername,
} from "../data/userData.js";
const userRoutes = Router();

userRoutes.get("/signin", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

userRoutes.post(
  "/signin",
  passport.authenticate("local.signin", {
    failureRedirect: "/signin",
  }),
  (req, res) => {
    if (req.isAuthenticated()) {            
      req.flash('users',req.user)
      res.json({ ...req.user, isAuthenticated: true });
    }
  }
);

userRoutes.get("/signup", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

userRoutes.post(
  "/signup",
  passport.authenticate("local.signup", {
    failureRedirect: "/signup",
    failureMessage: true,
  }),
  (req, res, next) => {
    console.log("req.isAuthenticated(): ", req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
);

userRoutes.get("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) {
      return (error);
    } else {
      res.redirect("/login");
    }
  });
});

userRoutes.get("/user/username/:username", obtenerUsuarioXUsername);
userRoutes.get("/user/email/:email", obtenerUsuarioXEmail);

export { userRoutes };
