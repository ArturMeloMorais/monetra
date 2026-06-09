# Guia de Testes - Servidor Monetra SQLite

## 1️⃣ Iniciar o Servidor

```bash
npm run server
```

O servidor rodará em: **http://localhost:3333**

Você verá:

```
Servidor API iniciado em http://localhost:3333
Conectado ao SQLite
```

---

## 2️⃣ Testar com PowerShell (Windows)

### Obter todas as pessoas

```powershell
Invoke-WebRequest -Uri "http://localhost:3333/pessoas" -Method GET | Select-Object -ExpandProperty Content
```

### Criar uma nova pessoa

```powershell
$body = @{
    nome = "João Silva"
    idade = 30
    email = "joao@email.com"
    salario = 5000
    telefone = "(11) 99999-9999"
    idioma = "Português"
    foto = "https://i.pravatar.cc/400"
    senha = "senha123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3333/pessoas" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### Criar um lembrete

```powershell
$body = @{
    usuarioId = 1
    titulo = "Pagar conta"
    descricao = "Fatura do cartão vence amanhã"
    icone = "💳"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3333/lembretes" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### Criar uma despesa fixa

```powershell
$body = @{
    usuarioId = 1
    nome = "Netflix"
    valor = 49.90
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3333/despesas-fixas" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### Criar uma despesa extra

```powershell
$body = @{
    usuarioId = 1
    nome = "Restaurante"
    valor = 85.50
    data = "2026-06-09"
    diaSemana = "Terça"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3333/despesas-extras" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### Obter lembretes de um usuário

```powershell
Invoke-WebRequest -Uri "http://localhost:3333/lembretes/1" -Method GET | Select-Object -ExpandProperty Content
```

### Obter despesas fixas de um usuário

```powershell
Invoke-WebRequest -Uri "http://localhost:3333/despesas-fixas/1" -Method GET | Select-Object -ExpandProperty Content
```

### Deletar um lembrete

```powershell
Invoke-WebRequest -Uri "http://localhost:3333/lembretes/1" -Method DELETE
```

---

## 3️⃣ Testar com cURL (Git Bash / WSL)

### Obter todas as pessoas

```bash
curl http://localhost:3333/pessoas
```

### Criar uma pessoa

```bash
curl -X POST http://localhost:3333/pessoas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "idade": 28,
    "email": "maria@email.com",
    "salario": 6000,
    "telefone": "(21) 98888-7777",
    "idioma": "Português/Inglês",
    "foto": "https://i.pravatar.cc/401",
    "senha": "pass123"
  }'
```

### Criar um investimento

```bash
curl -X POST http://localhost:3333/investimentos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tesouro Direto",
    "descricao": "Investimento em títulos públicos",
    "imagem": "https://example.com/img.png",
    "link": "https://www.tesouro.gov.br"
  }'
```

---

## 4️⃣ Testar com Postman

1. **Abrir Postman** (ou usar online: https://www.postman.com/downloads/)
2. **Criar uma nova requisição**
3. **Selecionar método**: GET/POST/DELETE
4. **URL**: `http://localhost:3333/pessoas` (ou outro endpoint)
5. **Headers**: `Content-Type: application/json`
6. **Body (JSON)** para POST/PUT:

```json
{
  "nome": "Pedro Costa",
  "idade": 35,
  "email": "pedro@email.com",
  "salario": 7000,
  "telefone": "(31) 97777-6666",
  "idioma": "Português",
  "foto": "https://i.pravatar.cc/402",
  "senha": "senha456"
}
```

---

## 5️⃣ Verificar Dados no SQLite

### Ver o banco diretamente

```bash
# Se tem sqlite3 instalado:
sqlite3 backend/monetra.db

# Dentro do sqlite3:
SELECT * FROM pessoas;
SELECT * FROM lembretes;
SELECT * FROM despesas_fixas;
SELECT * FROM despesas_extras;
```

### Ou usar VS Code Extension

- Instale: **SQLite** (by alexcvzz)
- Clique em `backend/monetra.db` no Explorer
- Visualize as tabelas e dados

---

## 6️⃣ Fluxo de Teste Completo

```powershell
# 1. Obter pessoas existentes
Invoke-WebRequest http://localhost:3333/pessoas | Select-Object -ExpandProperty Content

# 2. Criar uma nova pessoa (anote o ID retornado)
$body = '{"nome":"Teste User","idade":25,"email":"teste@email.com","salario":3000,"telefone":"(11) 91234-5678","idioma":"Português","foto":"https://i.pravatar.cc/150","senha":"teste123"}' | ConvertTo-Json
$response = Invoke-WebRequest -Uri http://localhost:3333/pessoas -Method POST -Body $body -ContentType "application/json"
$pessoa = $response.Content | ConvertFrom-Json
$usuarioId = $pessoa.id

# 3. Criar um lembrete para essa pessoa
$body = '{"usuarioId":' + $usuarioId + ',"titulo":"Lembrete Teste","descricao":"Descrição do teste","icone":"📝"}' | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:3333/lembretes -Method POST -Body $body -ContentType "application/json" | Select-Object -ExpandProperty Content

# 4. Verificar os lembretes
Invoke-WebRequest http://localhost:3333/lembretes/$usuarioId | Select-Object -ExpandProperty Content

# 5. Criar despesa fixa
$body = '{"usuarioId":' + $usuarioId + ',"nome":"Despesa Fixa","valor":100}' | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:3333/despesas-fixas -Method POST -Body $body -ContentType "application/json" | Select-Object -ExpandProperty Content

# 6. Verificar despesas
Invoke-WebRequest http://localhost:3333/despesas-fixas/$usuarioId | Select-Object -ExpandProperty Content
```

---

## 7️⃣ Resposta Esperada

### Criar Pessoa (201 Created)

```json
{
  "id": 4,
  "nome": "João Silva",
  "idade": 30,
  "email": "joao@email.com",
  "salario": 5000,
  "telefone": "(11) 99999-9999",
  "idioma": "Português",
  "foto": "https://i.pravatar.cc/400",
  "senha": "senha123"
}
```

### Obter Pessoas (200 OK)

```json
[
  {
    "id": 1,
    "nome": "Lucas",
    "idade": 24,
    ...
  },
  {
    "id": 2,
    "nome": "Mariana",
    ...
  }
]
```

### Deletar (204 No Content)

```
(sem body, só status 204)
```

---

## ⚠️ Troubleshooting

### Erro: "Não é possível conectar"

- Verifique se o servidor está rodando: `npm run server`
- Verifique a porta: está em `http://localhost:3333`?

### Erro: "ENOENT: db.json não encontrado"

- Isso é normal! Execute a migração: `node backend/migrate.js`
- Ele criará o banco SQLite (`monetra.db`)

### Erro: "Email já existe"

- Há constraint UNIQUE na coluna email
- Use um email diferente ao testar

### Banco vazio

- Rode: `node backend/migrate.js` para popular dados iniciais

---

## ✅ Checklist de Testes

- [ ] Servidor inicia sem erros
- [ ] GET /pessoas retorna usuários
- [ ] POST /pessoas cria novo usuário
- [ ] GET /lembretes retorna lembretes
- [ ] POST /lembretes cria novo lembrete
- [ ] GET /despesas-fixas retorna despesas
- [ ] POST /despesas-fixas cria despesa
- [ ] DELETE remove dados corretamente
- [ ] Dados persistem após reiniciar servidor
- [ ] SQLite está sendo usado (não JSON)
