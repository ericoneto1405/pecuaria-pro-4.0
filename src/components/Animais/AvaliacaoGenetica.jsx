/**
 * AVALIAÇÃO GENÉTICA
 * Exibe DEPs e sumário genético do animal
 */

function AvaliacaoGenetica({ animal }) {
  const genotipo = animal.genotipo;
  
  const calcularPercentil = (valor, media) => {
    const percentual = ((valor - media) / media) * 100;
    if (percentual >= 20) return 1;
    if (percentual >= 15) return 3;
    if (percentual >= 10) return 5;
    if (percentual >= 5) return 10;
    if (percentual >= 0) return 20;
    return 50;
  };
  
  const categorizarDEP = (valor, media) => {
    const percentual = ((valor - media) / media) * 100;
    if (percentual >= 15) return { classe: 'elite', texto: '🏆 ELITE' };
    if (percentual >= 5) return { classe: 'superior', texto: '⭐ SUPERIOR' };
    if (percentual >= -5) return { classe: 'bom', texto: '✓ BOM' };
    return { classe: 'regular', texto: 'REGULAR' };
  };
  
  if (!genotipo.disponivel) {
    return (
      <div className="avaliacao-genetica avaliacao-genetica--indisponivel">
        <div className="info-box info-box--warning">
          <h3>📊 Dados Genéticos Indisponíveis</h3>
          <p>Este animal não participa de programas de melhoramento genético.</p>
          <p>DEPs e sumário genético não estão disponíveis.</p>
          
          <div className="acoes-genetica">
            <button className="btn btn--primary">
              📝 Inscrever em Programa de Melhoramento
            </button>
            <small>Custo: R$ 500 | Resultados em 6 meses (180 dias de jogo)</small>
          </div>
        </div>
        
        <div className="genetica-estimada">
          <h3>Avaliação Estimada (Baseada em Fenótipo)</h3>
          <div className="nota-estimada">
            <span>Nota Genética Estimada:</span>
            <strong>{genotipo.nota_genetica.toFixed(1)}/10</strong>
          </div>
        </div>
      </div>
    );
  }
  
  const genetica = genotipo.genetica;
  
  return (
    <div className="avaliacao-genetica">
      <header className="deps-header">
        <h2>📊 Sumário Genético</h2>
        <div className="deps-info">
          <span className="badge badge--programa">
            {animal.registro_associacao} - Programa de Melhoramento
          </span>
          <span className="deps-acuracia">
            Acurácia: {genotipo.acuracia || 85}%
          </span>
        </div>
      </header>
      
      <div className="deps-grid">
        
        {/* Ganho de Peso */}
        <div className="dep-card">
          <h3>Ganho de Peso Diário</h3>
          <div className="dep-valor">
            {genetica.ganho_peso_diario.toFixed(2)} kg/dia
          </div>
          <div className="dep-percentil">
            TOP {calcularPercentil(genetica.ganho_peso_diario, 1.40)}%
          </div>
          <div className={`dep-categoria dep-categoria--${categorizarDEP(genetica.ganho_peso_diario, 1.40).classe}`}>
            {categorizarDEP(genetica.ganho_peso_diario, 1.40).texto}
          </div>
        </div>
        
        {/* Habilidade Materna */}
        <div className="dep-card">
          <h3>Habilidade Materna</h3>
          <div className="dep-valor">
            {genetica.habilidade_materna.toFixed(1)}/100
          </div>
          <div className="dep-percentil">
            TOP {calcularPercentil(genetica.habilidade_materna, 75)}%
          </div>
          <div className={`dep-categoria dep-categoria--${categorizarDEP(genetica.habilidade_materna, 75).classe}`}>
            {categorizarDEP(genetica.habilidade_materna, 75).texto}
          </div>
        </div>
        
        {/* Fertilidade */}
        <div className="dep-card">
          <h3>Fertilidade</h3>
          <div className="dep-valor">
            {genetica.fertilidade.toFixed(1)}%
          </div>
          <div className="dep-percentil">
            TOP {calcularPercentil(genetica.fertilidade, 80)}%
          </div>
          <div className={`dep-categoria dep-categoria--${categorizarDEP(genetica.fertilidade, 80).classe}`}>
            {categorizarDEP(genetica.fertilidade, 80).texto}
          </div>
        </div>
        
        {/* Resistência */}
        <div className="dep-card">
          <h3>Resistência a Doenças</h3>
          <div className="dep-valor">
            {genetica.resistencia_doencas.toFixed(1)}/100
          </div>
          <div className="dep-percentil">
            TOP {calcularPercentil(genetica.resistencia_doencas, 80)}%
          </div>
          <div className={`dep-categoria dep-categoria--${categorizarDEP(genetica.resistencia_doencas, 80).classe}`}>
            {categorizarDEP(genetica.resistencia_doencas, 80).texto}
          </div>
        </div>
        
        {/* Qualidade da Carne */}
        <div className="dep-card">
          <h3>Qualidade da Carne</h3>
          <div className="dep-valor">
            {genetica.qualidade_carne.toFixed(1)}/100
          </div>
          <div className="dep-percentil">
            TOP {calcularPercentil(genetica.qualidade_carne, 75)}%
          </div>
          <div className={`dep-categoria dep-categoria--${categorizarDEP(genetica.qualidade_carne, 75).classe}`}>
            {categorizarDEP(genetica.qualidade_carne, 75).texto}
          </div>
        </div>
        
      </div>
      
      {/* Resumo Genético */}
      <div className="deps-resumo">
        <h3>Classificação Genética Geral</h3>
        <div className={`classificacao ${
          genotipo.nota_genetica >= 9 ? 'classificacao--elite' :
          genotipo.nota_genetica >= 7 ? 'classificacao--superior' :
          genotipo.nota_genetica >= 5 ? 'classificacao--bom' : 'classificacao--regular'
        }`}>
          <span className="classificacao__nota">{genotipo.nota_genetica.toFixed(1)}/10</span>
          <span className="classificacao__texto">
            {genotipo.nota_genetica >= 9 ? '🏆 ELITE' :
             genotipo.nota_genetica >= 7 ? '⭐ SUPERIOR' :
             genotipo.nota_genetica >= 5 ? '✓ BOM' : '⚠️ REGULAR'}
          </span>
        </div>
      </div>
      
      {/* Info sobre Heritabilidade */}
      <div className="info-box info-box--educativo">
        <h4>ℹ️ Sobre os Valores Genéticos</h4>
        <p>
          Esses valores representam a <strong>capacidade genética</strong> do animal 
          de transmitir características para seus filhos.
        </p>
        <ul>
          <li><strong>TOP 1-5%:</strong> Elite - Reprodutores excepcionais</li>
          <li><strong>TOP 10-20%:</strong> Superior - Ótimos reprodutores</li>
          <li><strong>TOP 20-50%:</strong> Bom - Adequados para reprodução</li>
          <li><strong>Abaixo de 50%:</strong> Regular - Considerar descarte</li>
        </ul>
      </div>
      
    </div>
  );
}

export default AvaliacaoGenetica;

