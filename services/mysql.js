import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "monetra",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testConnection() {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.query("SELECT 1 + 1 AS result");
    return rows;
  } finally {
    connection.release();
  }
}
