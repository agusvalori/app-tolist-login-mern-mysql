import { Router } from "express";
import { pool } from "../data/db.js";

const router = Router();

router.get("/ping", async (req, res) => {
  const [rows]= await pool.query("SELECT * FROM tareas");
  console.log(rows)
  res.json('ping')
});

export default router;
