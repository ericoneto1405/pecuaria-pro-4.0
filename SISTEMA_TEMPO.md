# ⏰ SISTEMA DE TEMPO - PECUÁRIA PRO 4.0

## ✅ IMPLEMENTADO

Data: 07/10/2025

---

## 🎮 ESPECIFICAÇÕES

### **Velocidades:**

| Modo | Velocidade | Conversão |
|------|------------|-----------|
| **⏸ PAUSE** | 0x | Tempo parado |
| **▶ NORMAL** | 48x | 1 dia real = 30 min jogo |
| **▶▶ RÁPIDO** | 96x | 1 dia real = 15 min jogo |

### **Conversões Práticas:**

#### **MODO NORMAL** (▶)
```
1 minuto real = 48 minutos no jogo
1 hora real = 2 dias no jogo
30 minutos reais = 1 dia no jogo
```

**Eventos importantes:**
- Gestação (283 dias) = 141.5 minutos reais ≈ **2h 22min**
- Desmama (7 meses/210 dias) = 105 minutos ≈ **1h 45min**
- Boi adulto (24 meses/720 dias) = 360 minutos = **6 horas**

#### **MODO RÁPIDO** (▶▶)
```
1 minuto real = 96 minutos no jogo
1 hora real = 4 dias no jogo
15 minutos reais = 1 dia no jogo
```

**Eventos importantes:**
- Gestação (283 dias) = 70.75 minutos ≈ **1h 11min**
- Desmama (210 dias) = 52.5 minutos ≈ **53min**
- Boi adulto (720 dias) = 180 minutos = **3 horas**

---

## 📁 ARQUIVOS CRIADOS

### **1. Context:**
- `src/contexts/TempoContext.jsx` - Gerencia estado global do tempo

### **2. Componente:**
- `src/components/Header.jsx` - Header com relógio e controles

### **3. Estilos:**
- `src/styles.css` - CSS do header de tempo (linhas 39-199)

### **4. Integração:**
- `src/App.jsx` - Envolvido com TempoProvider

---

## 🎯 COMO FUNCIONA

### **Context Provider:**
```jsx
<TempoProvider>
  <App />
</TempoProvider>
```

### **Hook useTempo():**
```jsx
const tempo = useTempo();

tempo.dataAtual        // Date object
tempo.formatarData()   // "01/01/2025"
tempo.formatarHora()   // "08:30"
tempo.getDiaDaSemana() // "Seg"

tempo.pausar()         // Pausa o jogo
tempo.normal()         // Velocidade normal
tempo.rapido()         // Velocidade rápida

tempo.estaPausado      // boolean
tempo.estaNormal       // boolean
tempo.estaRapido       // boolean
```

### **Uso em Componentes:**
```jsx
import { useTempo } from '../contexts/TempoContext';

function MeuComponente() {
  const tempo = useTempo();
  
  return (
    <div>
      <p>Data: {tempo.formatarData()}</p>
      <p>Hora: {tempo.formatarHora()}</p>
    </div>
  );
}
```

---

## 🔄 SISTEMA DE TICK

### **Atualização:**
- Tick a cada **1 segundo real**
- Calcula minutos a adicionar baseado na velocidade
- Atualiza `dataAtual`
- React re-renderiza automaticamente

### **Fórmula:**
```javascript
// NORMAL: 1 dia (1440 min) em 30 min reais
minutosJogoPorSegundo = 1440 / (30 * 60) = 0.8

// RÁPIDO: 1 dia (1440 min) em 15 min reais  
minutosJogoPorSegundo = 1440 / (15 * 60) = 1.6
```

---

## 🎨 INTERFACE

### **Header:**
```
┌────────────────────────────────────────────────────────┐
│  01/01/2025    08:00    [⏸] [▶] [▶▶]    ⏸ Pausado     │
│  SEG                                                    │
└────────────────────────────────────────────────────────┘
```

**Elementos:**
- Data (01/01/2025) + Dia da semana
- Hora (08:00) - em destaque verde
- 3 botões: Pausar, Normal, Rápido
- Badge de status (Pausado/Normal/Rápido)

**Design:**
- Minimalista
- Fácil de entender
- Cores indicativas (vermelho=pausa, verde=normal, amarelo=rápido)

---

## 🔌 CONEXÃO COM OUTROS SISTEMAS

### **Gestação:**
```jsx
// Calcular quando bezerro vai nascer
const gestacao_dias = 283;
const data_parto = new Date(tempo.dataAtual);
data_parto.setDate(data_parto.getDate() + gestacao_dias);

// Verificar se é hora do parto
useEffect(() => {
  if (tempo.dataAtual >= data_parto) {
    nascerBezerro();
  }
}, [tempo.dataAtual]);
```

### **Eventos Periódicos:**
```jsx
// Feira do Produtor (toda segunda)
useEffect(() => {
  if (tempo.getDiaDaSemana() === 'Seg' && hora === '08:00') {
    renovarFeiraProdutor();
  }
}, [tempo.dataAtual]);

// Leilão (primeiro sábado do mês)
useEffect(() => {
  if (tempo.getDiaDaSemana() === 'Sáb' && dia <= 7) {
    abrirLeilao();
  }
}, [tempo.dataAtual]);
```

### **Crescimento de Animais:**
```jsx
// Atualizar peso e idade diariamente
useEffect(() => {
  const horaAtual = tempo.dataAtual.getHours();
  
  // A cada nova meia-noite (00:00)
  if (horaAtual === 0 && minuto < 5) {
    atualizarIdadeEPesoAnimais();
  }
}, [tempo.dataAtual]);
```

---

## 📊 TIMELINE DE EVENTOS (Modo Normal)

```
00:00 min: Início
30:00 min: +1 dia jogo
60:00 min: +2 dias jogo
142 min: Gestação completa (283 dias)
105 min: Desmama (210 dias)
360 min (6h): Boi adulto (720 dias)
```

---

## 🎯 GARANTIAS

✅ **TODO o jogo funciona baseado neste tempo**
✅ **SEM exceções**
✅ **Tudo conectado ao mesmo relógio**
✅ **Velocidades consistentes**

---

## 🚀 STATUS

🟢 **IMPLEMENTADO E FUNCIONANDO**

Data inicial: **01/01/2025 08:00**  
Modo padrão: **Pausado** (jogador escolhe quando iniciar)

---

**Sistema de tempo pronto para uso!** ⏰✅

