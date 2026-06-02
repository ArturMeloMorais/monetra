const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3333;
const DB_PATH = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());

function readDatabase() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Erro ao ler o banco de dados:", error);
    return {
      pessoas: [],
      lembretes: [],
      investimentos: [],
      despesas: [],
    };
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Erro ao gravar o banco de dados:", error);
  }
}

function createCrudRoutes(collection) {
  const route = `/${collection}`;

  app.get(route, (req, res) => {
    const db = readDatabase();
    res.json(db[collection] || []);
  });

  app.post(route, (req, res) => {
    const db = readDatabase();
    const items = Array.isArray(db[collection]) ? db[collection] : [];
    const novoItem = { id: Date.now(), ...req.body };
    items.push(novoItem);
    db[collection] = items;
    writeDatabase(db);
    res.status(201).json(novoItem);
  });

  app.delete(`${route}/:id`, (req, res) => {
    const db = readDatabase();
    const id = Number(req.params.id);
    const items = Array.isArray(db[collection]) ? db[collection] : [];
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) {
      return res.status(404).json({ error: `${collection} não encontrado.` });
    }
    db[collection] = filtered;
    writeDatabase(db);
    res.status(204).send();
  });
}

createCrudRoutes("pessoas");
createCrudRoutes("lembretes");
createCrudRoutes("investimentos");
createCrudRoutes("despesas");

app.get("/", (req, res) => {
  res.json({ message: "API Monetra rodando" });
});

app.listen(PORT, () => {
  console.log(`Servidor API iniciado em http://localhost:${PORT}`);
});
