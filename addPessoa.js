import pessoas from "./pessoas.json";
import * as FileSystem from "expo-file-system";

export function adicionarPessoa(nome, idade, foto, salario, idioma, telefone, email) {
  const novaPessoa = {
    id: Date.now(),
    nome: nome,
    idade: idade,
    foto: foto,
    salario: salario,
    idioma: idioma,
    telefone: telefone,
    email: email
  };

  pessoas.push(novaPessoa);

  FileSystem.writeAsStringAsync(
    FileSystem.documentDirectory + "pessoas.json",
    JSON.stringify(pessoas)
  );
}