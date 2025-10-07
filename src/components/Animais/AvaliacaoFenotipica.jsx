/**
 * AVALIAÇÃO FENOTÍPICA
 * Exibe avaliação visual do animal (conformação, aprumos, etc)
 */

function AvaliacaoFenotipica({ animal }) {
  const fenotipo = animal.fenotipo;
  
  const renderEstrelas = (nota) => {
    const estrelas = Math.round(nota / 2);
    const completas = '⭐'.repeat(estrelas);
    const vazias = '☆'.repeat(5 - estrelas);
    return completas + vazias;
  };
  
  const renderBarraProgresso = (nota, className = '') => {
    return (
      <div className={`progress-bar ${className}`}>
        <div 
          className="progress-fill" 
          style={{ width: `${nota * 10}%` }}
        />
      </div>
    );
  };
  
  return (
    <div className="avaliacao-fenotipica">
      <h2 className="section-title">👁️ Avaliação Fenotípica</h2>
      <p className="section-subtitle">Características observáveis do animal</p>
      
      {/* Conformação Corporal */}
      <div className="avaliacao-item">
        <div className="avaliacao-item__header">
          <h3>🏗️ Conformação Corporal</h3>
          <span className="nota-tag">Nota: {fenotipo.conformacao.nota.toFixed(1)}/10</span>
        </div>
        
        {renderBarraProgresso(fenotipo.conformacao.nota, 'progress-bar--conformacao')}
        
        <div className="avaliacao-item__estrelas">
          {renderEstrelas(fenotipo.conformacao.nota)}
        </div>
        
        {fenotipo.conformacao.observacoes && fenotipo.conformacao.observacoes.length > 0 && (
          <ul className="observacoes-lista">
            {fenotipo.conformacao.observacoes.map((obs, i) => (
              <li key={i}>{obs}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Aprumos */}
      <div className="avaliacao-item">
        <div className="avaliacao-item__header">
          <h3>🦵 Aprumos</h3>
          <span className="nota-tag">Nota: {fenotipo.aprumos.nota.toFixed(1)}/10</span>
        </div>
        
        {renderBarraProgresso(fenotipo.aprumos.nota, 'progress-bar--aprumos')}
        
        <div className="avaliacao-item__estrelas">
          {renderEstrelas(fenotipo.aprumos.nota)}
        </div>
        
        {fenotipo.aprumos.observacoes && fenotipo.aprumos.observacoes.length > 0 && (
          <ul className="observacoes-lista">
            {fenotipo.aprumos.observacoes.map((obs, i) => (
              <li key={i}>{obs}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Potencial Reprodutivo */}
      <div className="avaliacao-item">
        <div className="avaliacao-item__header">
          <h3>{animal.sexo === 'M' ? '🐂' : '🐄'} Potencial Reprodutivo</h3>
          <span className="nota-tag">Nota: {fenotipo.reproducao.nota.toFixed(1)}/10</span>
        </div>
        
        {renderBarraProgresso(fenotipo.reproducao.nota, 'progress-bar--reproducao')}
        
        <div className="avaliacao-item__estrelas">
          {renderEstrelas(fenotipo.reproducao.nota)}
        </div>
        
        {fenotipo.reproducao.observacoes && fenotipo.reproducao.observacoes.length > 0 && (
          <ul className="observacoes-lista">
            {fenotipo.reproducao.observacoes.map((obs, i) => (
              <li key={i}>{obs}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Temperamento */}
      <div className="avaliacao-item">
        <div className="avaliacao-item__header">
          <h3>🧠 Temperamento</h3>
          <span className="nota-tag">Nota: {fenotipo.temperamento.nota.toFixed(1)}/10</span>
        </div>
        
        {renderBarraProgresso(fenotipo.temperamento.nota, 'progress-bar--temperamento')}
        
        <div className="avaliacao-item__estrelas">
          {renderEstrelas(fenotipo.temperamento.nota)}
        </div>
        
        {fenotipo.temperamento.observacoes && fenotipo.temperamento.observacoes.length > 0 && (
          <ul className="observacoes-lista">
            {fenotipo.temperamento.observacoes.map((obs, i) => (
              <li key={i}>{obs}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Características Visuais */}
      <div className="caracteristicas-visuais">
        <h3>👁️ Características Visuais</h3>
        <div className="visual-grid">
          <div className="visual-item">
            <dt>Pelagem</dt>
            <dd>{fenotipo.pelagem}</dd>
          </div>
          <div className="visual-item">
            <dt>Chifres</dt>
            <dd>{fenotipo.chifres}</dd>
          </div>
        </div>
      </div>
      
      {/* Resumo Final */}
      <div className="avaliacao-resumo">
        <h3>📊 Nota Fenotípica Final</h3>
        <div className="nota-final">
          <span className="nota-final__valor">{fenotipo.nota_fenotipica.toFixed(1)}/10</span>
          <div className="nota-final__estrelas">
            {renderEstrelas(fenotipo.nota_fenotipica)}
          </div>
          <div className="nota-final__categoria">
            {fenotipo.nota_fenotipica >= 9 ? '🏆 EXCELENTE' :
             fenotipo.nota_fenotipica >= 7 ? '⭐ MUITO BOM' :
             fenotipo.nota_fenotipica >= 5 ? '✓ BOM' : '⚠️ REGULAR'}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default AvaliacaoFenotipica;

