/**
 * CONTEXT DE TEMPO DO JOGO
 * Gerencia tempo, velocidade e eventos temporais
 * 
 * VELOCIDADES:
 * - PAUSE: 0 (pausado)
 * - NORMAL: 1 dia real = 30 min jogo
 * - RAPIDO: 1 dia real = 15 min jogo
 */

import { createContext, useContext, useState, useEffect, useRef } from 'react';

const TempoContext = createContext();

const VELOCIDADES = {
  PAUSE: 0,
  NORMAL: 2,    // 1 dia (1440 min) em 30 min reais = 48x
  RAPIDO: 4     // 1 dia (1440 min) em 15 min reais = 96x
};

export function TempoProvider({ children }) {
  const [dataAtual, setDataAtual] = useState(new Date('2025-01-01T08:00:00'));
  const [velocidade, setVelocidade] = useState(VELOCIDADES.PAUSE);
  const intervalRef = useRef(null);
  
  // Calcular quantos minutos do jogo passam por segundo real
  const getMinutosPorSegundo = (vel) => {
    if (vel === VELOCIDADES.PAUSE) return 0;
    if (vel === VELOCIDADES.NORMAL) return 1440 / (30 * 60); // 0.8 min jogo/seg
    if (vel === VELOCIDADES.RAPIDO) return 1440 / (15 * 60); // 1.6 min jogo/seg
    return 0;
  };
  
  useEffect(() => {
    // Limpar interval anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Se pausado, não faz nada
    if (velocidade === VELOCIDADES.PAUSE) {
      return;
    }
    
    // Atualizar a cada segundo
    intervalRef.current = setInterval(() => {
      setDataAtual(dataAnterior => {
        const novaData = new Date(dataAnterior);
        const minutosParaAdicionar = getMinutosPorSegundo(velocidade);
        novaData.setMinutes(novaData.getMinutes() + minutosParaAdicionar);
        return novaData;
      });
    }, 1000); // Tick a cada 1 segundo real
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [velocidade]);
  
  const pausar = () => setVelocidade(VELOCIDADES.PAUSE);
  const normal = () => setVelocidade(VELOCIDADES.NORMAL);
  const rapido = () => setVelocidade(VELOCIDADES.RAPIDO);
  
  const formatarData = () => {
    return dataAtual.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const formatarHora = () => {
    return dataAtual.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getDiaDaSemana = () => {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dias[dataAtual.getDay()];
  };
  
  const value = {
    dataAtual,
    velocidade,
    pausar,
    normal,
    rapido,
    formatarData,
    formatarHora,
    getDiaDaSemana,
    estaPausado: velocidade === VELOCIDADES.PAUSE,
    estaNormal: velocidade === VELOCIDADES.NORMAL,
    estaRapido: velocidade === VELOCIDADES.RAPIDO,
    VELOCIDADES
  };
  
  return (
    <TempoContext.Provider value={value}>
      {children}
    </TempoContext.Provider>
  );
}

export function useTempo() {
  const context = useContext(TempoContext);
  if (!context) {
    throw new Error('useTempo deve ser usado dentro de TempoProvider');
  }
  return context;
}

export default TempoContext;

