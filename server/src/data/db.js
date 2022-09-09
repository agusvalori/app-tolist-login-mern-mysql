import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "ewqewq321",
  database: "tolist-mern",
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    switch (err.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("La conexion con la base de datos fue cerrada");
        break;
      case "ECONNREFUSED":
        console.error(":a conexion con la base de datos fue rechazada");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("Cuantas conexiones tiene la base de datos");
        break;
      default:
        console.error(err);
        break;
    }
  }

  if (connection) {
    connection.release();
    console.log("La base de datos esta conectada");
  }
});

export { pool };
