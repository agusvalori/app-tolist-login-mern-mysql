import passport from "passport";
import { Strategy } from "passport-local";
import { pool } from "../data/db.js";
import { HelpersCrypt } from "./HelpersCrypt.js";

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
        if (validPassword) {
          done(null, user);          
        } else {
          done(null, false);
        }
      } else {        
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
        console.error(error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id=?", [id]);
  done(null, rows[0]);
});
