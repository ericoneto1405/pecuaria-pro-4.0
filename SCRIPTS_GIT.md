# 📝 SCRIPTS DE GIT/GITHUB

Scripts para facilitar o salvamento no GitHub.

---

## 🚀 1. git-save.sh (SALVAMENTO RÁPIDO)

**Uso mais comum - Salva tudo rapidamente**

### Comando:
```bash
./git-save.sh
```

### Ou com mensagem personalizada:
```bash
./git-save.sh "Mensagem do commit"
```

### O que faz:
1. ✅ Verifica se há mudanças
2. ✅ Adiciona todos os arquivos
3. ✅ Faz commit (automático ou personalizado)
4. ✅ Faz push para GitHub
5. ✅ Mostra link do repositório

### Exemplos:
```bash
./git-save.sh                           # Auto-save com data/hora
./git-save.sh "Adiciona raça Canchim"   # Mensagem personalizada
```

---

## 🤖 2. git-auto-save.sh (AUTO-SAVE CONTÍNUO)

**Monitora mudanças e salva automaticamente a cada 5 minutos**

### Comando:
```bash
./git-auto-save.sh
```

### O que faz:
1. ✅ Fica rodando em loop
2. ✅ A cada 5 minutos verifica mudanças
3. ✅ Se houver mudanças, faz commit + push automaticamente
4. ✅ Mostra log na tela

### Como usar:
```bash
# Iniciar em segundo plano
./git-auto-save.sh &

# Ou em terminal separado
./git-auto-save.sh

# Parar: Ctrl+C ou
pkill -f git-auto-save
```

### Ajustar intervalo:
Edite a linha `INTERVALO=300` no script:
- 60 = 1 minuto
- 300 = 5 minutos (padrão)
- 600 = 10 minutos
- 1800 = 30 minutos

---

## 📝 3. git-commit.sh (COMMIT INTERATIVO)

**Commit com mensagem personalizada e confirmação de push**

### Comando:
```bash
./git-commit.sh "Sua mensagem aqui"
```

### O que faz:
1. ✅ Verifica mudanças
2. ✅ Mostra arquivos modificados
3. ✅ Faz commit com sua mensagem
4. ✅ **Pergunta** se quer fazer push
5. ✅ Push apenas se você confirmar

### Exemplo:
```bash
./git-commit.sh "Implementa sistema de reprodução"
# Mostra mudanças
# Faz commit
# Pergunta: "Fazer push? (s/N):"
```

---

## 🎯 QUANDO USAR CADA UM?

### Use **git-save.sh** quando:
✅ Terminou uma feature
✅ Quer salvar rapidamente
✅ Vai fazer pausa no trabalho
✅ Mudou vários arquivos

### Use **git-auto-save.sh** quando:
✅ Está trabalhando por horas
✅ Quer backup automático
✅ Não quer lembrar de commitar
✅ Está fazendo mudanças frequentes

### Use **git-commit.sh** quando:
✅ Quer mensagem descritiva
✅ Quer revisar antes de enviar
✅ Mudanças importantes
✅ Quer controle total

---

## 💡 DICAS

### Commits Semânticos:
```bash
./git-save.sh "feat: Adiciona raça Canchim"
./git-save.sh "fix: Corrige cálculo de heterose"
./git-save.sh "docs: Atualiza README"
./git-save.sh "style: Melhora layout dos cards"
./git-save.sh "refactor: Reorganiza código genético"
```

### Emojis úteis:
```bash
./git-save.sh "✨ Nova feature de reprodução"
./git-save.sh "🐛 Corrige bug na listagem"
./git-save.sh "📝 Atualiza documentação"
./git-save.sh "🎨 Melhora interface"
./git-save.sh "🐄 Adiciona raça Brahman"
./git-save.sh "🧬 Ajusta cálculo genético"
```

---

## 🛑 PARAR AUTO-SAVE

Se iniciou o auto-save e quer parar:

```bash
pkill -f git-auto-save
```

Ou pressione `Ctrl+C` no terminal onde está rodando.

---

## 📦 .gitignore

O arquivo `.gitignore` já está configurado para **NÃO commitar:**
- ❌ `node_modules/`
- ❌ `.env` (senhas do MySQL)
- ❌ Logs
- ❌ Arquivos temporários
- ❌ Build outputs

---

**✅ Scripts criados e prontos para uso!**
