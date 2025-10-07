/**
 * DETALHES DO ANIMAL
 * Ficha completa com todas as informações
 */

import { useState } from 'react';
import AvaliacaoFenotipica from './AvaliacaoFenotipica';
import AvaliacaoGenetica from './AvaliacaoGenetica';
import Genealogia from './Genealogia';

function DetalhesAnimal({ animal, onVoltar }) {
  const [abaAtiva, setAbaAtiva] = useState('geral');
  
  const formatarData = (data) => {
    if (!data) return 'N/A';
    return new Date(data).toLocaleDateString('pt-BR');
  };
  
  const formatarIdade = (meses) => {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    return `${anos} anos e ${mesesRestantes} meses`;
  };
  
  const formatarTipo = (tipo) => {
    const tipos = {
      'puro': 'Puro de Origem (PO)',
      'F1': 'F1 (Primeira Geração)',
      'composta': 'Raça Composta',
      'mestico_complexo': 'Mestiço'
    };
    return tipos[tipo] || tipo;
  };
  
  return (
    <div className="animal-detalhes">
      {/* Botão Voltar */}
      <button onClick={onVoltar} className="btn btn--back">
        ← Voltar para Lista
      </button>
      
      {/* Header Principal */}
      <header className="animal-detalhes__header">
        <div className="animal-avatar">
          <div className="avatar-circle">
            {animal.sexo === 'M' ? '🐂' : '🐄'}
          </div>
        </div>
        
        <div className="animal-detalhes__info">
          <h1 className="animal-detalhes__nome">{animal.nome}</h1>
          
          <div className="identificacao-tags">
            <span className="tag tag--id">ID: {animal.id}</span>
            {animal.brinco_numero && (
              <span className="tag tag--brinco">
                Brinco #{animal.brinco_numero}
              </span>
            )}
            <span className="tag tag--sexo">
              {animal.sexo === 'M' ? '♂ Macho' : '♀ Fêmea'}
            </span>
          </div>
          
          {animal.registro_numero && (
            <div className="registro-display">
              <strong>📋 {animal.registro_numero}</strong>
              <small>{animal.registro_associacao}</small>
            </div>
          )}
        </div>
      </header>
      
      {/* Navegação por Abas */}
      <nav className="animal-tabs">
        <button 
          className={`tab ${abaAtiva === 'geral' ? 'tab--active' : ''}`}
          onClick={() => setAbaAtiva('geral')}
        >
          Geral
        </button>
        <button 
          className={`tab ${abaAtiva === 'genetica' ? 'tab--active' : ''}`}
          onClick={() => setAbaAtiva('genetica')}
        >
          Genética
        </button>
        <button 
          className={`tab ${abaAtiva === 'fenotipo' ? 'tab--active' : ''}`}
          onClick={() => setAbaAtiva('fenotipo')}
        >
          Fenótipo
        </button>
        <button 
          className={`tab ${abaAtiva === 'genealogia' ? 'tab--active' : ''}`}
          onClick={() => setAbaAtiva('genealogia')}
        >
          Genealogia
        </button>
      </nav>
      
      {/* Conteúdo da Aba */}
      <div className="animal-content">
        
        {/* ABA GERAL */}
        {abaAtiva === 'geral' && (
          <div className="aba-geral">
            
            {/* Informações Básicas */}
            <section className="info-section">
              <h2 className="info-section__title">📊 Informações Básicas</h2>
              <dl className="info-grid">
                <div className="info-item">
                  <dt>Raça</dt>
                  <dd>{animal.raca_principal}</dd>
                </div>
                <div className="info-item">
                  <dt>Tipo</dt>
                  <dd>{formatarTipo(animal.tipo_animal)}</dd>
                </div>
                <div className="info-item">
                  <dt>Data de Nascimento</dt>
                  <dd>{formatarData(animal.data_nascimento)}</dd>
                </div>
                <div className="info-item">
                  <dt>Idade</dt>
                  <dd>{formatarIdade(animal.idade_meses)}</dd>
                </div>
                <div className="info-item">
                  <dt>Peso Atual</dt>
                  <dd>{animal.peso_atual_kg} kg</dd>
                </div>
                <div className="info-item">
                  <dt>Condição Corporal</dt>
                  <dd>{animal.condicao_corporal}/5.0</dd>
                </div>
              </dl>
            </section>
            
            {/* Composição Racial */}
            {Object.keys(animal.composicao_racial).length > 1 && (
              <section className="composicao-section">
                <h2 className="info-section__title">🧬 Composição Racial</h2>
                <div className="composicao-chart">
                  {Object.entries(animal.composicao_racial).map(([raca, perc]) => (
                    <div key={raca} className="composicao-item">
                      <div className="composicao-header">
                        <span className="composicao-raca">{raca}</span>
                        <span className="composicao-percentual">{(perc * 100).toFixed(1)}%</span>
                      </div>
                      <div className="composicao-barra">
                        <div 
                          className="composicao-fill" 
                          style={{ width: `${perc * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Heterose */}
            {animal.heterose && animal.heterose.coeficiente > 0 && (
              <section className="heterose-section">
                <h2 className="info-section__title">⚡ Vigor Híbrido (Heterose)</h2>
                <div className="heterose-display">
                  <div className="heterose-valor-principal">
                    <span className="heterose-numero">{(animal.heterose.coeficiente * 100).toFixed(0)}%</span>
                    <span className="heterose-tipo">
                      {animal.heterose.tipo === 'permanente' ? 'Heterose Fixa' : 'Heterose F1'}
                    </span>
                  </div>
                  
                  {animal.heterose.bonus && (
                    <div className="heterose-bonus">
                      <h3>Bônus nas Características:</h3>
                      <ul className="bonus-lista">
                        <li>Habilidade Materna: <strong>+{(animal.heterose.bonus.habilidade_materna * 100).toFixed(1)}%</strong></li>
                        <li>Fertilidade: <strong>+{(animal.heterose.bonus.fertilidade * 100).toFixed(1)}%</strong></li>
                        <li>Ganho de Peso: <strong>+{(animal.heterose.bonus.ganho_peso * 100).toFixed(1)}%</strong></li>
                        {animal.heterose.bonus.resistencia && (
                          <li>Resistência: <strong>+{(animal.heterose.bonus.resistencia * 100).toFixed(1)}%</strong></li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
            
            {/* Valor de Mercado */}
            <section className="valor-section">
              <h2 className="info-section__title">💰 Valor de Mercado</h2>
              <div className="valor-display">
                <span className="valor-principal">
                  R$ {animal.valor_mercado?.toLocaleString('pt-BR')}
                </span>
                <small className="valor-subtitle">Estimativa baseada em genética e fenótipo</small>
              </div>
            </section>
            
          </div>
        )}
        
        {/* ABA GENÉTICA */}
        {abaAtiva === 'genetica' && (
          <AvaliacaoGenetica animal={animal} />
        )}
        
        {/* ABA FENÓTIPO */}
        {abaAtiva === 'fenotipo' && (
          <AvaliacaoFenotipica animal={animal} />
        )}
        
        {/* ABA GENEALOGIA */}
        {abaAtiva === 'genealogia' && (
          <Genealogia animal={animal} />
        )}
        
      </div>
    </div>
  );
}

export default DetalhesAnimal;

