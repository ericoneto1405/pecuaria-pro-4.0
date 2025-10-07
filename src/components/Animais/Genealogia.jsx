/**
 * GENEALOGIA
 * Exibe árvore genealógica do animal
 */

function Genealogia({ animal }) {
  const genealogia = animal.genealogia || {};
  
  const temGenealogia = genealogia.id_pai || genealogia.id_mae;
  
  if (!temGenealogia) {
    return (
      <div className="genealogia genealogia--vazia">
        <div className="info-box info-box--warning">
          <h3>👨‍👩‍👦 Genealogia Desconhecida</h3>
          <p>
            {animal.tipo_animal === 'mestico_complexo' 
              ? 'Este animal é um mestiço de origem desconhecida. A genealogia não está disponível.'
              : 'A genealogia deste animal não foi registrada.'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="genealogia">
      <h2 className="section-title">👨‍👩‍👦 Árvore Genealógica</h2>
      
      <div className="arvore-genealogica">
        
        {/* Animal (centro) */}
        <div className="arvore-nivel arvore-nivel--0">
          <div className="animal-node animal-node--self">
            <div className="node-avatar">
              {animal.sexo === 'M' ? '🐂' : '🐄'}
            </div>
            <div className="node-info">
              <strong className="node-nome">{animal.nome}</strong>
              <small className="node-id">{animal.id}</small>
              <small className="node-raca">{animal.raca_principal}</small>
            </div>
          </div>
        </div>
        
        {/* Conectores */}
        <div className="arvore-conectores arvore-conectores--nivel1">
          <div className="conector conector--vertical"></div>
          <div className="conector conector--horizontal"></div>
        </div>
        
        {/* Pais (nível 1) */}
        <div className="arvore-nivel arvore-nivel--1">
          
          {/* Pai */}
          <div className={`animal-node animal-node--pai ${!genealogia.id_pai ? 'animal-node--desconhecido' : ''}`}>
            <div className="node-avatar">♂</div>
            <div className="node-info">
              <strong className="node-nome">
                {genealogia.nome_pai || 'Desconhecido'}
              </strong>
              {genealogia.id_pai && (
                <>
                  <small className="node-id">{genealogia.id_pai}</small>
                  <small className="node-raca">{genealogia.raca_pai || 'N/A'}</small>
                </>
              )}
            </div>
          </div>
          
          {/* Mãe */}
          <div className={`animal-node animal-node--mae ${!genealogia.id_mae ? 'animal-node--desconhecido' : ''}`}>
            <div className="node-avatar">♀</div>
            <div className="node-info">
              <strong className="node-nome">
                {genealogia.nome_mae || 'Desconhecido'}
              </strong>
              {genealogia.id_mae && (
                <>
                  <small className="node-id">{genealogia.id_mae}</small>
                  <small className="node-raca">{genealogia.raca_mae || 'N/A'}</small>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Avós (nível 2) - Futuro */}
        {genealogia.avos && (
          <div className="arvore-nivel arvore-nivel--2">
            <div className="info-box info-box--info">
              <p>🔍 Genealogia completa (avós e bisavós) será implementada em breve</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Informações Complementares */}
      <div className="genealogia-info">
        <h3>ℹ️ Informações da Genealogia</h3>
        <dl className="info-list">
          <div>
            <dt>Rastreabilidade:</dt>
            <dd>{temGenealogia ? 'Pais conhecidos ✓' : 'Pais desconhecidos'}</dd>
          </div>
          {animal.tipo_animal === 'puro' && (
            <div>
              <dt>Pode ser registrado:</dt>
              <dd>Sim (Puro de Origem) ✓</dd>
            </div>
          )}
          {animal.tipo_animal === 'F1' && (
            <div>
              <dt>Tipo de cruzamento:</dt>
              <dd>F1 - Heterose máxima ⚡</dd>
            </div>
          )}
        </dl>
      </div>
      
    </div>
  );
}

export default Genealogia;

