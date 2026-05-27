CREATE DATABASE IF NOT EXISTS monetra;
USE monetra;

-- ==========================
-- USUARIOS
-- ==========================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    foto TEXT,
    salario DECIMAL(10,2) DEFAULT 0,
    idioma VARCHAR(100),
    telefone VARCHAR(25),
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================
-- ROTULOS
-- ==========================
CREATE TABLE IF NOT EXISTS rotulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    icone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==========================
-- DESPESAS
-- ==========================
CREATE TABLE IF NOT EXISTS despesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo ENUM('FIXA', 'EXTRA') NOT NULL,
    nome VARCHAR(120) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_despesa DATE,
    dia_semana VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==========================
-- INVESTIMENTOS
-- ==========================
CREATE TABLE IF NOT EXISTS investimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100),
    valor DECIMAL(10,2),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==========================
-- DADOS INICIAIS
-- ==========================
INSERT INTO usuarios (nome, idade, foto, salario, idioma, telefone, email, senha_hash)
VALUES
('Lucas', 24, 'https://i.pravatar.cc/300', 4500, 'Português', '(11) 98765-4321', 'lucas@email.com', '123456'),
('Mariana', 28, 'https://i.pravatar.cc/301', 6200, 'Português / Inglês', '(21) 99876-5432', 'mariana@email.com', 'abc123');

INSERT INTO rotulos (usuario_id, titulo, descricao, icone)
VALUES
(1, 'Conta de Luz vence amanhã!', 'Pague para evitar juros.', '💡'),
(2, 'Pagar internet', 'Evitar corte do serviço.', '🌐');

INSERT INTO despesas (usuario_id, tipo, nome, valor, data_despesa, dia_semana)
VALUES
(1, 'FIXA', 'Aluguel', 1200, NULL, NULL),
(1, 'FIXA', 'Internet', 100, NULL, NULL),
(1, 'EXTRA', 'Restaurante', 80, '2026-03-10', 'Segunda'),
(2, 'FIXA', 'Academia', 120, NULL, NULL),
(2, 'EXTRA', 'Cinema', 50, '2026-03-09', 'Domingo');
