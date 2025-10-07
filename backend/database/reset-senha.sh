#!/bin/bash

# ================================================
# SCRIPT PARA RESETAR SENHA DO MYSQL ROOT
# Pecuária Pro 4.0
# ================================================

echo "🔑 ═══════════════════════════════════════════════"
echo "   RESETAR SENHA DO MYSQL ROOT"
echo "   ═══════════════════════════════════════════════"
echo ""

# Definir nova senha
echo "Digite a nova senha para o usuário root do MySQL:"
echo "(Ou deixe em branco para configurar sem senha)"
read -s NOVA_SENHA

echo ""
echo "🛑 Parando MySQL..."
brew services stop mysql
sleep 2

echo "🔓 Iniciando MySQL em modo de recuperação..."
# Iniciar MySQL sem autenticação
mysqld_safe --skip-grant-tables --skip-networking &
MYSQL_PID=$!
sleep 5

echo "🔧 Conectando ao MySQL..."

if [ -z "$NOVA_SENHA" ]; then
    # Configurar SEM senha
    mysql -u root <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '';
FLUSH PRIVILEGES;
EOF
    echo "✅ Usuário root configurado SEM senha"
else
    # Configurar COM senha
    mysql -u root <<EOF
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$NOVA_SENHA';
FLUSH PRIVILEGES;
EOF
    echo "✅ Senha do root alterada com sucesso!"
fi

echo ""
echo "🛑 Parando MySQL em modo recuperação..."
killall mysqld 2>/dev/null
sleep 3

echo "🚀 Reiniciando MySQL normalmente..."
brew services start mysql
sleep 3

echo ""
echo "🧪 Testando nova configuração..."

if [ -z "$NOVA_SENHA" ]; then
    # Testar sem senha
    mysql -u root -e "SELECT 'Conexão OK' as status;" 2>&1
else
    # Testar com senha
    mysql -u root -p"$NOVA_SENHA" -e "SELECT 'Conexão OK' as status;" 2>&1
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ═══════════════════════════════════════════════"
    echo "   SENHA RESETADA COM SUCESSO!"
    echo "   ═══════════════════════════════════════════════"
    echo ""
    
    # Atualizar .env
    echo "📝 Atualizando arquivo .env..."
    
    cat > "../.env" <<ENVEOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$NOVA_SENHA
DB_NAME=pecuaria_pro
DB_PORT=3306

PORT=3001
NODE_ENV=development
ENVEOF
    
    echo "✅ Arquivo .env atualizado!"
    echo ""
    echo "🚀 Próximo passo: Execute o script de setup"
    echo "   ./setup.sh"
    echo ""
else
    echo ""
    echo "❌ Erro ao testar conexão"
    echo "   Tente novamente ou configure manualmente"
fi

