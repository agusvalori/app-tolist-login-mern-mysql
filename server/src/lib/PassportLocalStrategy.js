import passport from "passport";
import { Strategy } from "passport-local";
import { pool } from "../data/db.js";
import { HelpersCrypt } from "./HelpersCrypt.js";



passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser");
  const rows = await pool.query("SELECT * FROM users WHERE id=?", [id]);
  done(null, rows[0]);
});


//Iniciar Sesion
passport.use(
  "local.signin",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req,username, password, done) => {
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
          return done(null, user);
        } else {
          console.log("Clave invalida");
          return done(null, false);
        }
      } else {
        console.log("Usuario invalido");
        return done(null, false);
      }
    }
  )
);

//Registrar usuario
passport.use(
  "local.signup",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { name, lastName, email, lastLogin, createdAt } = req.body;
      const user = {
        username,
        password: await HelpersCrypt.encryptPassword(password),
        name,
        lastName,
        email,
      };
      try {
        const [result] = await pool.query("INSERT INTO users SET ?", [user]);
        user.id = result.insertId;
        return done(null, user);
      } catch (error) {
        console.log("Error PassportLocalStrategy");
        return done(null, error);
      }
    }
  )
);