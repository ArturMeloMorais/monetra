
import pessoas from "./pessoas.json";

export function adicionarPessoa(nome, idade, foto, salario, idioma, telefone, email, senha){

  const novaPessoa = {
    id: Date.now(),
    nome: nome,
    idade: idade,
    foto: foto,
    salario: salario,
    idioma: idioma,
    telefone: telefone,
    email: email,
    senha: senha
  };

  pessoas.push(novaPessoa);

  console.log("Pessoa adicionada:", novaPessoa);
}

