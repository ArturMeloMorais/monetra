const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "monetra.db");

// Remover banco de dados antigo se existir
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log("Banco de dados anterior removido");
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Erro ao criar banco de dados:", err);
    process.exit(1);
  }
  console.log("Banco de dados criado com sucesso");
});

// Criar tabelas
const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS pessoas (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    idade INTEGER,
    foto TEXT,
    salario REAL,
    idioma TEXT,
    telefone TEXT,
    email TEXT UNIQUE,
    senha TEXT
  );

  CREATE TABLE IF NOT EXISTS lembretes (
    id INTEGER PRIMARY KEY,
    usuarioId INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    icone TEXT,
    FOREIGN KEY (usuarioId) REFERENCES pessoas(id)
  );

  CREATE TABLE IF NOT EXISTS investimentos (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    imagem TEXT,
    link TEXT
  );

  CREATE TABLE IF NOT EXISTS despesas_fixas (
    id INTEGER PRIMARY KEY,
    usuarioId INTEGER NOT NULL,
    nome TEXT NOT NULL,
    valor REAL NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES pessoas(id)
  );

  CREATE TABLE IF NOT EXISTS despesas_extras (
    id INTEGER PRIMARY KEY,
    usuarioId INTEGER NOT NULL,
    nome TEXT NOT NULL,
    valor REAL NOT NULL,
    data TEXT,
    diaSemana TEXT,
    FOREIGN KEY (usuarioId) REFERENCES pessoas(id)
  );
`;

db.exec(createTablesSQL, (err) => {
  if (err) {
    console.error("Erro ao criar tabelas:", err);
    process.exit(1);
  }
  console.log("Tabelas criadas com sucesso");
  migrarDados();
});

function migrarDados() {
  try {
    // Ler db.json
    const dbPath = path.join(__dirname, "db.json");
    const dbJson = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // Migrar pessoas
    if (dbJson.pessoas && Array.isArray(dbJson.pessoas)) {
      console.log("Migrando pessoas...");
      dbJson.pessoas.forEach((pessoa) => {
        db.run(
          `INSERT OR IGNORE INTO pessoas (id, nome, idade, foto, salario, idioma, telefone, email, senha)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            pessoa.id,
            pessoa.nome,
            pessoa.idade,
            pessoa.foto,
            pessoa.salario,
            pessoa.idioma,
            pessoa.telefone,
            pessoa.email,
            pessoa.senha,
          ],
          function (err) {
            if (err) console.error("Erro ao inserir pessoa:", err);
          },
        );
      });
    }

    // Migrar lembretes
    if (dbJson.lembretes && Array.isArray(dbJson.lembretes)) {
      console.log("Migrando lembretes...");
      dbJson.lembretes.forEach((lembrete) => {
        db.run(
          `INSERT OR IGNORE INTO lembretes (id, usuarioId, titulo, descricao, icone)
           VALUES (?, ?, ?, ?, ?)`,
          [
            lembrete.id,
            lembrete.usuarioId,
            lembrete.titulo,
            lembrete.descricao,
            lembrete.icone,
          ],
          function (err) {
            if (err) console.error("Erro ao inserir lembrete:", err);
          },
        );
      });
    }

    // Migrar investimentos
    if (dbJson.investimentos && Array.isArray(dbJson.investimentos)) {
      console.log("Migrando investimentos...");
      dbJson.investimentos.forEach((investimento) => {
        db.run(
          `INSERT OR IGNORE INTO investimentos (id, nome, descricao, imagem, link)
           VALUES (?, ?, ?, ?, ?)`,
          [
            investimento.id,
            investimento.nome,
            investimento.descricao,
            investimento.imagem,
            investimento.link,
          ],
          function (err) {
            if (err) console.error("Erro ao inserir investimento:", err);
          },
        );
      });
    }

    // Migrar despesas
    if (dbJson.despesas && Array.isArray(dbJson.despesas)) {
      console.log("Migrando despesas...");
      dbJson.despesas.forEach((despesaUser) => {
        // Despesas fixas
        if (
          despesaUser.despesasFixas &&
          Array.isArray(despesaUser.despesasFixas)
        ) {
          despesaUser.despesasFixas.forEach((despesa) => {
            db.run(
              `INSERT OR IGNORE INTO despesas_fixas (id, usuarioId, nome, valor)
               VALUES (?, ?, ?, ?)`,
              [despesa.id, despesaUser.usuarioId, despesa.nome, despesa.valor],
              function (err) {
                if (err) console.error("Erro ao inserir despesa fixa:", err);
              },
            );
          });
        }

        // Despesas extras
        if (
          despesaUser.despesasExtras &&
          Array.isArray(despesaUser.despesasExtras)
        ) {
          despesaUser.despesasExtras.forEach((despesa) => {
            db.run(
              `INSERT OR IGNORE INTO despesas_extras (id, usuarioId, nome, valor, data, diaSemana)
               VALUES (?, ?, ?, ?, ?, ?)`,
              [
                despesa.id,
                despesaUser.usuarioId,
                despesa.nome,
                despesa.valor,
                despesa.data,
                despesa.diaSemana,
              ],
              function (err) {
                if (err) console.error("Erro ao inserir despesa extra:", err);
              },
            );
          });
        }
      });
    }

    setTimeout(() => {
      console.log("Migração concluída com sucesso!");
      db.close();
    }, 1000);
  } catch (error) {
    console.error("Erro ao migrar dados:", error);
    db.close();
    process.exit(1);
  }
}
