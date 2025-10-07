# 🍎 Widget macOS Sonoma - Sistema de Tempo

## 📋 Visão Geral

Widget inspirado no design do macOS Sonoma para controlar e exibir o sistema de tempo do jogo. Centralizado no header com efeito **frosted glass** (vidro fosco) e animações suaves.

---

## ✨ Características

### Design Visual

- **Frosted Glass Effect**: Backdrop-filter com blur 40px
- **Tipografia**: SF Pro Display (sistema Apple)
- **Bordas**: Arredondadas 16px
- **Cores**: Tema escuro com transparências
- **Sombras**: Multicamadas para profundidade
- **Bordas**: Mudam de cor conforme o estado

### Elementos do Widget

1. **Título**: "Status do Tempo" (pequeno e discreto)
2. **Ícone Central**: Muda conforme o modo
   - ⏸️ Pausado (vermelho)
   - ▶️ Normal (verde)
   - ⏩ Rápido (amarelo com pulse)
3. **Status Text**: Nome do estado atual
4. **Data e Hora**: Formato completo brasileiro
5. **Controles**: 3 botões discretos (Pausar/Normal/Rápido)

---

## 🎨 Animações

### Entrada do Ícone
```css
@keyframes icone-entrada {
  0% {
    transform: scale(0.8) rotate(-10deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
```

### Pulse no Modo Rápido
- Ícone pulsa suavemente
- Borda emite ondas expansivas
- Animação infinita suave

### Hover no Widget
- Fundo fica mais claro
- Borda mais visível
- Sombra aumenta
- Transição cubic-bezier suave

---

## 📱 Responsividade

### Desktop (> 768px)
- Widget tamanho normal
- Padding generoso
- Ícone 3.5rem
- Todos elementos visíveis

### Mobile (≤ 768px)
- Padding reduzido
- Ícone 3rem
- Controles em wrap
- Data/hora fonte menor

---

## 🎯 Estados do Widget

### Pausado
- Borda: `rgba(255, 69, 58, 0.3)` (vermelho)
- Ícone: ⏸️
- Sem animações

### Normal
- Borda: `rgba(52, 199, 89, 0.3)` (verde)
- Ícone: ▶️
- Sem animações

### Rápido
- Borda: `rgba(255, 214, 10, 0.3)` (amarelo)
- Ícone: ⏩
- **Pulse animation** ativa

---

## 🔧 Uso

### Importação
```jsx
import WidgetTempo from './components/WidgetTempo';
```

### No Header
```jsx
function Header() {
  return (
    <header className="header-macos">
      <WidgetTempo />
    </header>
  );
}
```

### Com Context
```jsx
const tempo = useTempo();
```

O widget consome automaticamente:
- `tempo.dataAtual`
- `tempo.estaPausado`
- `tempo.estaNormal`
- `tempo.estaRapido`
- `tempo.pausar()`
- `tempo.normal()`
- `tempo.rapido()`

---

## 🎨 Cores Apple

### Botão Ativo (Apple Blue)
```css
background: rgba(10, 132, 255, 0.8);
```

### Estados de Borda
- **Pause**: RGB(255, 69, 58) - Apple Red
- **Normal**: RGB(52, 199, 89) - Apple Green
- **Rápido**: RGB(255, 214, 10) - Apple Yellow

---

## 📊 Formato de Data/Hora

```
Ter, 07 de Outubro de 2025 - 04:32
```

Componentes:
- Dia da semana abreviado
- Dia do mês
- Mês por extenso
- Ano completo
- Hora:Minuto (formato 24h)

---

## 🚀 Performance

### Otimizações
- CSS puro (sem JS desnecessário)
- Animações GPU-accelerated
- Backdrop-filter com fallback
- Transições cubic-bezier otimizadas
- Re-render apenas quando tempo muda

### Browser Support
- ✅ Chrome/Edge: Completo
- ✅ Safari: Completo (inclui -webkit-backdrop-filter)
- ✅ Firefox: Frosted glass limitado
- ⚠️ IE: Não suportado (ok, ninguém usa IE)

---

## 📦 Arquivos Relacionados

```
src/
├── components/
│   ├── WidgetTempo.jsx      # Componente do widget
│   └── Header.jsx            # Header simplificado
├── contexts/
│   └── TempoContext.jsx      # Context do tempo
└── styles.css                # Estilos macOS
```

---

## 🎯 Próximos Recursos

- [ ] Notificações quando mudar velocidade
- [ ] Atalhos de teclado (espaço = pausar)
- [ ] Tooltip com info detalhada
- [ ] Som sutil ao mudar velocidade
- [ ] Preferências de exibição (compacto/completo)

---

**Design inspirado em:** macOS Sonoma Widgets  
**Paleta de cores:** Apple Human Interface Guidelines  
**Tipografia:** SF Pro Display (sistema)  
**Animações:** Natural e responsivas

