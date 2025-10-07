# 🐄 Sistema de Genética Bovina - Backend

Sistema completo de geração procedural de animais bovinos com genética realista, incluindo **16 raças brasileiras** (5 taurinas, 5 zebuínas, 3 compostas e 3 leiteiras).

## 📋 Características Principais

- ✅ **16 raças completas** com perfis genéticos realistas
- ✅ **Genética quantitativa** (poligênica) e **qualitativa** (mendeliana)
- ✅ **Heterose** (vigor híbrido) calculada automaticamente
- ✅ **Raças compostas** com heterose permanente (Santa Gertrudis, Girolando, Bonsmara)
- ✅ **Sistema de registro genealógico** para 10 associações brasileiras
- ✅ **Quadro de Punnett** para herança de características qualitativas
- ✅ **Fenótipo vs Genótipo** (ambiente influencia a expressão)

## 🏗️ Estrutura de Arquivos

```
backend/
├── data/
│   ├── racas.json              # Perfis genéticos das 16 raças
│   ├── associacoes.json        # 10 associações brasileiras
│   └── nomes.json              # Nomes para geração aleatória
│
├── services/
│   ├── GeradorAnimais.js       # 🔥 Gerador procedural de animais
│   ├── SistemaGenetico.js      # Cálculos genéticos
│   ├── GeradorRegistros.js     # Registros genealógicos
│   └── exemplo-uso.js          # Exemplos práticos
│
└── README.md                   # Este arquivo
```

## 🐂 Raças Implementadas (16)

### Corte - Taurinas (5)
1. **Angus** - Alta qualidade de carne
2. **Hereford** - Cara branca, excelente ganho de peso
3. **Charolês** - Grande porte, alta produção
4. **Senepol** - Adaptado ao calor, mocho
5. **Santa Gertrudis** ⭐ - Raça composta (5/8 Shorthorn + 3/8 Brahman)

### Corte - Zebuínas (5)
6. **Nelore** - Mais criada no Brasil
7. **Brahman** - Alta habilidade materna
8. **Tabapuã** - Dócil, boa habilidade materna
9. **Guzerá** - Dupla aptidão
10. **Sindi** - Pequeno, rústico

### Leiteiras (3)
11. **Holandesa** - Alta produção de leite
12. **Girolando** ⭐ - Raça composta (Gir × Holandês)
13. **Jersey** - Alto teor de gordura
14. **Gir** - Base do Girolando

### Compostas (2)
15. **Bonsmara** ⭐ - Sul-africana (50% Africander + 25% Hereford + 25% Shorthorn)
16. **Santa Gertrudis** ⭐ - Primeira raça composta reconhecida (USDA 1940)

## 🧬 Características Genéticas Implementadas

### Quantitativas (Poligênicas)
- Ganho de Peso Diário (kg/dia) - Heritabilidade 0.4
- Habilidade Materna (0-100) - Heritabilidade 0.2
- Fertilidade (%) - Heritabilidade 0.1
- Resistência a Doenças (0-100) - Heritabilidade 0.2
- Qualidade da Carne (0-100) - Heritabilidade 0.5

### Qualitativas (Mendelianas)
- **Cor da Pelagem** - Locus MC1R (E^D, e)
- **Presença de Chifres** - Mocho (P) dominante, aspado (p) recessivo

## 🚀 Como Usar

### 1. Gerar Animal Puro

```javascript
const GeradorAnimais = require('./services/GeradorAnimais');

const nelore = GeradorAnimais.gerarAnimalPuro('Nelore', 'M', 'elite');

console.log(nelore.id);                    // BOV-2025-001234
console.log(nelore.nome);                  // Trovão FIV
console.log(nelore.registro.numero_completo); // ABCZ-NEL-RD-2025-001234
console.log(nelore.valor_mercado);         // 45000
```

### 2. Gerar Animal F1

```javascript
const f1 = GeradorAnimais.gerarAnimalF1('Nelore', 'Angus', 'F');

console.log(f1.raca_principal);            // F1 Nelore × Angus
console.log(f1.heterose.coeficiente);      // 1.0 (100% - máxima)
console.log(f1.heterose.bonus);            // { habilidade_materna: 0.15, ... }
```

### 3. Gerar Santa Gertrudis (Raça Composta)

```javascript
const santa = GeradorAnimais.gerarAnimalRacaComposta('Santa Gertrudis', 'M', 'boa');

console.log(santa.raca_principal);         // Santa Gertrudis
console.log(santa.composicao_racial);      // { Shorthorn: 0.625, Brahman: 0.375 }
console.log(santa.registro.numero_completo); // ABSG-RG-2025-012345
console.log(santa.heterose.tipo);          // permanente
```

### 4. Gerar Mestiço

```javascript
const mestico = GeradorAnimais.gerarAnimalMestico({
  'Nelore': 0.5,
  'Angus': 0.3,
  'Brahman': 0.2
}, 'F');

console.log(mestico.raca_principal);       // Mestiço
console.log(mestico.composicao_racial);    // (rastreada internamente)
console.log(mestico.registro);             // null (sem registro)
```

### 5. Gerar Lote

```javascript
const lote = GeradorAnimais.gerarLote(20, {
  racas: ['Nelore', 'Angus'],
  sexos: { M: 0.1, F: 0.9 },  // 10% machos, 90% fêmeas
  qualidade: 'media',
  tipo: 'puro',
  idade_min: 24,
  idade_max: 60
});

console.log(lote.length);  // 20
```

## 🏷️ Sistema de Registro

### Formatos por Associação

| Associação | Raças | Formato | Exemplo |
|------------|-------|---------|---------|
| **ABCZ** | Nelore, Brahman, Tabapuã, Guzerá, Sindi, Gir | `ABCZ-[RACA]-[TIPO]-[ANO]-[SEQ]` | `ABCZ-NEL-RD-2025-123456` |
| **ABA** | Angus | `ANG-[TIPO]-[ANO]-[SEQ]` | `ANG-RGD-2025-012345` |
| **ABHB** | Hereford, Braford | `ABHB-[RACA]-[TIPO]-[ANO]-[SEQ]` | `ABHB-HER-RGD-2025-008234` |
| **ABCCH** | Charolês | `CHA-RG-[ANO]-[SEQ]` | `CHA-RG-2025-003456` |
| **ABCSEN** | Senepol | `SEN-RG-[ANO]-[SEQ]` | `SEN-RG-2025-001122` |
| **ABSG** | Santa Gertrudis | `ABSG-RG-[ANO]-[SEQ]` | `ABSG-RG-2025-012345` |
| **ABCBRH** | Holandesa | `HOL-[TIPO]-[ANO]-[SEQ]` | `HOL-RGD-2025-456789` |
| **ABCG** | Girolando | `GIR-[GRAU]-[ANO]-[SEQ]` | `GIR-5/8-2025-234567` |
| **ABCJ** | Jersey | `JER-RG-[ANO]-[SEQ]` | `JER-RG-2025-067890` |
| **ABCB** | Bonsmara | `BON-RG-[ANO]-[SEQ]` | `BON-RG-2025-000789` |

## 📊 Estrutura de Dados - Animal

```javascript
{
  // Identificação
  id: "BOV-2025-001234",
  nome: "Imperador FIV",
  sexo: "M",
  data_nascimento: "2023-01-15",
  idade_meses: 24,
  
  // Classificação Racial
  raca_principal: "Nelore PO",
  tipo_animal: "puro",  // puro, F1, composta, mestico_complexo
  composicao_racial: { "Nelore": 1.0 },
  
  // Registro
  registro: {
    numero_completo: "ABCZ-NEL-RD-2025-001234",
    associacao: "ABCZ",
    tipo_registro: "RD",
    identificacao_fisica: {
      tatuagem_orelha_direita: "ABCZ",
      tatuagem_orelha_esquerda: "001234",
      brinco_numero: "001234",
      brinco_cor: "amarelo"
    }
  },
  
  // Genótipo (dados genéticos)
  genotipo: {
    disponivel: true,
    genetica: {
      ganho_peso_diario: 1.45,
      habilidade_materna: 78.5,
      fertilidade: 85.2,
      resistencia_doencas: 92.1,
      qualidade_carne: 76.8
    },
    genotipos: {
      pelagem_mc1r: "E^De",
      chifres: "P_gp"
    },
    nota_genetica: 8.5
  },
  
  // Fenótipo (observável)
  fenotipo: {
    conformacao: { nota: 7.5, observacoes: [] },
    aprumos: { nota: 8.2, observacoes: [] },
    reproducao: { nota: 9.0, observacoes: [] },
    temperamento: { nota: 7.8, observacoes: [] },
    pelagem: "cinza",
    chifres: "mocho",
    nota_fenotipica: 8.1
  },
  
  // Heterose (se aplicável)
  heterose: {
    coeficiente: 1.0,
    bonus: {
      habilidade_materna: 0.15,
      fertilidade: 0.10,
      ganho_peso: 0.08
    }
  },
  
  // Físico
  peso_kg: 420,
  condicao_corporal: 3.5,
  
  // Localização
  fazenda_id: null,
  pasto_id: null,
  
  // Genealogia
  genealogia: {
    id_pai: "BOV-2023-000145",
    id_mae: "BOV-2022-000891"
  },
  
  // Valor
  valor_mercado: 45000
}
```

## 🧪 Testar o Sistema

```bash
cd backend/services
node exemplo-uso.js
```

Isso irá gerar exemplos de todos os tipos de animais e exibir suas características.

## 📚 Conceitos Implementados

### Heterose (Vigor Híbrido)
- **F1 Taurino × Zebuíno**: Heterose máxima (100%)
- **F1 Zebuíno × Zebuíno**: Heterose moderada (60%)
- **F1 Taurino × Taurino**: Heterose baixa (40%)
- **Raças Compostas**: Heterose fixa e permanente

### Endogamia
- Sistema preparado para calcular coeficiente de endogamia
- Penalidades: ↓ Fertilidade, ↓ Resistência, ↓ Vigor geral
- (Implementação completa requer genealogia de múltiplas gerações)

### Fenótipo vs Genótipo
```
Fenótipo = Genótipo + Ambiente
```
- Animais com mesma genética podem ter fenótipos diferentes
- Ambiente influencia a expressão das características
- Jogador vê o fenótipo, sistema rastreia o genótipo

## 🎯 Próximos Passos (Opcional)

1. ✅ **Integração com banco de dados** (PostgreSQL/MongoDB)
2. ✅ **API REST** para frontend React
3. ✅ **Sistema de cruzamentos** (reprodução entre animais do jogador)
4. ✅ **Central de Sêmen** (IATF com touros elite)
5. ✅ **Cálculo completo de endogamia** (pedigree de N gerações)
6. ✅ **Genômica** (marcadores moleculares, SNPs)
7. ✅ **Programas de melhoramento** (DEPs, sumários de touros)

## 📖 Referências

- **ABCZ** - Associação Brasileira dos Criadores de Zebu
- **ABSG** - Associação Brasileira da Raça Santa Gertrudis
- Documentos de genética bovina (`docs/`)
- Sistema SISBOV (identificação individual)

## 📝 Licença

Este sistema foi desenvolvido para o jogo **Pecuária Pro 4.0** com fins educacionais.

---

**Desenvolvido com 🧬 e 🐄 para simular a genética bovina de forma realista!**

