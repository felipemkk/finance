# Finance Backend

Backend para aplicação de finanças pessoais e empresariais.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

## 🔧 Instalação

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Configurar banco de dados:**

   - Crie um banco MySQL chamado `finance_db`
   - Execute o script `config/database.sql` para criar as tabelas

3. **Configurar variáveis de ambiente:**

   - Edite o arquivo `config.env`
   - Configure suas credenciais do MySQL

4. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

## 📊 Estrutura do Banco

### Tabelas:

- **users** - Usuários do sistema
- **clients** - Clientes (Store FL)
- **payments** - Pagamentos (Store FL)
- **transactions** - Transações pessoais

## 🔌 APIs

### Autenticação

- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário

### Usuários

- `GET /api/users/profile` - Obter perfil
- `PUT /api/users/profile` - Atualizar perfil
- `DELETE /api/users/profile` - Excluir conta

### Clientes (Store FL)

- `GET /api/clients` - Listar clientes
- `POST /api/clients` - Criar cliente
- `PUT /api/clients/:id` - Atualizar cliente
- `DELETE /api/clients/:id` - Excluir cliente

### Pagamentos (Store FL)

- `GET /api/payments` - Listar pagamentos
- `POST /api/payments` - Criar pagamento
- `PUT /api/payments/:id` - Atualizar pagamento
- `DELETE /api/payments/:id` - Excluir pagamento
- `GET /api/payments/totals/summary` - Resumo de totais

### Transações (Finanças Pessoais)

- `GET /api/transactions` - Listar transações
- `POST /api/transactions` - Criar transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Excluir transação
- `GET /api/transactions/balance/monthly/:year/:month` - Saldo mensal
- `GET /api/transactions/balance/yearly/:year` - Saldo anual

## 🔐 Autenticação

Todas as rotas (exceto auth) requerem token JWT no header:

```
Authorization: Bearer <token>
```

## 🛠️ Scripts

- `npm start` - Iniciar em produção
- `npm run dev` - Iniciar em desenvolvimento (nodemon)

## 📝 Configuração

Edite o arquivo `config.env`:

```env
# Servidor
PORT=3000
NODE_ENV=development

# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=finance_db
DB_PORT=3306

# JWT
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:4200
```
