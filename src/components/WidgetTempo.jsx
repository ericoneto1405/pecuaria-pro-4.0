/**
 * WIDGET DE TEMPO - ESTILO MACOS SONOMA
 * Design inspirado na Apple com frosted glass e animações suaves
 */

import { useTempo } from '../contexts/TempoContext';

function WidgetTempo() {
  const tempo = useTempo();
  
  const formatarDataCompleta = () => {
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const diaSemana = diasSemana[tempo.dataAtual.getDay()];
    const dia = tempo.dataAtual.getDate();
    const mes = meses[tempo.dataAtual.getMonth()];
    const ano = tempo.dataAtual.getFullYear();
    const hora = tempo.formatarHora();
    
    return `${diaSemana}, ${dia} de ${mes} de ${ano} - ${hora}`;
  };
  
  const getIcone = () => {
    if (tempo.estaPausado) return '⏸️';
    if (tempo.estaNormal) return '▶️';
    if (tempo.estaRapido) return '⏩';
    return '⏸️';
  };
  
  const getTextoStatus = () => {
    if (tempo.estaPausado) return 'Tempo Pausado';
    if (tempo.estaNormal) return 'Tempo Normal';
    if (tempo.estaRapido) return 'Tempo Rápido';
    return 'Pausado';
  };
  
  const getStatusClass = () => {
    if (tempo.estaPausado) return 'widget-tempo--pausado';
    if (tempo.estaNormal) return 'widget-tempo--normal';
    if (tempo.estaRapido) return 'widget-tempo--rapido';
    return '';
  };
  
  return (
    <div className={`widget-tempo ${getStatusClass()}`}>
      {/* Título */}
      <div className="widget-tempo__titulo">Status do Tempo</div>
      
      {/* Layout em Grid: Ícone + Info */}
      <div className="widget-tempo__grid">
        {/* Coluna Esquerda: Ícone */}
        <div className="widget-tempo__icone-container">
          <div className="widget-tempo__icone" key={getIcone()}>
            {getIcone()}
          </div>
        </div>
        
        {/* Coluna Direita: Info + Controles */}
        <div className="widget-tempo__info">
          {/* Status Text */}
          <div className="widget-tempo__status">
            {getTextoStatus()}
          </div>
          
          {/* Data e Hora Completa */}
          <div className="widget-tempo__datetime">
            {formatarDataCompleta()}
          </div>
          
          {/* Controles Discretos */}
          <div className="widget-tempo__controles">
            <button
              onClick={tempo.pausar}
              className={`widget-btn ${tempo.estaPausado ? 'widget-btn--active' : ''}`}
              title="Pausar"
              type="button"
            >
              Pausar
            </button>
            <button
              onClick={tempo.normal}
              className={`widget-btn ${tempo.estaNormal ? 'widget-btn--active' : ''}`}
              title="Normal"
              type="button"
            >
              Normal
            </button>
            <button
              onClick={tempo.rapido}
              className={`widget-btn ${tempo.estaRapido ? 'widget-btn--active' : ''}`}
              title="Rápido"
              type="button"
            >
              Rápido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetTempo;

