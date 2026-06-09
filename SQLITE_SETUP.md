# Servidor Monetra com SQLite

## Configuração

O servidor foi migrado de JSON para **SQLite** para melhor desempenho e escalabilidade.

### Arquivos criados:

- **`backend/database.js`** - Wrapper de conexão SQLite com Promises
- **`backend/migrate.js`** - Script de migração dos dados JSON para SQLite
- **`backend/server.js`** - Servidor Express com endpoints SQLite
- **`backend/monetra.db`** - Banco de dados SQLite (criado automaticamente)

## Como usar

### 1. Instalar dependências (já feito)

```bash
npm install sqlite3
```

### 2. Migrar dados (já feito)

Se precisar recriar o banco de dados com os dados dos JSONs:

```bash
node backend/migrate.js
```

### 3. Iniciar o servidor

```bash
npm run server
```

O servidor estará disponível em: **http://localhost:3333**

## Endpoints da API

### Pessoas

- `GET /pessoas` - Listar todas as pessoas
- `GET /pessoas/:id` - Obter pessoa por ID
- `POST /pessoas` - Criar nova pessoa
- `PUT /pessoas/:id` - Atualizar pessoa
- `DELETE /pessoas/:id` - Deletar pessoa

### Lembretes

- `GET /lembretes` - Listar todos os lembretes
- `GET /lembretes/:usuarioId` - Lembretes de um usuário
- `POST /lembretes` - Criar novo lembrete
- `DELETE /lembretes/:id` - Deletar lembrete

### Investimentos

- `GET /investimentos` - Listar investimentos
- `GET /investimentos/:id` - Obter investimento por ID
- `POST /investimentos` - Criar novo investimento

### Despesas Fixas

- `GET /despesas-fixas` - Listar despesas fixas
- `GET /despesas-fixas/:usuarioId` - Despesas fixas de um usuário
- `POST /despesas-fixas` - Criar despesa fixa
- `DELETE /despesas-fixas/:id` - Deletar despesa fixa

### Despesas Extras

- `GET /despesas-extras` - Listar despesas extras
- `GET /despesas-extras/:usuarioId` - Despesas extras de um usuário
- `POST /despesas-extras` - Criar despesa extra
- `DELETE /despesas-extras/:id` - Deletar despesa extra

## Exemplos de requisições

### Criar uma pessoa

```bash
curl -X POST http://localhost:3333/pessoas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "idade": 30,
    "email": "joao@email.com",
    "salario": 5000,
    "telefone": "(11) 99999-9999",
    "idioma": "Português",
    "foto": "https://i.pravatar.cc/400",
    "senha": "senha123"
  }'
```

### Criar um lembrete

```bash
curl -X POST http://localhost:3333/lembretes \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": 1,
    "titulo": "Pagar fatura",
    "descricao": "Fatura do cartão",
    "icone": "💳"
  }'
```

### Criar uma despesa fixa

```bash
curl -X POST http://localhost:3333/despesas-fixas \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": 1,
    "nome": "Netflix",
    "valor": 49.90
  }'
```

## Schema do banco de dados

### Tabela: pessoas

```sql
CREATE TABLE pessoas (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  idade INTEGER,
  foto TEXT,
  salario REAL,
  idioma TEXT,
  telefone TEXT,
  email TEXT UNIQUE,
  senha TEXT
);
```

### Tabela: lembretes

```sql
CREATE TABLE lembretes (
  id INTEGER PRIMARY KEY,
  usuarioId INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  icone TEXT,
  FOREIGN KEY (usuarioId) REFERENCES pessoas(id)
);
```

### Tabela: investimentos

```sql
CREATE TABLE investimentos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  imagem TEXT,
  link TEXT
);
```

### Tabela: despesas_fixas

```sql
CREATE TABLE despesas_fixas (
  id INTEGER PRIMARY KEY,
  usuarioId INTEGER NOT NULL,
  nome TEXT NOT NULL,
  valor REAL NOT NULL,
  FOREIGN KEY (usuarioId) REFERENCES pessoas(id)
);
```

### Tabela: despesas_extras

```sql
CREATE TABLE despesas_extras (
  id INTEGER PRIMARY KEY,
  usuarioId INTEGER NOT NULL,
  nome TEXT NOT NULL,
  valor REAL NOT NULL,
  data TEXT,
  diaSemana TEXT,
  FOREIGN KEY (usuarioId) REFERENCES pessoas(id)
);
```

## Vantagens do SQLite

✅ Melhor desempenho em operações CRUD  
✅ Suporta relacionamentos (foreign keys)  
✅ Sem necessidade de servidor externo  
✅ Arquivo único (portável)  
✅ Segurança de dados com constraints  
✅ Fácil backup (copiar arquivo db)

## Notas

- O arquivo `monetra.db` é o banco de dados SQLite (não altere diretamente)
- Os dados dos JSONs foram preservados durante a migração
- Para respeitar os IDs originais, o script usa `INSERT OR IGNORE`
- Todos os endpoints suportam CORS
