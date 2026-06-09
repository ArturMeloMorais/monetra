import { createInvestimento } from "./services/api";

export async function adicionarInvestimento(nome, descricao, imagem, link) {
  const novoInvestimento = {
    nome,
    descricao,
    imagem,
    link,
  };

  try {
    const resultado = await createInvestimento(novoInvestimento);
    console.log("Investimento adicionado:", resultado);
    return resultado;
  } catch (error) {
    console.error("Erro ao adicionar investimento:", error);
    return null;
  }
}
