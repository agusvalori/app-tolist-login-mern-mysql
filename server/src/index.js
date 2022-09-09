import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

import passport from "passport";
import session from "express-session";
import MySQLStore from "express-mysql-session";

import "./lib/PassportLocalStrategy.js";

//Inicializaciones
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Session configuracion
app.use(
  session({
    secret: "lainez17",
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "ewqewq321",
      database: "tolist-mern",
      connectionLimit: 10,
    }),
  })
);

//Passport configuracion
app.use(passport.initialize());
app.use(passport.session());



//Routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(taskRoutes);

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor inciado en el puerto: ${PORT}`);
});
