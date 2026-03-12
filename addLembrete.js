import lembretes from "./lembretes.json";

export function adicionarLembrete(titulo, descricao, icone){

    const novoLembrete = {
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        icone: icone
    };

    lembretes.push(novoLembrete);

    console.log("Lembrete adicionado:", novoLembrete);
}