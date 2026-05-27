import fs from "fs";
import path from "path";
import { db } from "../services/mysql.js";

async function initDatabase() {
  const filePath = path.join(process.cwd(), "sql", "monetra.sql");
  const sql = fs.readFileSync(filePath, "utf8");

  const statements = sql
    .split(/;\s*\n/)
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  const connection = await db.getConnection();
  try {
    for (const statement of statements) {
      await connection.query(statement);
    }
    console.log("Banco de dados inicializado com sucesso.");
  } catch (error) {
    console.error("Erro ao inicializar o banco:", error.message);
    process.exitCode = 1;
  } finally {
    connection.release();
  }
}

initDatabase();
