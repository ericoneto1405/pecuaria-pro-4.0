# 🐄 PECUÁRIA PRO 4.0

Sistema completo de gestão e genética bovina com simulação realista de reprodução e melhoramento genético.

## 🎯 Características Principais

- **16 raças bovinas** implementadas
- **Sistema genético completo** (quantitativo + qualitativo)
- **Heterose** calculada automaticamente
- **10 associações brasileiras** com registros genealógicos
- **Interface React moderna** com visualização completa
- **Backend Node.js + MySQL** com API REST

## 🚀 Instalação

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure suas credenciais MySQL no .env
mysql -u root -p pecuaria_pro < database/schema.sql
npm run dev
```

### Frontend
```bash
npm install
npm run dev
```

## 📚 Documentação

- [Documentação Completa](docs/)
- [Backend API](docs/backend_README.md)
- [Instalação](docs/backend_INSTALACAO.md)

## 🐂 Raças

Taurinas: Angus, Hereford, Charolês, Senepol  
Zebuínas: Nelore, Brahman, Tabapuã, Guzerá, Sindi  
Leiteiras: Holandesa, Jersey, Gir  
Compostas: Girolando, Bonsmara, Santa Gertrudis, Braford

## 📝 Licença

MIT

---

**Desenvolvido com 🐄 e 🧬**
