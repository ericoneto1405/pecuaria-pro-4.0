#!/bin/bash

# ================================================
# SCRIPT DE CONFIGURAÇÃO DO MYSQL
# Pecuária Pro 4.0
# ================================================

echo "🐄 ═══════════════════════════════════════════════"
echo "   CONFIGURAÇÃO DO MYSQL - PECUÁRIA PRO 4.0"
echo "   ═══════════════════════════════════════════════"
echo ""

# Verificar se MySQL está instalado
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL não está instalado!"
    echo "📦 Instalando via Homebrew..."
    brew install mysql
    brew services start mysql
    sleep 5
fi

# Verificar se MySQL está rodando
if ! brew services list | grep mysql | grep started &> /dev/null; then
    echo "🚀 Iniciando MySQL..."
    brew services start mysql
    sleep 3
fi

echo "✅ MySQL está rodando!"
echo ""
echo "📝 Vamos configurar o banco de dados..."
echo ""
echo "Por favor, digite a senha do MySQL root (deixe em branco se não tiver senha):"
read -s MYSQL_PASSWORD

# Testar conexão
if [ -z "$MYSQL_PASSWORD" ]; then
    # Sem senha
    MYSQL_CMD="mysql -u root"
else
    # Com senha
    MYSQL_CMD="mysql -u root -p$MYSQL_PASSWORD"
fi

# Criar banco de dados
echo ""
echo "📦 Criando banco de dados 'pecuaria_pro'..."

$MYSQL_CMD <<EOF
CREATE DATABASE IF NOT EXISTS pecuaria_pro 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;
  
SHOW DATABASES LIKE 'pecuaria_pro';
EOF

if [ $? -eq 0 ]; then
    echo "✅ Banco de dados criado com sucesso!"
else
    echo "❌ Erro ao criar banco de dados"
    echo ""
    echo "💡 Se você não sabe a senha do MySQL:"
    echo "   1. Pare o MySQL: brew services stop mysql"
    echo "   2. Inicie sem senha: mysqld_safe --skip-grant-tables &"
    echo "   3. Conecte: mysql -u root"
    echo "   4. Altere senha: ALTER USER 'root'@'localhost' IDENTIFIED BY 'nova_senha';"
    echo "   5. Reinicie: brew services restart mysql"
    exit 1
fi

# Executar schema
echo ""
echo "📋 Executando schema SQL..."

$MYSQL_CMD pecuaria_pro < "$(dirname "$0")/schema.sql"

if [ $? -eq 0 ]; then
    echo "✅ Schema executado com sucesso!"
else
    echo "❌ Erro ao executar schema"
    exit 1
fi

# Atualizar arquivo .env
echo ""
echo "⚙️  Atualizando arquivo .env..."

ENV_FILE="../.env"

cat > "$ENV_FILE" <<EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$MYSQL_PASSWORD
DB_NAME=pecuaria_pro
DB_PORT=3306

PORT=3001
NODE_ENV=development
EOF

echo "✅ Arquivo .env atualizado!"

# Testar conexão do Node.js
echo ""
echo "🧪 Testando conexão com Node.js..."

cd ..
node -e "const {testarConexao} = require('./config/database'); testarConexao();" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ═══════════════════════════════════════════════"
    echo "   CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!"
    echo "   ═══════════════════════════════════════════════"
    echo ""
    echo "   ✅ MySQL configurado"
    echo "   ✅ Banco 'pecuaria_pro' criado"
    echo "   ✅ Schema executado"
    echo "   ✅ Arquivo .env configurado"
    echo "   ✅ Conexão testada"
    echo ""
    echo "   🚀 Para iniciar o servidor:"
    echo "      cd backend"
    echo "      npm run dev"
    echo ""
    echo "   ═══════════════════════════════════════════════"
else
    echo ""
    echo "⚠️  Houve algum problema na conexão"
    echo "   Verifique o arquivo .env e tente novamente"
fi

