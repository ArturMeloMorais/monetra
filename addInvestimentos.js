import { createInvestimento } from "./services/backend";

export function adicionarInvestimento(nome, descricao, imagem, link) {
  const novoInvestimento = {
    id: Date.now(),
    nome: nome,
    descricao: descricao,
    imagem: imagem,
    link: link,
  };

  createInvestimento({
    usuarioId: 1,
    nome,
    valor: 0,
  })
    .then((investimento) => {
      console.log("Investimento adicionado:", investimento || novoInvestimento);
    })
    .catch((error) => {
      console.error("Erro ao adicionar investimento:", error);
    });
}
