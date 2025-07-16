-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS finance_db;
USE finance_db;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de clientes (Store FL)
CREATE TABLE IF NOT EXISTS clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de pagamentos (Store FL)
CREATE TABLE IF NOT EXISTS payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_id INT,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method ENUM('Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Boleto', 'Dinheiro') NOT NULL,
  status ENUM('Pago', 'Pendente', 'Cancelado', 'Estornado') DEFAULT 'Pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

-- Tabela de transações (Finanças Pessoais)
CREATE TABLE IF NOT EXISTS transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('Receita', 'Despesa') NOT NULL,
  category VARCHAR(50),
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir dados de exemplo
INSERT INTO users (name, email, password) VALUES 
('Felipe', 'felipe@exemplo.com', '$2a$10$exemplo_hash_aqui');

INSERT INTO clients (name, email, phone) VALUES 
('João Silva', 'joao@email.com', '(11) 99999-9999'),
('Maria Santos', 'maria@email.com', '(11) 88888-8888'),
('Pedro Costa', 'pedro@email.com', '(11) 77777-7777');

INSERT INTO payments (client_id, amount, payment_date, payment_method, status) VALUES 
(1, 150.00, '2024-01-15', 'Cartão de Crédito', 'Pago'),
(2, 89.90, '2024-01-14', 'PIX', 'Pago'),
(3, 200.00, '2024-01-20', 'Boleto', 'Pendente'); 