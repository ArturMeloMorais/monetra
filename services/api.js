import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

const dbApi = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTopCoins = async () => {
  try {
    // Busca as 10 principais criptos em USD
    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da CoinGecko:", error);
    return [];
  }
};

export const getPessoas = async () => {
  try {
    const response = await dbApi.get("/pessoas");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar pessoas:", error);
    return [];
  }
};

export const createPessoa = async (pessoa) => {
  try {
    const response = await dbApi.post("/pessoas", pessoa);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pessoa:", error);
    return null;
  }
};

export const deletePessoa = async (id) => {
  try {
    await dbApi.delete(`/pessoas/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
    return false;
  }
};

export const getLembretes = async () => {
  try {
    const response = await dbApi.get("/lembretes");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar lembretes:", error);
    return [];
  }
};

export const createLembrete = async (lembrete) => {
  try {
    const response = await dbApi.post("/lembretes", lembrete);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar lembrete:", error);
    return null;
  }
};

export const deleteLembrete = async (id) => {
  try {
    await dbApi.delete(`/lembretes/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir lembrete:", error);
    return false;
  }
};

export const getInvestimentos = async () => {
  try {
    const response = await dbApi.get("/investimentos");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar investimentos:", error);
    return [];
  }
};

export const createInvestimento = async (investimento) => {
  try {
    const response = await dbApi.post("/investimentos", investimento);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar investimento:", error);
    return null;
  }
};

export const deleteInvestimento = async (id) => {
  try {
    await dbApi.delete(`/investimentos/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir investimento:", error);
    return false;
  }
};

export const getDespesasFixas = async (usuarioId) => {
  try {
    const response = await dbApi.get(`/despesas-fixas/${usuarioId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar despesas fixas:", error);
    return [];
  }
};

export const createDespesaFixa = async (despesa) => {
  try {
    const response = await dbApi.post("/despesas-fixas", despesa);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar despesa fixa:", error);
    return null;
  }
};

export const deleteDespesaFixa = async (id) => {
  try {
    await dbApi.delete(`/despesas-fixas/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir despesa fixa:", error);
    return false;
  }
};

export const getDespesasExtras = async (usuarioId) => {
  try {
    const response = await dbApi.get(`/despesas-extras/${usuarioId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar despesas extras:", error);
    return [];
  }
};

export const createDespesaExtra = async (despesa) => {
  try {
    const response = await dbApi.post("/despesas-extras", despesa);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar despesa extra:", error);
    return null;
  }
};

export const deleteDespesaExtra = async (id) => {
  try {
    await dbApi.delete(`/despesas-extras/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao excluir despesa extra:", error);
    return false;
  }
};
