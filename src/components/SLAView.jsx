import fazendas from '../data/fazendas.json';

function SLAView({ showFazendas }) {
  return (
    <section className="sla">
      <header className="sla__header">
        <h1 className="sla__title">Acordo de Nível de Serviço</h1>
        <p className="sla__subtitle">
          Selecione a fazenda de referência para definir metas, indicadores e limites de alerta.
        </p>
      </header>

      {showFazendas ? (
        <div className="sla__farms">
          <h2 className="sla__farms-heading">Fazendas disponíveis</h2>
          <div className="sla__farm-grid">
            {fazendas.map((fazenda) => (
              <article key={fazenda.id} className="sla__farm-card">
                <header className="sla__farm-card-header">
                  <h3 className="sla__farm-name">{fazenda.nome}</h3>
                  {fazenda.dono ? <span className="sla__farm-owner">{fazenda.dono}</span> : null}
                </header>
                <dl className="sla__farm-meta">
                  <div className="sla__farm-meta-item">
                    <dt>Tamanho</dt>
                    <dd>{fazenda.tamanho_tarefas.toFixed(2)} tarefas</dd>
                  </div>
                  <div className="sla__farm-meta-item">
                    <dt>Produtividade</dt>
                    <dd>{fazenda.produtividade_arrobas_ha.toFixed(1)} @/ha</dd>
                  </div>
                  <div className="sla__farm-meta-item">
                    <dt>Clima</dt>
                    <dd>{fazenda.clima}</dd>
                  </div>
                  <div className="sla__farm-meta-item">
                    <dt>Solo</dt>
                    <dd>{fazenda.solo}</dd>
                  </div>
                  <div className="sla__farm-meta-item">
                    <dt>Pastagem</dt>
                    <dd>{fazenda.pastagem}</dd>
                  </div>
                </dl>
                <footer className="sla__farm-footer">
                  <span className="sla__farm-value">
                    Valor total: R$ {fazenda.valor_total.toLocaleString('pt-BR')}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="sla__empty">
          <p className="sla__empty-text">
            Clique em "Fazendas" na barra lateral para visualizar as propriedades disponíveis.
          </p>
        </div>
      )}
    </section>
  );
}

export default SLAView;
