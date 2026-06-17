# meu-app-financas README.md

# Meu App Finanças

Este projeto é um aplicativo de finanças desenvolvido com React Native e Node.js. Ele permite que os usuários gerenciem suas finanças de forma eficiente, com uma interface amigável e funcionalidades robustas.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
meu-app-financas
├── src
│   ├── App.tsx               # Ponto de entrada principal do aplicativo React Native
│   ├── components
│   │   └── index.tsx         # Componentes reutilizáveis do aplicativo
│   ├── screens
│   │   └── Home.tsx          # Tela inicial do aplicativo
│   └── navigation
│       └── index.tsx         # Estrutura de navegação do aplicativo
├── backend
│   ├── server.js             # Ponto de entrada do servidor backend
│   ├── routes
│   │   └── index.js          # Definição das rotas da API
│   └── db
│       └── init.sql          # Comandos SQL para inicialização do banco de dados
├── scripts
│   └── reset-project.js       # Script para redefinir o estado do projeto
├── package.json               # Configuração do npm e dependências do projeto
├── Dockerfile                 # Instruções para construir a imagem Docker do aplicativo
├── tsconfig.json             # Configuração do TypeScript
└── README.md                 # Documentação do projeto
```

## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd meu-app-financas
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o aplicativo:

   ```bash
   npm start
   ```

## Uso

Após iniciar o aplicativo, você pode acessá-lo em seu dispositivo ou em um emulador. A tela inicial apresenta uma visão geral das suas finanças, permitindo que você adicione, edite e visualize suas transações.

## Docker

Para construir e executar o aplicativo usando Docker, siga os passos abaixo:

1. Certifique-se de ter o Docker instalado em sua máquina.
2. Construa a imagem Docker:

   ```bash
   docker build -t meu-app-financas .
   ```

3. Execute o contêiner:

   ```bash
   docker run -p 3000:3000 meu-app-financas
   ```

O aplicativo estará disponível em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.