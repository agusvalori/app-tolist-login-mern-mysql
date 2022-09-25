import passport from "passport";
import { Strategy } from "passport-local";
import { pool } from "../data/db.js";
import { obtenerUsuarioXUsername } from "../data/userData.js";
import { HelpersCrypt } from "./HelpersCrypt.js";

//Iniciar Sesion
passport.use(
  "local.signin",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: false,
    },
    async (username, password, done) => {
      console.log("PassportStrategy");

      const [rows] = await pool.query("SELECT * FROM users WHERE username=?", [
        username,
      ]);

      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await HelpersCrypt.comparePassword(
          password,
          user.password
        );

        if (validPassword === true) {
          console.log("Usuario correcto");
          done(null, user);
        } else {
          console.log("Clave invalida");
          done(null, false);
        }
      } else {
        console.log("Usuario invalido");
        done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  console.log("deserializeUser");
  const rows = await pool.query("SELECT * FROM users WHERE id=?", [user.id]);
  req.session.user = rows[0];
  done(null, rows[0]);
});
