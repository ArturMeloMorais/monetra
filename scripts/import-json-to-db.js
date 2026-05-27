const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "monetra",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function importAll() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // ========= USUÁRIOS =========
    const pessoasPath = path.join(process.cwd(), "pessoas.json");
    if (fs.existsSync(pessoasPath)) {
      const pessoas = JSON.parse(fs.readFileSync(pessoasPath, "utf8"));
      const valores = pessoas.map((p) => [
        p.nome || null,
        p.idade || null,
        p.foto || null,
        p.salario || 0,
        p.idioma || null,
        p.telefone || null,
        p.email || null,
        p.senha || null,
      ]);
      if (valores.length) {
        await connection.query(
          `INSERT INTO usuarios (nome,idade,foto,salario,idioma,telefone,email,senha_hash)
           VALUES ?
           ON DUPLICATE KEY UPDATE
             nome=VALUES(nome), idade=VALUES(idade), foto=VALUES(foto), salario=VALUES(salario), idioma=VALUES(idioma), telefone=VALUES(telefone), senha_hash=VALUES(senha_hash)`,
          [valores],
        );
      }
    }

    // ========= DESPESAS =========
    const despesasPath = path.join(process.cwd(), "despesas.json");
    if (fs.existsSync(despesasPath)) {
      const despesas = JSON.parse(fs.readFileSync(despesasPath, "utf8"));
      for (const bloco of despesas) {
        const usuarioId = bloco.usuarioId;
        // remove despesas atuais do usuário para evitar duplicação
        await connection.query("DELETE FROM despesas WHERE usuario_id = ?", [
          usuarioId,
        ]);

        const rows = [];
        (bloco.despesasFixas || []).forEach((d) => {
          rows.push([
            usuarioId,
            "FIXA",
            d.nome || null,
            d.valor || 0,
            null,
            null,
          ]);
        });
        (bloco.despesasExtras || []).forEach((d) => {
          const data = d.data ? d.data : null; // espera formato YYYY-MM-DD
          rows.push([
            usuarioId,
            "EXTRA",
            d.nome || null,
            d.valor || 0,
            data,
            d.diaSemana || null,
          ]);
        });

        if (rows.length) {
          await connection.query(
            "INSERT INTO despesas (usuario_id,tipo,nome,valor,data_despesa,dia_semana) VALUES ?",
            [rows],
          );
        }
      }
    }

    // ========= RÓTULOS / LEMBRETES =========
    const lembretesPath = path.join(process.cwd(), "lembretes.json");
    if (fs.existsSync(lembretesPath)) {
      const lembretes = JSON.parse(fs.readFileSync(lembretesPath, "utf8"));
      // Para simplicidade, remover todos e inserir os do JSON
      await connection.query("DELETE FROM rotulos");
      if (lembretes.length) {
        const rows = lembretes.map((l) => [
          l.usuarioId || null,
          l.titulo || null,
          l.descricao || null,
          l.icone || null,
        ]);
        await connection.query(
          "INSERT INTO rotulos (usuario_id,titulo,descricao,icone) VALUES ?",
          [rows],
        );
      }
    }

    // ========= INVESTIMENTOS =========
    const investimentosPath = path.join(process.cwd(), "investimentos.json");
    if (fs.existsSync(investimentosPath)) {
      const investimentos = JSON.parse(
        fs.readFileSync(investimentosPath, "utf8"),
      );
      // Inserir vinculando ao usuário 1 por padrão (ajuste se quiser outro comportamento)
      const rows = investimentos.map((i) => [1, i.nome || null, 0]);
      if (rows.length) {
        await connection.query(
          "INSERT INTO investimentos (usuario_id,nome,valor) VALUES ?",
          [rows],
        );
      }
    }

    await connection.commit();
    console.log("Importação concluída com sucesso.");
  } catch (err) {
    await connection.rollback();
    console.error("Erro durante importação:", err.message || err);
    process.exitCode = 1;
  } finally {
    connection.release();
    await pool.end();
  }
}

importAll();
