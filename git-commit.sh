#!/bin/bash

# ================================================
# SCRIPT DE COMMIT PERSONALIZADO
# ================================================

if [ -z "$1" ]; then
    echo "❌ Erro: Mensagem de commit necessária"
    echo ""
    echo "📝 Uso:"
    echo "   ./git-commit.sh \"Sua mensagem aqui\""
    echo ""
    echo "💡 Exemplos:"
    echo "   ./git-commit.sh \"Adiciona sistema de reprodução\""
    echo "   ./git-commit.sh \"Corrige bug na listagem de animais\""
    exit 1
fi

MENSAGEM="$1"

echo "📝 Commit: $MENSAGEM"
echo ""

# Verificar mudanças
if [[ -z $(git status -s) ]]; then
    echo "✅ Nenhuma mudança para commitar"
    exit 0
fi

# Mostrar mudanças
git status -s

# Adicionar
git add .

# Commit
git commit -m "$MENSAGEM"

# Perguntar se quer fazer push
echo ""
read -p "🚀 Fazer push para GitHub? (s/N): " resposta

if [[ "$resposta" =~ ^[Ss]$ ]]; then
    git push origin main
    echo "✅ Enviado para GitHub!"
else
    echo "📌 Commit local feito. Use 'git push' quando quiser enviar."
fi
