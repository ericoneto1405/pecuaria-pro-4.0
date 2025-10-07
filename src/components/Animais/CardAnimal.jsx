/**
 * CARD DE ANIMAL (Resumido)
 * Exibe informações resumidas de um animal
 */

function CardAnimal({ animal, onClick }) {
  const renderEstrelas = (nota) => {
    const estrelas = Math.round(nota / 2);
    return '⭐'.repeat(estrelas);
  };
  
  const formatarIdade = (meses) => {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    if (anos === 0) return `${mesesRestantes}m`;
    if (mesesRestantes === 0) return `${anos}a`;
    return `${anos}a ${mesesRestantes}m`;
  };
  
  const getTipoBadgeClass = (tipo) => {
    const classes = {
      'puro': 'badge--puro',
      'F1': 'badge--f1',
      'composta': 'badge--composta',
      'mestico_complexo': 'badge--mestico'
    };
    return classes[tipo] || 'badge--default';
  };
  
  return (
    <article className="animal-card" onClick={onClick}>
      {/* Header - Identificação */}
      <header className="animal-card__header">
        <div className="animal-card__id-row">
          <span className="animal-card__brinco">
            #{animal.brinco_numero || animal.id.slice(-6)}
          </span>
          <span className="animal-card__sexo">
            {animal.sexo === 'M' ? '♂' : '♀'}
          </span>
        </div>
        <h3 className="animal-card__nome">{animal.nome}</h3>
      </header>
      
      {/* Info Raça */}
      <div className="animal-card__raca-info">
        <span className={`badge ${getTipoBadgeClass(animal.tipo_animal)}`}>
          {animal.raca_principal}
        </span>
        
        {animal.registro_numero && (
          <div className="animal-card__registro">
            <small>📋 {animal.registro_numero}</small>
          </div>
        )}
      </div>
      
      {/* Métricas Grid */}
      <dl className="animal-card__metricas">
        <div className="metrica">
          <dt>Idade</dt>
          <dd>{formatarIdade(animal.idade_meses)}</dd>
        </div>
        <div className="metrica">
          <dt>Peso</dt>
          <dd>{animal.peso_atual_kg} kg</dd>
        </div>
        <div className="metrica">
          <dt>Genética</dt>
          <dd>{renderEstrelas(animal.genotipo.nota_genetica)}</dd>
        </div>
        <div className="metrica">
          <dt>Fenótipo</dt>
          <dd>{renderEstrelas(animal.fenotipo.nota_fenotipica)}</dd>
        </div>
      </dl>
      
      {/* Características Visuais */}
      <div className="animal-card__visual">
        <span className="tag tag--pelagem">{animal.fenotipo.pelagem}</span>
        <span className="tag tag--chifres">{animal.fenotipo.chifres}</span>
      </div>
      
      {/* Heterose (se aplicável) */}
      {animal.heterose && animal.heterose.coeficiente > 0 && (
        <div className="animal-card__heterose">
          <span className="badge badge--heterose">
            ⚡ Heterose {(animal.heterose.coeficiente * 100).toFixed(0)}%
          </span>
        </div>
      )}
      
      {/* Footer - Valor e Ação */}
      <footer className="animal-card__footer">
        <div className="animal-card__valor">
          <strong>R$ {animal.valor_mercado?.toLocaleString('pt-BR')}</strong>
        </div>
      </footer>
    </article>
  );
}

export default CardAnimal;

