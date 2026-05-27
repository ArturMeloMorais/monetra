const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "monetra",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const [rows] = await pool.query(
      "SELECT id, nome, idade, foto, salario, idioma, telefone, email, senha_hash FROM usuarios WHERE email = ?",
      [email],
    );

    const usuario = rows[0];
    if (!usuario) {
      return res.status(401).json({ error: "Usuário não cadastrado." });
    }

    if (usuario.senha_hash !== senha) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const { senha_hash, ...usuarioSemSenha } = usuario;
    res.json(usuarioSemSenha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao autenticar." });
  }
});

app.get("/despesas/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id, tipo, nome, valor, data_despesa, dia_semana FROM despesas WHERE usuario_id = ?",
      [usuarioId],
    );

    const despesasFixas = rows
      .filter((row) => row.tipo === "FIXA")
      .map((row) => ({
        id: row.id,
        nome: row.nome,
        valor: Number(row.valor),
      }));

    const despesasExtras = rows
      .filter((row) => row.tipo === "EXTRA")
      .map((row) => ({
        id: row.id,
        nome: row.nome,
        valor: Number(row.valor),
        data: row.data_despesa
          ? row.data_despesa.toISOString().slice(0, 10)
          : null,
        diaSemana: row.dia_semana,
      }));

    res.json({ despesasFixas, despesasExtras });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar despesas." });
  }
});

app.get("/lembretes/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id, usuario_id AS usuarioId, titulo, descricao, icone FROM rotulos WHERE usuario_id = ?",
      [usuarioId],
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar lembretes." });
  }
});

app.get("/investimentos/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id, usuario_id AS usuarioId, nome, valor FROM investimentos WHERE usuario_id = ?",
      [usuarioId],
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar investimentos." });
  }
});

app.post("/usuarios", async (req, res) => {
  const { nome, idade, foto, salario, idioma, telefone, email, senha_hash } =
    req.body;
  if (!nome || !email || !senha_hash) {
    return res
      .status(400)
      .json({ error: "nome, email e senha_hash são obrigatórios." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nome, idade, foto, salario, idioma, telefone, email, senha_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nome,
        idade || null,
        foto || null,
        salario || 0,
        idioma || null,
        telefone || null,
        email,
        senha_hash,
      ],
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        nome,
        idade,
        foto,
        salario,
        idioma,
        telefone,
        email,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao criar usuário." });
  }
});

app.post("/investimentos", async (req, res) => {
  const { usuarioId, nome, valor } = req.body;
  if (!usuarioId || !nome) {
    return res
      .status(400)
      .json({ error: "usuarioId e nome são obrigatórios." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO investimentos (usuario_id, nome, valor) VALUES (?, ?, ?)",
      [usuarioId, nome, valor || 0],
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        usuarioId,
        nome,
        valor: Number(valor || 0),
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao criar investimento." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
