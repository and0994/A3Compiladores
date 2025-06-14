# A3Compiladores - Backend

Este projeto utiliza MongoDB como banco de dados. Siga as instruções abaixo para criar uma instância MongoDB usando Docker e preparar o banco de dados **corpFlow** com as collections necessárias.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/A3Compiladores.git
   ```
2. Acesse a pasta do backend:
   ```bash
   cd A3Compiladores/backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn
   ```

## Subindo o MongoDB com Docker

Execute o comando abaixo para criar e iniciar um container MongoDB chamado `mongo-corpflow`:

```bash
docker run -d \
  --name mongo-corpflow \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:latest
```

- O MongoDB ficará acessível em `mongodb://admin:admin123@localhost:27017/`
- Altere usuário e senha se desejar.

## Criando o banco de dados e as collections

1. Abra o terminal do MongoDB (Mongo Shell) no container:

   ```bash
   docker exec -it mongo-corpflow mongosh -u admin -p admin123
   ```

2. Execute o script abaixo para criar o banco `corpFlow` e as collections users, flows e tasks:

   ```javascript
   use corpFlow;

   db.createCollection("users");
   db.createCollection("flows");
   db.createCollection("tasks");

   // (Opcional) Insira um usuário inicial
   db.usuarios.insertOne({
     nome: "Administrador",
     email: "admin@admin.com",
     senha: "senha_hash", // Substitua pelo hash real
     role: "gerente"
   });

   show collections;
   ```

## Configuração de Ambiente

- Crie um arquivo `.env` na raiz do backend com as variáveis de ambiente necessárias, por exemplo:

   ```
   MONGO_URI=mongodb://admin:admin123@localhost:27017/corpFlow
   JWT_SECRET=sua_chave_secreta
   PORT=5000
   ```

- Certifique-se de que o backend está configurado para acessar o MongoDB em `mongodb://admin:admin123@localhost:27017/corpFlow`.

## Scripts Disponíveis

- `npm start` ou `yarn start`  
  Inicia o servidor backend.

- `npm run dev` ou `yarn dev`  
  Inicia o servidor em modo de desenvolvimento (com nodemon).

- `npm test` ou `yarn test`  
  Executa os testes automatizados.

## Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── package.json
├── .env
└── README.md
```

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- JWT para autenticação

## Observações

- O projeto utiliza autenticação JWT. O token é salvo no `localStorage` pelo frontend após o login.
- Para acessar funcionalidades de gerente ou colaborador, utilize um usuário com o respectivo papel.
- Ajuste as collections e campos conforme a necessidade do seu projeto.
- Usuarios do tipo gerente devem ser criados diretamente no banco de dados.


## Regras de criação de fluxos e tarefas
Ordem dos Blocos

O bloco FAZER deve sempre vir antes de VERIFICAR ou APROVAR.
O bloco VERIFICAR deve vir antes de APROVAR, se ambos existirem.

Obrigatoriedade

Todo fluxo deve conter pelo menos um bloco FAZER.

Ativação

Um fluxo só pode ser ativado se todos os blocos obrigatórios estiverem presentes e em ordem válida.
Permissões

Apenas usuários com papel de gerente podem criar, editar ou ativar fluxos.
Colaboradores só podem visualizar e executar tarefas dos fluxos relacionadas a eles.

Nomes e Unicidade

O nome do fluxo deve ser único para cada gerente.
