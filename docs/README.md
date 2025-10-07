# 🐄 PECUÁRIA PRO 4.0

Sistema completo de gestão e genética bovina com simulação realista de reprodução e melhoramento genético.

---

## 🎯 CARACTERÍSTICAS PRINCIPAIS

### ✅ **Sistema Genético Completo**
- 16 raças bovinas (Zebuínas, Taurinas, Compostas, Leiteiras)
- Genética quantitativa (5 características) e qualitativa (Quadro de Punnett)
- Heterose (vigor híbrido) calculada automaticamente
- Raças compostas com heterose fixa
- Fenótipo vs Genótipo (ambiente influencia expressão)

### ✅ **Sistema de Registro Genealógico**
- 10 associações brasileiras implementadas
- Formatos de registro específicos por raça
- Identificação física (tatuagens, brincos)
- Rastreabilidade completa

### ✅ **Interface Moderna**
- Frontend React com Vite
- Design responsivo e intuitivo
- Visualização completa de animais
- Avaliação fenotípica e genética

### ✅ **Backend Robusto**
- API REST com Express.js
- Banco de dados MySQL
- Geração procedural de animais
- Sistema de filtros e busca

---

## 🏗️ ESTRUTURA DO PROJETO

```
PECUÁRIA PRO 4.0/
│
├── frontend/ (raiz)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Animais/          ← NOVO! 🐄
│   │   │   │   ├── ListaAnimais.jsx
│   │   │   │   ├── CardAnimal.jsx
│   │   │   │   ├── DetalhesAnimal.jsx
│   │   │   │   ├── AvaliacaoFenotipica.jsx
│   │   │   │   ├── AvaliacaoGenetica.jsx
│   │   │   │   ├── Genealogia.jsx
│   │   │   │   ├── FiltrosAnimais.jsx
│   │   │   │   └── animais.css
│   │   │   │
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SLAView.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js            ← NOVO!
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      ← NOVO! 🔧
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── animaisController.js
│   │
│   ├── routes/
│   │   └── animais.js
│   │
│   ├── services/
│   │   ├── GeradorAnimais.js
│   │   ├── SistemaGenetico.js
│   │   └── GeradorRegistros.js
│   │
│   ├── data/
│   │   ├── racas.json           (16 raças)
│   │   ├── associacoes.json     (10 associações)
│   │   └── nomes.json
│   │
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── README.md
│   └── INSTALACAO.md
│
└── docs/
    ├── reproducao e genética.md
    └── Melhoramento_Genetico_Racas_Bovinas.md
```

---

## 🚀 INSTALAÇÃO RÁPIDA

### **1. Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edite .env com suas credenciais MySQL
mysql -u root -p pecuaria_pro < database/schema.sql
npm run dev
```

### **2. Frontend**

```bash
# Na raiz do projeto
npm install
npm run dev
```

### **3. Acessar**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Documentação: `/backend/README.md`

---

## 🐂 16 RAÇAS IMPLEMENTADAS

### **Corte - Taurinas (4)**
1. Angus
2. Hereford
3. Charolês
4. Senepol

### **Corte - Zebuínas (5)**
5. Nelore
6. Brahman
7. Tabapuã
8. Guzerá
9. Sindi

### **Leiteiras (3)**
10. Holandesa
11. Jersey
12. Gir

### **Compostas (4)** ⭐
13. Girolando (5/8 Holandês + 3/8 Gir)
14. Bonsmara (50% Africander + 25% Hereford + 25% Shorthorn)
15. Santa Gertrudis (5/8 Shorthorn + 3/8 Brahman)
16. **Braford** (5/8 Hereford + 3/8 Zebu)

---

## 🧬 SISTEMA GENÉTICO

### **Características Quantitativas**
- Ganho de Peso Diário (kg/dia) - Heritabilidade 0.4
- Habilidade Materna (0-100) - Heritabilidade 0.2
- Fertilidade (%) - Heritabilidade 0.1
- Resistência a Doenças (0-100) - Heritabilidade 0.2
- Qualidade da Carne (0-100) - Heritabilidade 0.5

### **Características Qualitativas**
- Cor da Pelagem (Locus MC1R)
- Presença/Ausência de Chifres (P/p)

### **Heterose (Vigor Híbrido)**
- F1 Taurino × Zebuíno: 100% (máxima)
- F1 Zebuíno × Zebuíno: 60%
- F1 Taurino × Taurino: 40%
- Raças Compostas: Heterose FIXA

---

## 🏷️ ASSOCIAÇÕES IMPLEMENTADAS

1. **ABCZ** - Zebuínas (Nelore, Brahman, Tabapuã, Guzerá, Sindi, Gir)
2. **ABA** - Angus
3. **ABHB** - Hereford e Braford
4. **ABCCH** - Charolês
5. **ABCSEN** - Senepol
6. **ABCB** - Bonsmara
7. **ABCBRH** - Holandesa
8. **ABCG** - Girolando
9. **ABCJ** - Jersey
10. **ABSG** - Santa Gertrudis

---

## 📊 FUNCIONALIDADES

### ✅ **Implementadas**
- Geração procedural de animais
- Sistema de registro genealógico
- Cálculos genéticos realistas
- Heterose automática
- API REST completa
- Interface de visualização
- Filtros e busca
- Avaliação fenotípica
- Avaliação genética (DEPs)
- Árvore genealógica

### ⬜ **Próximas Features**
- Sistema de reprodução (cruzamentos)
- Central de Sêmen (IATF)
- Gestação e nascimento
- Endogamia completa
- Mercado/Leilões
- Gráficos de desempenho
- Sistema de economia

---

## 📖 DOCUMENTAÇÃO

- **Backend:** `backend/README.md`
- **Instalação:** `backend/INSTALACAO.md`
- **Genética:** `docs/reproducao e genética.md`
- **Raças:** `docs/Melhoramento_Genetico_Racas_Bovinas.md`

---

## 🎮 COMO JOGAR

1. Inicie o backend (`cd backend && npm run dev`)
2. Inicie o frontend (`npm run dev`)
3. Acesse http://localhost:5173
4. Clique em "🐄 Animais" no menu lateral
5. Explore seus animais!

---

## 🤝 CONTRIBUINDO

Este é um projeto educacional de simulação de genética bovina.

---

## 📝 LICENÇA

MIT License

---

**Desenvolvido com 🐄 e 🧬!**

