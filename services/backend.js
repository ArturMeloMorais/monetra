import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

const api = axios.create({ baseURL });

export async function loginUsuario(email, senha) {
  try {
    const response = await api.post("/login", { email, senha });
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao tentar logar:",
      error?.response?.data || error.message,
    );
    return null;
  }
}

export async function getDespesasByUsuario(usuarioId) {
  try {
    const response = await api.get(`/despesas/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar despesas:",
      error?.response?.data || error.message,
    );
    return { despesasFixas: [], despesasExtras: [] };
  }
}

export async function getLembretesByUsuario(usuarioId) {
  try {
    const response = await api.get(`/lembretes/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar lembretes:",
      error?.response?.data || error.message,
    );
    return [];
  }
}

export async function getInvestimentosByUsuario(usuarioId) {
  try {
    const response = await api.get(`/investimentos/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar investimentos:",
      error?.response?.data || error.message,
    );
    return [];
  }
}

export async function createUsuario(usuario) {
  try {
    const response = await api.post("/usuarios", usuario);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao criar usuário:",
      error?.response?.data || error.message,
    );
    return null;
  }
}

export async function createInvestimento(investimento) {
  try {
    const response = await api.post("/investimentos", investimento);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao criar investimento:",
      error?.response?.data || error.message,
    );
    return null;
  }
}
