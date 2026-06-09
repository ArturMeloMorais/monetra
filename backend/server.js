const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// ============ PESSOAS ============
app.get("/pessoas", async (req, res) => {
  try {
    const pessoas = await db.all("SELECT * FROM pessoas");
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/pessoas/:id", async (req, res) => {
  try {
    const pessoa = await db.get("SELECT * FROM pessoas WHERE id = ?", [
      req.params.id,
    ]);
    if (pessoa) {
      res.json(pessoa);
    } else {
      res.status(404).json({ error: "Pessoa não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/pessoas", async (req, res) => {
  try {
    const { nome, idade, foto, salario, idioma, telefone, email, senha } =
      req.body;
    const result = await db.run(
      `INSERT INTO pessoas (nome, idade, foto, salario, idioma, telefone, email, senha)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, idade, foto, salario, idioma, telefone, email, senha],
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/pessoas/:id", async (req, res) => {
  try {
    const { nome, idade, foto, salario, idioma, telefone, email, senha } =
      req.body;
    await db.run(
      `UPDATE pessoas SET nome = ?, idade = ?, foto = ?, salario = ?, idioma = ?, 
       telefone = ?, email = ?, senha = ? WHERE id = ?`,
      [
        nome,
        idade,
        foto,
        salario,
        idioma,
        telefone,
        email,
        senha,
        req.params.id,
      ],
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/pessoas/:id", async (req, res) => {
  try {
    await db.run("DELETE FROM pessoas WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ LEMBRETES ============
app.get("/lembretes", async (req, res) => {
  try {
    const lembretes = await db.all("SELECT * FROM lembretes");
    res.json(lembretes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/lembretes/:usuarioId", async (req, res) => {
  try {
    const lembretes = await db.all(
      "SELECT * FROM lembretes WHERE usuarioId = ?",
      [req.params.usuarioId],
    );
    res.json(lembretes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/lembretes", async (req, res) => {
  try {
    const { usuarioId, titulo, descricao, icone } = req.body;
    const result = await db.run(
      `INSERT INTO lembretes (usuarioId, titulo, descricao, icone)
       VALUES (?, ?, ?, ?)`,
      [usuarioId, titulo, descricao, icone],
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/lembretes/:id", async (req, res) => {
  try {
    await db.run("DELETE FROM lembretes WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ INVESTIMENTOS ============
app.get("/investimentos", async (req, res) => {
  try {
    const investimentos = await db.all("SELECT * FROM investimentos");
    res.json(investimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/investimentos/:id", async (req, res) => {
  try {
    const investimento = await db.get(
      "SELECT * FROM investimentos WHERE id = ?",
      [req.params.id],
    );
    if (investimento) {
      res.json(investimento);
    } else {
      res.status(404).json({ error: "Investimento não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/investimentos", async (req, res) => {
  try {
    const { nome, descricao, imagem, link } = req.body;
    const result = await db.run(
      `INSERT INTO investimentos (nome, descricao, imagem, link)
       VALUES (?, ?, ?, ?)`,
      [nome, descricao, imagem, link],
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ DESPESAS FIXAS ============
app.get("/despesas-fixas", async (req, res) => {
  try {
    const despesas = await db.all("SELECT * FROM despesas_fixas");
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/despesas-fixas/:usuarioId", async (req, res) => {
  try {
    const despesas = await db.all(
      "SELECT * FROM despesas_fixas WHERE usuarioId = ?",
      [req.params.usuarioId],
    );
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/despesas-fixas", async (req, res) => {
  try {
    const { usuarioId, nome, valor } = req.body;
    const result = await db.run(
      `INSERT INTO despesas_fixas (usuarioId, nome, valor)
       VALUES (?, ?, ?)`,
      [usuarioId, nome, valor],
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/despesas-fixas/:id", async (req, res) => {
  try {
    await db.run("DELETE FROM despesas_fixas WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ DESPESAS EXTRAS ============
app.get("/despesas-extras", async (req, res) => {
  try {
    const despesas = await db.all("SELECT * FROM despesas_extras");
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/despesas-extras/:usuarioId", async (req, res) => {
  try {
    const despesas = await db.all(
      "SELECT * FROM despesas_extras WHERE usuarioId = ?",
      [req.params.usuarioId],
    );
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/despesas-extras", async (req, res) => {
  try {
    const { usuarioId, nome, valor, data, diaSemana } = req.body;
    const result = await db.run(
      `INSERT INTO despesas_extras (usuarioId, nome, valor, data, diaSemana)
       VALUES (?, ?, ?, ?, ?)`,
      [usuarioId, nome, valor, data, diaSemana],
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/despesas-extras/:id", async (req, res) => {
  try {
    await db.run("DELETE FROM despesas_extras WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ROTA DE STATUS ============
app.get("/", (req, res) => {
  res.json({ message: "API Monetra rodando com SQLite" });
});

app.listen(PORT, () => {
  console.log(`Servidor API iniciado em http://localhost:${PORT}`);
});
