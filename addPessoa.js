import { createPessoa } from "./services/api";

export async function adicionarPessoa(
  nome,
  idade,
  foto,
  salario,
  idioma,
  telefone,
  email,
  senha,
) {
  const novaPessoa = {
    nome,
    idade,
    foto,
    salario,
    idioma,
    telefone,
    email,
    senha,
  };

  try {
    const resultado = await createPessoa(novaPessoa);
    console.log("Pessoa adicionada:", resultado);
    return resultado;
  } catch (error) {
    console.error("Erro ao adicionar pessoa:", error);
    return null;
  }
}
