import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getPessoas } from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);
  const [erro, setErro] = useState("");
  const [pessoas, setPessoas] = useState([]);
  const [carregandoPessoas, setCarregandoPessoas] = useState(true);

  useEffect(() => {
    async function carregarPessoas() {
      try {
        const dados = await getPessoas();
        setPessoas(dados);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setCarregandoPessoas(false);
      }
    }
    carregarPessoas();
  }, []);

  function validarLogin() {
    setErro("");
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    const usuarioEncontrado = pessoas.find(
      (p) => p.email.trim().toLowerCase() === normalizedEmail,
    );
    if (!usuarioEncontrado) {
      setErro("Usuário não encontrado.");
      return;
    }
    if (usuarioEncontrado.senha !== senha) {
      setErro("Senha incorreta.");
      return;
    }
    navigation.navigate("Home", { usuario: usuarioEncontrado });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.topDecor} />

      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.titulo}>Bem-vindo ao Monetra</Text>

        <Text style={styles.subtitulo}>
          Seu controle financeiro inteligente
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="seuemail@exemplo.com"
            placeholderTextColor="#9CA3AF"
            style={[styles.input, emailFocused && styles.inputFocused]}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            style={[styles.input, senhaFocused && styles.inputFocused]}
            value={senha}
            onChangeText={setSenha}
            onFocus={() => setSenhaFocused(true)}
            onBlur={() => setSenhaFocused(false)}
          />

          {erro ? (
            <View style={styles.erroBox}>
              <Text style={styles.erroTexto}>⚠ {erro}</Text>
            </View>
          ) : null}
          {carregandoPessoas ? (
            <View style={styles.loaderBox}>
              <Text style={styles.loaderTexto}>Carregando usuários...</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.botao, carregandoPessoas && styles.botaoDisabled]}
            onPress={validarLogin}
            activeOpacity={0.85}
            disabled={carregandoPessoas}
          >
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.rodape}>
            <Text style={styles.rodapeTexto}>
              Versão 1.0.0 · Monetra © 2025
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1923" },

  topDecor: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#1c7c43",
    opacity: 0.25,
  },
  inner: { flex: 1, justifyContent: "center", paddingHorizontal: 28 },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 80, height: 80, borderRadius: 20 },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#F9FAFB",
    textAlign: "center",
    letterSpacing: 0.4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 36,
  },
  form: {
    backgroundColor: "#1A2535",
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0F1923",
    color: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: "#2D3748",
    marginBottom: 18,
  },
  inputFocused: { borderColor: "#1c7c43" },
  erroBox: {
    backgroundColor: "#3B1A1A",
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#EF4444",
  },
  erroTexto: { color: "#FCA5A5", fontSize: 13 },
  loaderBox: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    alignItems: "center",
  },
  loaderTexto: {
    color: "#9CA3AF",
    fontSize: 13,
  },
  botao: {
    backgroundColor: "#1c7c43",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 4,
    elevation: 6,
  },
  botaoDisabled: {
    opacity: 0.65,
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  rodape: { marginTop: 20, alignItems: "center" },
  rodapeTexto: { color: "#374151", fontSize: 11 },
});
