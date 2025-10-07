#!/bin/bash

# ================================================
# SCRIPT COMPLETO DE RESET DO MYSQL
# Pecuária Pro 4.0
# ================================================

echo ""
echo "🐄 ═══════════════════════════════════════════════"
echo "   RESET DE SENHA DO MYSQL - PECUÁRIA PRO 4.0"
echo "   ═══════════════════════════════════════════════"
echo ""

# 1. Parar MySQL
echo "🛑 [1/10] Parando MySQL..."
brew services stop mysql
killall mysqld mysqld_safe 2>/dev/null
sleep 3
echo "   ✅ MySQL parado"

# 2. Criar arquivo de reset
echo "📝 [2/10] Criando arquivo de reset..."
cat > /tmp/mysql-reset.sql << 'SQLEOF'
ALTER USER 'root'@'localhost' IDENTIFIED BY 'pecuaria123';
FLUSH PRIVILEGES;
SQLEOF
echo "   ✅ Arquivo criado"

# 3. Iniciar MySQL com reset (PRECISA DE SUDO)
echo "🔓 [3/10] Iniciando MySQL em modo reset (vai pedir senha do Mac)..."
sudo mysqld --init-file=/tmp/mysql-reset.sql --datadir=/opt/homebrew/var/mysql &
MYSQL_PID=$!
echo "   ✅ MySQL iniciado (PID: $MYSQL_PID)"

# 4. Aguardar MySQL processar
echo "⏳ [4/10] Aguardando MySQL processar reset (12 segundos)..."
sleep 12
echo "   ✅ Aguardado"

# 5. Parar MySQL
echo "🛑 [5/10] Parando MySQL..."
sudo killall mysqld
sleep 3
echo "   ✅ MySQL parado"

# 6. Limpar arquivo temporário
echo "🧹 [6/10] Limpando arquivos temporários..."
rm /tmp/mysql-reset.sql
echo "   ✅ Limpo"

# 7. Iniciar MySQL normalmente
echo "🚀 [7/10] Iniciando MySQL normalmente..."
brew services start mysql
sleep 6
echo "   ✅ MySQL iniciado"

# 8. Testar nova senha
echo "🧪 [8/10] Testando nova senha..."
TESTE=$(mysql -u root -ppecuaria123 -e "SELECT 'OK' as status;" 2>&1)

if echo "$TESTE" | grep -q "OK"; then
    echo "   ✅ SENHA FUNCIONANDO!"
    
    # 9. Criar banco de dados
    echo "📦 [9/10] Criando banco de dados 'pecuaria_pro'..."
    mysql -u root -ppecuaria123 -e "CREATE DATABASE IF NOT EXISTS pecuaria_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    
    BANCO_CRIADO=$(mysql -u root -ppecuaria123 -e "SHOW DATABASES LIKE 'pecuaria_pro';" 2>&1)
    
    if echo "$BANCO_CRIADO" | grep -q "pecuaria_pro"; then
        echo "   ✅ Banco criado!"
        
        # 10. Executar schema
        echo "📋 [10/10] Executando schema SQL..."
        cd "/Users/ericobrandao/Documents/PECUÁRIA PRO 4.0/backend"
        mysql -u root -ppecuaria123 pecuaria_pro < database/schema.sql 2>&1
        
        if [ $? -eq 0 ]; then
            echo "   ✅ Schema executado!"
            
            # Atualizar .env
            echo ""
            echo "⚙️  Atualizando arquivo .env..."
            cat > .env << 'ENVEOF'
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=pecuaria123
DB_NAME=pecuaria_pro
DB_PORT=3306

PORT=3001
NODE_ENV=development
ENVEOF
            echo "   ✅ .env atualizado!"
            
            # Testar conexão Node.js
            echo ""
            echo "🧪 Testando conexão com Node.js..."
            node -e "const {testarConexao} = require('./config/database'); testarConexao();" 2>&1
            
            # Resultado final
            echo ""
            echo "🎉 ═══════════════════════════════════════════════"
            echo "   CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!"
            echo "   ═══════════════════════════════════════════════"
            echo ""
            echo "   ✅ MySQL configurado"
            echo "   ✅ Senha: pecuaria123"
            echo "   ✅ Banco: pecuaria_pro criado"
            echo "   ✅ Schema executado"
            echo "   ✅ Arquivo .env configurado"
            echo ""
            echo "   🚀 Para iniciar o servidor:"
            echo "      cd backend"
            echo "      npm run dev"
            echo ""
            echo "   ═══════════════════════════════════════════════"
            echo ""
        else
            echo "   ❌ Erro ao executar schema"
        fi
    else
        echo "   ❌ Erro ao criar banco"
    fi
else
    echo "   ❌ Senha não funcionou"
    echo ""
    echo "   Erro: $TESTE"
    echo ""
    echo "💡 Tente executar manualmente:"
    echo "   1. sudo mysqld --skip-grant-tables &"
    echo "   2. sleep 10"
    echo "   3. mysql -u root"
    echo "   4. Dentro do MySQL:"
    echo "      FLUSH PRIVILEGES;"
    echo "      ALTER USER 'root'@'localhost' IDENTIFIED BY 'pecuaria123';"
    echo "      EXIT;"
fi

