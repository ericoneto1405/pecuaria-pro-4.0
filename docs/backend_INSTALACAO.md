# 📦 INSTALAÇÃO E CONFIGURAÇÃO DO BACKEND

## 🔧 PRÉ-REQUISITOS

- ✅ Node.js 16+ instalado
- ✅ MySQL 8.0+ instalado e rodando
- ✅ Git (opcional)

---

## 📝 PASSO A PASSO

### **1. Instalar Dependências**

```bash
cd backend
npm install
```

**Pacotes que serão instalados:**
- `express` - Framework web
- `mysql2` - Driver MySQL
- `cors` - CORS middleware
- `dotenv` - Variáveis de ambiente
- `nodemon` - Auto-reload (dev)

---

### **2. Configurar Banco de Dados MySQL**

#### **2.1 Criar usuário e banco (se necessário)**

```bash
# Conectar ao MySQL como root
mysql -u root -p

# Criar banco de dados
CREATE DATABASE pecuaria_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Criar usuário (opcional - pode usar root)
CREATE USER 'pecuaria_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON pecuaria_pro.* TO 'pecuaria_user'@'localhost';
FLUSH PRIVILEGES;

EXIT;
```

#### **2.2 Executar schema**

```bash
mysql -u root -p pecuaria_pro < database/schema.sql
```

Ou se criou usuário específico:

```bash
mysql -u pecuaria_user -p pecuaria_pro < database/schema.sql
```

---

### **3. Configurar Variáveis de Ambiente**

Crie o arquivo `.env` na pasta `backend/`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=pecuaria_pro
DB_PORT=3306

PORT=3001
NODE_ENV=development
```

---

### **4. Testar Conexão com Banco**

```bash
node -e "const {testarConexao} = require('./config/database'); testarConexao();"
```

**Saída esperada:**
```
✅ Conectado ao MySQL com sucesso!
```

---

### **5. Iniciar Servidor**

#### **Modo Desenvolvimento (com auto-reload):**

```bash
npm run dev
```

#### **Modo Produção:**

```bash
npm start
```

**Saída esperada:**
```
🐄 ════════════════════════════════════════════════
   PECUÁRIA PRO 4.0 - API BACKEND
   ════════════════════════════════════════════════

   🚀 Servidor rodando na porta 3001
   🌐 URL: http://localhost:3001
   📊 API: http://localhost:3001/api/animais
   ❤️  Health: http://localhost:3001/health

   ════════════════════════════════════════════════
```

---

### **6. Testar API**

#### **Health Check:**
```bash
curl http://localhost:3001/health
```

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-06T...",
  "version": "1.0.0"
}
```

#### **Gerar Lote de Animais:**
```bash
curl -X POST http://localhost:3001/api/animais/gerar-lote \
  -H "Content-Type: application/json" \
  -d '{
    "quantidade": 5,
    "racas": ["Nelore", "Braford"],
    "tipo": "puro",
    "qualidade": "media",
    "fazenda_id": 1
  }'
```

#### **Listar Animais:**
```bash
curl http://localhost:3001/api/animais?fazenda_id=1
```

---

## 🎮 CONECTAR COM FRONTEND

### **1. Frontend deve apontar para API:**

No arquivo `src/services/api.js`, o URL já está configurado:
```javascript
const API_URL = 'http://localhost:3001/api';
```

### **2. Iniciar Frontend (em outro terminal):**

```bash
# Na raiz do projeto
npm run dev
```

O Vite irá rodar na porta **5173** (ou outra disponível).

### **3. Acessar:**

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API: http://localhost:3001/api/animais

---

## ✅ VERIFICAÇÃO FINAL

### **Checklist:**

- [ ] MySQL instalado e rodando
- [ ] Banco `pecuaria_pro` criado
- [ ] Schema executado sem erros
- [ ] Arquivo `.env` configurado
- [ ] `npm install` executado
- [ ] Servidor backend iniciado (porta 3001)
- [ ] Health check respondendo OK
- [ ] Frontend iniciado (porta 5173)
- [ ] Pode clicar em "🐄 Animais" no sidebar

---

## 🐛 TROUBLESHOOTING

### **Problema: "Error: connect ECONNREFUSED"**
**Solução:** MySQL não está rodando. Inicie o MySQL:
```bash
# macOS
mysql.server start
# ou
brew services start mysql
```

### **Problema: "Access denied for user"**
**Solução:** Credenciais incorretas no `.env`. Verifique usuário e senha.

### **Problema: "Table doesn't exist"**
**Solução:** Execute o schema novamente:
```bash
mysql -u root -p pecuaria_pro < database/schema.sql
```

### **Problema: "Port 3001 already in use"**
**Solução:** Mude a porta no `.env`:
```env
PORT=3002
```

---

## 📚 PRÓXIMOS PASSOS

Após instalação, você pode:

1. ✅ Gerar animais via API
2. ✅ Visualizar no frontend
3. ✅ Filtrar e buscar animais
4. ✅ Ver detalhes completos
5. ⬜ Implementar sistema de reprodução (próximo)

---

**Bom desenvolvimento! 🐄🧬**

