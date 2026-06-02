function adicionarLembrete(){

  const novo = {
    id: Date.now(),
    usuarioId: usuario.id,
    titulo: "Novo lembrete",
    descricao: "Edite este lembrete.",
    icone: "📌"
  };

  setLembretes([...lembretes, novo]);
}