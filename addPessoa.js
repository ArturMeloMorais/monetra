import { createUsuario } from "./services/backend";

export function adicionarPessoa(
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
    id: Date.now(),
    nome: nome,
    idade: idade,
    foto: foto,
    salario: salario,
    idioma: idioma,
    telefone: telefone,
    email: email,
    senha: senha,
  };

  createUsuario({
    nome,
    idade,
    foto,
    salario,
    idioma,
    telefone,
    email,
    senha_hash: senha,
  })
    .then((usuario) => {
      console.log("Pessoa adicionada:", usuario || novaPessoa);
    })
    .catch((error) => {
      console.error("Erro ao adicionar pessoa:", error);
    });
}
