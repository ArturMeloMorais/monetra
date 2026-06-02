import investimentos from "./assets/investimentos.json";

export function adicionarInvestimento(nome, descricao, imagem, link) {
  const novoInvestimento = {
    id: Date.now(),
    nome: nome,
    descricao: descricao,
    imagem: imagem,
    link: link,
  };

  investimentos.push(novoInvestimento);

  console.log("Investimento adicionado:", novoInvestimento);
}
