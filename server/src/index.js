import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./config.js";

import passport from "passport";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import flash from "connect-flash";

import "./lib/PassportLocalStrategy.js";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
import { homeRoutes } from "./routes/homeRoutes.js";
import { taskRoutes } from "./routes/taskRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

//Inicializaciones
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(cookieParser('keyboard cat'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  session({
    secret: "mi secretro vendo descartables",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 },
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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use(authRoutes);
app.use(homeRoutes);
app.use(taskRoutes);
app.use(userRoutes);

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor inciado en el puerto: ${PORT}`);
});
