import { Router } from "express";
import { pool } from "../data/db.js";

const homeRoutes = Router();

homeRoutes.get("/ping", async (req, res) => {
  const [rows]= await pool.query("SELECT * FROM tareas");
  console.log(rows)
  res.json('ping')
});

export {homeRoutes};
