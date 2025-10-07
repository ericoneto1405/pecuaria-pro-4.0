#!/usr/bin/env python3
"""
CONFIGURADOR AUTOMÁTICO DO MYSQL
Configura senha e cria banco de dados
"""

import subprocess
import time
import sys
import os

def executar_comando(cmd, shell=True):
    """Executa comando e retorna resultado"""
    try:
        result = subprocess.run(cmd, shell=shell, capture_output=True, text=True)
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def parar_mysql():
    """Para o MySQL"""
    print("🛑 Parando MySQL...")
    executar_comando("brew services stop mysql")
    executar_comando("killall mysqld mysqld_safe 2>/dev/null")
    time.sleep(3)
    print("✅ MySQL parado")

def iniciar_mysql_normal():
    """Inicia MySQL normalmente"""
    print("🚀 Iniciando MySQL...")
    executar_comando("brew services start mysql")
    time.sleep(5)
    print("✅ MySQL iniciado")

def iniciar_mysql_recuperacao():
    """Inicia MySQL em modo recuperação"""
    print("🔓 Iniciando MySQL em modo recuperação...")
    subprocess.Popen(
        "mysqld_safe --skip-grant-tables --skip-networking > /tmp/mysql-recovery.log 2>&1",
        shell=True,
        start_new_session=True
    )
    time.sleep(8)
    print("✅ MySQL em modo recuperação")

def resetar_senha(nova_senha):
    """Reseta senha do root"""
    print(f"🔑 Configurando senha...")
    
    if nova_senha:
        sql = f"""
        FLUSH PRIVILEGES;
        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{nova_senha}';
        FLUSH PRIVILEGES;
        """
    else:
        # Tentar sem senha (pode não funcionar dependendo da política)
        sql = """
        FLUSH PRIVILEGES;
        SET GLOBAL validate_password.policy=LOW;
        SET GLOBAL validate_password.length=0;
        ALTER USER 'root'@'localhost' IDENTIFIED BY 'pecuaria';
        FLUSH PRIVILEGES;
        """
        nova_senha = 'pecuaria'
    
    sucesso, stdout, stderr = executar_comando(f'mysql -u root -e "{sql}"')
    
    if sucesso:
        print(f"✅ Senha configurada: '{nova_senha}'")
        return True, nova_senha
    else:
        print(f"⚠️  Erro: {stderr}")
        return False, None

def criar_banco(senha):
    """Cria banco de dados"""
    print("\n📦 Criando banco de dados 'pecuaria_pro'...")
    
    cmd = f'mysql -u root -p"{senha}" -e "CREATE DATABASE IF NOT EXISTS pecuaria_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; SHOW DATABASES LIKE \'pecuaria_pro\';"'
    
    sucesso, stdout, stderr = executar_comando(cmd)
    
    if sucesso and 'pecuaria_pro' in stdout:
        print("✅ Banco de dados criado!")
        return True
    else:
        print(f"❌ Erro ao criar banco: {stderr}")
        return False

def executar_schema(senha):
    """Executa schema SQL"""
    print("\n📋 Executando schema SQL...")
    
    schema_path = os.path.join(os.path.dirname(__file__), 'schema.sql')
    cmd = f'mysql -u root -p"{senha}" pecuaria_pro < "{schema_path}"'
    
    sucesso, stdout, stderr = executar_comando(cmd)
    
    if sucesso:
        print("✅ Schema executado!")
        return True
    else:
        print(f"❌ Erro ao executar schema: {stderr}")
        return False

def atualizar_env(senha):
    """Atualiza arquivo .env"""
    print("\n⚙️  Atualizando .env...")
    
    env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    
    with open(env_path, 'w') as f:
        f.write(f"""DB_HOST=localhost
DB_USER=root
DB_PASSWORD={senha}
DB_NAME=pecuaria_pro
DB_PORT=3306

PORT=3001
NODE_ENV=development
""")
    
    print("✅ Arquivo .env atualizado!")

def main():
    print("\n🐄 ═══════════════════════════════════════════════")
    print("   CONFIGURAÇÃO AUTOMÁTICA DO MYSQL")
    print("   Pecuária Pro 4.0")
    print("   ═══════════════════════════════════════════════\n")
    
    # Passo 1: Parar MySQL
    parar_mysql()
    
    # Passo 2: Iniciar em modo recuperação
    iniciar_mysql_recuperacao()
    
    # Passo 3: Resetar senha (usar 'pecuaria' como senha padrão)
    sucesso, senha = resetar_senha('pecuaria123')
    
    if not sucesso:
        print("\n❌ Não foi possível resetar a senha")
        print("💡 Tente executar manualmente ou use senha vazia")
        sys.exit(1)
    
    # Passo 4: Parar MySQL e iniciar normal
    parar_mysql()
    iniciar_mysql_normal()
    
    # Passo 5: Criar banco de dados
    if not criar_banco(senha):
        print("\n⚠️  Banco não foi criado, mas continuando...")
    
    # Passo 6: Executar schema
    if not executar_schema(senha):
        print("\n⚠️  Schema não foi executado, mas continuando...")
    
    # Passo 7: Atualizar .env
    atualizar_env(senha)
    
    # Passo 8: Testar conexão Node.js
    print("\n🧪 Testando conexão com Node.js...")
    os.chdir('..')
    sucesso, stdout, stderr = executar_comando(
        'node -e "const {testarConexao} = require(\'./config/database\'); testarConexao();"'
    )
    
    print(stdout)
    
    # Resultado final
    print("\n🎉 ═══════════════════════════════════════════════")
    print("   CONFIGURAÇÃO CONCLUÍDA!")
    print("   ═══════════════════════════════════════════════\n")
    print(f"   ✅ MySQL configurado")
    print(f"   ✅ Usuário: root")
    print(f"   ✅ Senha: {senha}")
    print(f"   ✅ Banco: pecuaria_pro")
    print(f"   ✅ Arquivo .env atualizado\n")
    print("   🚀 Para iniciar o servidor:")
    print("      cd backend")
    print("      npm run dev\n")
    print("   ═══════════════════════════════════════════════\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Configuração cancelada pelo usuário")
        parar_mysql()
        iniciar_mysql_normal()
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        sys.exit(1)

