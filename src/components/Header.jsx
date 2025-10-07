/**
 * HEADER COM RELÓGIO DO JOGO
 * Exibe data, hora e controles de velocidade
 */

import { useTempo } from '../contexts/TempoContext';

function Header() {
  const tempo = useTempo();
  
  return (
    <header className="header-tempo">
      {/* Data e Hora */}
      <div className="tempo-display">
        <div className="tempo-data">
          <span className="data-numero">{tempo.formatarData()}</span>
          <span className="data-dia">{tempo.getDiaDaSemana()}</span>
        </div>
        <div className="tempo-hora">{tempo.formatarHora()}</div>
      </div>
      
      {/* Controles de Velocidade */}
      <div className="tempo-controles">
        <button
          onClick={tempo.pausar}
          className={`btn-tempo ${tempo.estaPausado ? 'btn-tempo--active' : ''}`}
          title="Pausar"
          type="button"
        >
          ⏸
        </button>
        
        <button
          onClick={tempo.normal}
          className={`btn-tempo ${tempo.estaNormal ? 'btn-tempo--active' : ''}`}
          title="Normal (1 dia = 30 min)"
          type="button"
        >
          ▶
        </button>
        
        <button
          onClick={tempo.rapido}
          className={`btn-tempo ${tempo.estaRapido ? 'btn-tempo--active' : ''}`}
          title="Rápido (1 dia = 15 min)"
          type="button"
        >
          ▶▶
        </button>
      </div>
      
      {/* Indicador de Velocidade */}
      <div className="tempo-status">
        {tempo.estaPausado && <span className="status-badge status-pause">⏸ Pausado</span>}
        {tempo.estaNormal && <span className="status-badge status-normal">▶ Normal</span>}
        {tempo.estaRapido && <span className="status-badge status-rapido">▶▶ Rápido</span>}
      </div>
    </header>
  );
}

export default Header;
