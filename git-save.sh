#!/bin/bash

# ================================================
# SCRIPT DE SALVAMENTO RÁPIDO NO GITHUB
# Pecuária Pro 4.0
# ================================================

echo "🔄 Salvando no GitHub..."

# Verificar se há mudanças
if [[ -z $(git status -s) ]]; then
    echo "✅ Nenhuma mudança para salvar"
    exit 0
fi

# Mostrar mudanças
echo ""
echo "📝 Arquivos modificados:"
git status -s

# Adicionar todos os arquivos
git add .

# Mensagem de commit (pode personalizar ou usar argumento)
if [ -z "$1" ]; then
    MENSAGEM="💾 Auto-save: $(date '+%d/%m/%Y %H:%M')"
else
    MENSAGEM="$1"
fi

# Commit
git commit -m "$MENSAGEM"

# Push
echo ""
echo "🚀 Enviando para GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Salvo no GitHub com sucesso!"
    echo "🔗 https://github.com/ericoneto1405/pecuaria-pro-4.0"
else
    echo ""
    echo "❌ Erro ao enviar para GitHub"
    echo "💡 Verifique sua conexão e credenciais"
fi
