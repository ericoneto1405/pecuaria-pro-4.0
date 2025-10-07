#!/bin/bash

# ================================================
# SCRIPT DE AUTO-SAVE CONTÍNUO
# Monitora mudanças e salva automaticamente
# ================================================

echo "🤖 ═══════════════════════════════════════════════"
echo "   AUTO-SAVE GITHUB - PECUÁRIA PRO 4.0"
echo "   ═══════════════════════════════════════════════"
echo ""
echo "   Monitorando mudanças a cada 5 minutos..."
echo "   Pressione Ctrl+C para parar"
echo ""
echo "   ═══════════════════════════════════════════════"
echo ""

INTERVALO=300  # 5 minutos em segundos

while true; do
    # Aguardar intervalo
    sleep $INTERVALO
    
    # Verificar mudanças
    if [[ -n $(git status -s) ]]; then
        echo ""
        echo "⏰ $(date '+%H:%M:%S') - Mudanças detectadas!"
        
        # Adicionar e commitar
        git add .
        git commit -m "🤖 Auto-save: $(date '+%d/%m/%Y %H:%M')" > /dev/null 2>&1
        
        # Push
        git push origin main > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            echo "   ✅ Salvo no GitHub!"
        else
            echo "   ⚠️  Erro ao enviar (verificar depois)"
        fi
    else
        echo "⏰ $(date '+%H:%M:%S') - Nenhuma mudança"
    fi
done
