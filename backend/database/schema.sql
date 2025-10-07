-- ================================================
-- PECUÁRIA PRO 4.0 - SCHEMA MYSQL
-- Sistema de Genética Bovina
-- ================================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS pecuaria_pro 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE pecuaria_pro;

-- ================================================
-- TABELA: usuarios
-- ================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  nivel_avaliacao TINYINT DEFAULT 1,
  saldo DECIMAL(12,2) DEFAULT 0,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ================================================
-- TABELA: fazendas
-- ================================================
CREATE TABLE IF NOT EXISTS fazendas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  nome VARCHAR(150) NOT NULL,
  tamanho_hectares DECIMAL(10,2),
  clima VARCHAR(50),
  solo VARCHAR(50),
  pastagem VARCHAR(50),
  degradacao VARCHAR(50),
  valor_total DECIMAL(15,2),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB;

-- ================================================
-- TABELA: pastos
-- ================================================
CREATE TABLE IF NOT EXISTS pastos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fazenda_id INT NOT NULL,
  numero INT NOT NULL,
  nome VARCHAR(100),
  area_hectares DECIMAL(8,2),
  tipo_pastagem VARCHAR(50),
  capacidade_animais INT,
  animais_atual INT DEFAULT 0,
  
  FOREIGN KEY (fazenda_id) REFERENCES fazendas(id) ON DELETE CASCADE,
  INDEX idx_fazenda (fazenda_id)
) ENGINE=InnoDB;

-- ================================================
-- TABELA: animais (PRINCIPAL)
-- ================================================
CREATE TABLE IF NOT EXISTS animais (
  id VARCHAR(20) PRIMARY KEY,
  brinco_numero VARCHAR(10),
  brinco_cor VARCHAR(20),
  brinco_lado VARCHAR(20),
  
  -- Dados básicos
  nome VARCHAR(100) NOT NULL,
  sexo ENUM('M', 'F') NOT NULL,
  data_nascimento DATE NOT NULL,
  idade_meses INT,
  
  -- Classificação racial
  raca_principal VARCHAR(50) NOT NULL,
  tipo_animal ENUM('puro', 'F1', 'composta', 'mestico_complexo') NOT NULL,
  composicao_racial JSON NOT NULL,
  
  -- Registro oficial
  registro_numero VARCHAR(50),
  registro_associacao VARCHAR(20),
  registro_status ENUM('ativo', 'pendente', 'cancelado'),
  registro_data DATE,
  registro_completo JSON,
  
  -- Genética
  genotipo JSON NOT NULL,
  fenotipo JSON NOT NULL,
  heterose JSON,
  
  -- Genealogia
  id_pai VARCHAR(20),
  id_mae VARCHAR(20),
  
  -- Físico
  peso_atual_kg DECIMAL(6,2),
  condicao_corporal DECIMAL(2,1),
  
  -- Localização
  fazenda_id INT,
  pasto_id INT,
  
  -- Origem
  origem_tipo VARCHAR(30),
  origem_data DATE,
  origem_detalhes JSON,
  
  -- Valor
  valor_mercado INT,
  valor_compra INT,
  
  -- Status
  status ENUM('ativo', 'vendido', 'morto', 'transferido') DEFAULT 'ativo',
  ativo BOOLEAN DEFAULT TRUE,
  
  -- Controle
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Foreign Keys
  FOREIGN KEY (id_pai) REFERENCES animais(id),
  FOREIGN KEY (id_mae) REFERENCES animais(id),
  FOREIGN KEY (fazenda_id) REFERENCES fazendas(id) ON DELETE SET NULL,
  FOREIGN KEY (pasto_id) REFERENCES pastos(id) ON DELETE SET NULL,
  
  -- Índices para performance
  INDEX idx_fazenda (fazenda_id),
  INDEX idx_pasto (pasto_id),
  INDEX idx_tipo (tipo_animal),
  INDEX idx_raca (raca_principal),
  INDEX idx_sexo (sexo),
  INDEX idx_status (status),
  INDEX idx_genealogia (id_pai, id_mae)
) ENGINE=InnoDB;

-- ================================================
-- TABELA: reproducoes
-- ================================================
CREATE TABLE IF NOT EXISTS reproducoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  mae_id VARCHAR(20) NOT NULL,
  pai_id VARCHAR(20),
  tipo_reproducao ENUM('cobertura_natural', 'IATF', 'TE', 'FIV') NOT NULL,
  
  data_cobertura DATE NOT NULL,
  data_prevista_parto DATE,
  data_parto_real DATE,
  
  status ENUM('aguardando_diagnostico', 'prenha', 'vazia', 'abortou', 'parto_realizado') DEFAULT 'aguardando_diagnostico',
  
  bezerro_id VARCHAR(20),
  bezerro_dados_previstos JSON,
  
  observacoes TEXT,
  
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (mae_id) REFERENCES animais(id),
  FOREIGN KEY (pai_id) REFERENCES animais(id),
  FOREIGN KEY (bezerro_id) REFERENCES animais(id),
  
  INDEX idx_mae (mae_id),
  INDEX idx_pai (pai_id),
  INDEX idx_status (status),
  INDEX idx_data_parto (data_prevista_parto)
) ENGINE=InnoDB;

-- ================================================
-- TABELA: central_semen
-- ================================================
CREATE TABLE IF NOT EXISTS central_semen (
  id INT PRIMARY KEY AUTO_INCREMENT,
  touro_id VARCHAR(20) NOT NULL,
  raca VARCHAR(50) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  
  valor_dose DECIMAL(8,2),
  doses_disponiveis INT,
  
  dados_geneticos JSON NOT NULL,
  popularidade INT DEFAULT 0,
  
  status ENUM('ativo', 'esgotado', 'descontinuado') DEFAULT 'ativo',
  
  data_inclusao DATE,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_raca (raca),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- ================================================
-- TABELA: transacoes
-- ================================================
CREATE TABLE IF NOT EXISTS transacoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  tipo ENUM('compra_animal', 'venda_animal', 'dose_semen', 'servico', 'outro') NOT NULL,
  
  animal_id VARCHAR(20),
  valor DECIMAL(12,2) NOT NULL,
  descricao TEXT,
  
  data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (animal_id) REFERENCES animais(id),
  
  INDEX idx_usuario (usuario_id),
  INDEX idx_tipo (tipo),
  INDEX idx_data (data_transacao)
) ENGINE=InnoDB;

-- ================================================
-- TABELA: historico_peso
-- ================================================
CREATE TABLE IF NOT EXISTS historico_peso (
  id INT PRIMARY KEY AUTO_INCREMENT,
  animal_id VARCHAR(20) NOT NULL,
  peso_kg DECIMAL(6,2) NOT NULL,
  idade_meses INT NOT NULL,
  data_pesagem DATE NOT NULL,
  observacao TEXT,
  
  FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
  
  INDEX idx_animal (animal_id),
  INDEX idx_data (data_pesagem)
) ENGINE=InnoDB;

-- ================================================
-- TABELA: historico_sanitario
-- ================================================
CREATE TABLE IF NOT EXISTS historico_sanitario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  animal_id VARCHAR(20) NOT NULL,
  tipo_evento ENUM('vacina', 'vermifugo', 'tratamento', 'doenca', 'cirurgia') NOT NULL,
  descricao TEXT,
  data_evento DATE NOT NULL,
  custo DECIMAL(8,2),
  
  FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
  
  INDEX idx_animal (animal_id),
  INDEX idx_tipo (tipo_evento),
  INDEX idx_data (data_evento)
) ENGINE=InnoDB;

-- ================================================
-- VIEWS ÚTEIS
-- ================================================

-- View: Animais com idade calculada
CREATE OR REPLACE VIEW vw_animais_completo AS
SELECT 
  a.*,
  CONCAT(FLOOR(a.idade_meses / 12), 'a ', MOD(a.idade_meses, 12), 'm') AS idade_formatada,
  f.nome AS fazenda_nome,
  p.nome AS pasto_nome,
  pai.nome AS nome_pai,
  mae.nome AS nome_mae
FROM animais a
LEFT JOIN fazendas f ON a.fazenda_id = f.id
LEFT JOIN pastos p ON a.pasto_id = p.id
LEFT JOIN animais pai ON a.id_pai = pai.id
LEFT JOIN animais mae ON a.id_mae = mae.id
WHERE a.ativo = TRUE;

-- View: Estatísticas por fazenda
CREATE OR REPLACE VIEW vw_estatisticas_fazenda AS
SELECT 
  f.id AS fazenda_id,
  f.nome AS fazenda_nome,
  COUNT(a.id) AS total_animais,
  SUM(CASE WHEN a.sexo = 'M' THEN 1 ELSE 0 END) AS total_machos,
  SUM(CASE WHEN a.sexo = 'F' THEN 1 ELSE 0 END) AS total_femeas,
  SUM(a.valor_mercado) AS valor_total_rebanho,
  AVG(a.peso_atual_kg) AS peso_medio,
  AVG(JSON_EXTRACT(a.genotipo, '$.nota_genetica')) AS nota_genetica_media
FROM fazendas f
LEFT JOIN animais a ON a.fazenda_id = f.id AND a.ativo = TRUE
GROUP BY f.id, f.nome;

-- ================================================
-- DADOS INICIAIS (SEED)
-- ================================================

-- Criar usuário teste
INSERT INTO usuarios (nome, email, senha_hash, nivel_avaliacao, saldo) 
VALUES ('Jogador Teste', 'teste@pecuaria.com', 'hash_placeholder', 5, 100000)
ON DUPLICATE KEY UPDATE id=id;

-- Criar fazenda inicial
INSERT INTO fazendas (usuario_id, nome, tamanho_hectares, clima, solo, pastagem, valor_total)
SELECT 1, 'Fazenda Santa Esperança', 172.59, 'Subtropical', 'Cambissolo', 'Tifton', 4401045
WHERE NOT EXISTS (SELECT 1 FROM fazendas WHERE nome = 'Fazenda Santa Esperança');

-- Criar alguns pastos
INSERT INTO pastos (fazenda_id, numero, nome, area_hectares, tipo_pastagem, capacidade_animais)
SELECT 1, 1, 'Pasto Alto', 25.0, 'Tifton', 30
WHERE NOT EXISTS (SELECT 1 FROM pastos WHERE fazenda_id = 1 AND numero = 1);

INSERT INTO pastos (fazenda_id, numero, nome, area_hectares, tipo_pastagem, capacidade_animais)
SELECT 1, 2, 'Pasto Baixo', 30.0, 'Brachiaria', 35
WHERE NOT EXISTS (SELECT 1 FROM pastos WHERE fazenda_id = 1 AND numero = 2);

INSERT INTO pastos (fazenda_id, numero, nome, area_hectares, tipo_pastagem, capacidade_animais)
SELECT 1, 3, 'Pasto das Águas', 20.0, 'Mombaça', 25
WHERE NOT EXISTS (SELECT 1 FROM pastos WHERE fazenda_id = 1 AND numero = 3);

