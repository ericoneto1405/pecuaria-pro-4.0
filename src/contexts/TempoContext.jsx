/**
 * CONTEXT DE TEMPO DO JOGO
 * Gerencia tempo, velocidade e eventos temporais
 * 
 * VELOCIDADES:
 * - PAUSE: 0 (pausado)
 * - NORMAL: 30 min de jogo a cada 1 hora real (0.5x)
 * - RAPIDO: 15 min de jogo a cada 1 hora real (0.25x)
 */

import { createContext, useContext, useState, useEffect, useRef } from 'react';

const TempoContext = createContext();

const VELOCIDADES = {
  PAUSE: 0,
  NORMAL: 1,    // 30 min jogo a cada 60 min reais
  RAPIDO: 2     // 15 min jogo a cada 60 min reais
};

export function TempoProvider({ children }) {
  const [dataAtual, setDataAtual] = useState(new Date('2025-01-01T08:00:00'));
  const [velocidade, setVelocidade] = useState(VELOCIDADES.PAUSE);
  const intervalRef = useRef(null);
  
  // Calcular quantos segundos do jogo passam por segundo real
  const getSegundosPorSegundo = (vel) => {
    if (vel === VELOCIDADES.PAUSE) return 0;
    // NORMAL: 30 min jogo = 1800 seg em 3600 seg reais = 0.5
    if (vel === VELOCIDADES.NORMAL) return 0.5;
    // RÁPIDO: 15 min jogo = 900 seg em 3600 seg reais = 0.25
    if (vel === VELOCIDADES.RAPIDO) return 0.25;
    return 0;
  };
  
  useEffect(() => {
    // Limpar interval anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Se pausado, não faz nada
    if (velocidade === VELOCIDADES.PAUSE) {
      console.log('⏸️ Tempo PAUSADO');
      return;
    }
    
    console.log(`⏰ Iniciando tempo - Velocidade: ${velocidade === VELOCIDADES.NORMAL ? 'NORMAL' : 'RÁPIDO'}`);
    
    // Atualizar a cada segundo
    intervalRef.current = setInterval(() => {
      setDataAtual(dataAnterior => {
        const novaData = new Date(dataAnterior);
        const segundosParaAdicionar = getSegundosPorSegundo(velocidade);
        novaData.setSeconds(novaData.getSeconds() + segundosParaAdicionar);
        console.log(`🕐 ${novaData.toLocaleTimeString('pt-BR')} [+${segundosParaAdicionar}s]`);
        return novaData;
      });
    }, 1000); // Tick a cada 1 segundo real
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [velocidade]);
  
  const pausar = () => {
    console.log('👆 Clique em PAUSAR');
    setVelocidade(VELOCIDADES.PAUSE);
  };
  
  const normal = () => {
    console.log('👆 Clique em NORMAL');
    setVelocidade(VELOCIDADES.NORMAL);
  };
  
  const rapido = () => {
    console.log('👆 Clique em RÁPIDO');
    setVelocidade(VELOCIDADES.RAPIDO);
  };
  
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
      minute: '2-digit',
      second: '2-digit'
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

