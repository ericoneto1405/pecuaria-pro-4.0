# 🔧 CONFIGURAÇÃO DO MYSQL - GUIA SIMPLES

O MySQL no seu Mac já tem senha configurada. Siga este guia:

---

## 📝 **OPÇÃO 1: Você Sabe a Senha (MAIS FÁCIL)**

### **Passo 1: Criar banco de dados**

Abra o Terminal e execute:

```bash
mysql -u root -p
```

Digite sua senha do MySQL quando solicitado.

### **Passo 2: Dentro do MySQL, execute:**

```sql
CREATE DATABASE pecuaria_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES LIKE 'pecuaria_pro';
EXIT;
```

### **Passo 3: Executar schema**

```bash
cd "/Users/ericobrandao/Documents/PECUÁRIA PRO 4.0/backend"
mysql -u root -p pecuaria_pro < database/schema.sql
```

### **Passo 4: Atualizar .env**

Edite o arquivo `backend/.env` e coloque sua senha:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=pecuaria_pro
DB_PORT=3306

PORT=3001
NODE_ENV=development
```

### **Passo 5: Testar**

```bash
cd backend
node -e "const {testarConexao} = require('./config/database'); testarConexao();"
```

**Deve mostrar:** `✅ Conectado ao MySQL com sucesso!`

---

## 🔑 **OPÇÃO 2: Não Sabe a Senha - Resetar via Preferências do Sistema**

### **Passo 1: Abrir Preferências do Sistema**

1. Abra "Preferências do Sistema" (⚙️)
2. Procure por "MySQL" (pode estar em "Outros" na parte inferior)
3. Clique no ícone do MySQL

### **Passo 2: Parar MySQL**

No painel do MySQL, clique em "Stop MySQL Server"

### **Passo 3: Resetar Senha**

Clique no botão "Initialize Database" e defina uma nova senha.

Ou use senha simples: `pecuaria123`

### **Passo 4: Iniciar MySQL**

Clique em "Start MySQL Server"

### **Passo 5: Continue na OPÇÃO 1**

Use a senha que você definiu.

---

## 🔑 **OPÇÃO 3: Resetar Senha via Terminal (Avançado)**

### **Execute estes comandos um por um:**

```bash
# 1. Parar MySQL
brew services stop mysql
killall mysqld mysqld_safe

# 2. Criar arquivo de configuração temporário
echo "ALTER USER 'root'@'localhost' IDENTIFIED BY 'pecuaria123';" > /tmp/mysql-init.txt

# 3. Iniciar MySQL com arquivo de inicialização
mysqld --init-file=/tmp/mysql-init.txt --user=$(whoami) &

# 4. Aguardar 10 segundos
sleep 10

# 5. Parar MySQL
killall mysqld

# 6. Remover arquivo temporário
rm /tmp/mysql-init.txt

# 7. Iniciar MySQL normalmente
brew services start mysql

# 8. Testar nova senha
mysql -u root -p'pecuaria123' -e "SELECT 'OK' as status;"
```

Se mostrar "OK", senha foi resetada para: `pecuaria123`

Então continue na **OPÇÃO 1** com essa senha.

---

## ✅ **VERIFICAÇÃO RÁPIDA**

Teste se consegue conectar:

```bash
mysql -u root -p
```

Digite sua senha. Se conectar, use a **OPÇÃO 1** para configurar o banco!

---

## 💡 **RECOMENDAÇÃO**

**Use senha simples para desenvolvimento local:** `pecuaria123`

Depois de configurar, você pode mudar no `.env` e no MySQL se quiser.

---

## 🆘 **AINDA COM PROBLEMAS?**

Você pode:

1. **Usar SQLite** (mais simples, sem senha)
2. **Desabilitar autenticação do MySQL** temporariamente
3. **Reinstalar MySQL** do zero

**Me avise qual opção quer tentar!** 🤔

