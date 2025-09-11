
---

## **README do Backend** (`backend/README.md`)  

```markdown
# Backend - API Dashboard

API backend desenvolvida com **Node.js + Express + TypeScript** para fornecer dados para o dashboard. A API se conecta a um banco **PostgreSQL** e utiliza **Sequelize** como ORM, com sincronização automática de modelos para popular o banco.

A aplicação já está rodando em um servidor e pode ser acessada [clicando aqui](https://inspecoes-frontend.vercel.app/)

---

## Tecnologias utilizadas

- **Node.js + Express**
- **TypeScript**
- **Sequelize ORM** (configurado para criar e popular tabelas automaticamente)
- **PostgreSQL** (banco de dados hospedado no Neon)
- Estrutura de camadas:
  - **Controller**: recebe requisições HTTP
  - **Service**: lógica de negócio
  - **Repository**: acesso ao banco de dados
- Tipagem completa com TypeScript

---

## Requisitos

- Node.js v18+
- npm ou yarn
- PostgreSQL (banco já hospedado no Neon)
- Git

---

## Instalação

1. Clone o repositório e entre na pasta do backend:

```bash
git clone https://github.com/Carlos-Teixeira-Jr/inspecoes-frontend.git
cd backend


npm install
# ou
yarn install


---

## **Backend (`backend/README.md`) – Seção de Variáveis de Ambiente**

```markdown
## Variáveis de ambiente (configuração local)

Para rodar o backend localmente, crie um arquivo `.env` na raiz do projeto e configure os dados de conexão com o banco.

### Passos:

1. Crie o arquivo `.env`:

```bash
touch .env

# Configuração do banco de dados PostgreSQL
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
DB_HOST=host_do_DB_local
DB_PORT=5432
# Porta do servidor
SERVER_PORT=3000

# Se for rodar localmente com um banco de dados PostgreSQL adicione também ensta variável de mabiente:
MODE=development

