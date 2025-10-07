/**
 * LISTA DE ANIMAIS
 * Componente principal para visualização de animais
 */

import { useState, useEffect } from 'react';
import CardAnimal from './CardAnimal';
import FiltrosAnimais from './FiltrosAnimais';
import DetalhesAnimal from './DetalhesAnimal';
import api from '../../services/api';

// Mock temporário enquanto não tem backend conectado
const MOCK_ANIMAIS = [
  {
    id: 'BOV-2025-001234',
    brinco_numero: '1234',
    nome: 'Imperador FIV',
    sexo: 'M',
    idade_meses: 32,
    raca_principal: 'Braford',
    tipo_animal: 'composta',
    composicao_racial: { Hereford: 0.625, Brahman: 0.25, Nelore: 0.125 },
    registro_numero: 'ABHB-BRA-RG-2025-001234',
    genotipo: { nota_genetica: 9.5, disponivel: true, genetica: { ganho_peso_diario: 1.48, habilidade_materna: 80, fertilidade: 86, resistencia_doencas: 83, qualidade_carne: 85 } },
    fenotipo: { pelagem: 'vermelho', chifres: 'mocho', nota_fenotipica: 8.5, conformacao: {nota: 8.2}, aprumos: {nota: 7.8}, reproducao: {nota: 9.5}, temperamento: {nota: 8.5} },
    heterose: { coeficiente: 1.0, tipo: 'permanente' },
    peso_atual_kg: 540,
    valor_mercado: 87000,
    fazenda_id: 1,
    pasto_id: 1
  },
  {
    id: 'BOV-2025-002345',
    brinco_numero: '2345',
    nome: 'Estrela da Manhã',
    sexo: 'F',
    idade_meses: 28,
    raca_principal: 'Nelore',
    tipo_animal: 'puro',
    composicao_racial: { Nelore: 1.0 },
    registro_numero: 'ABCZ-NEL-RD-2025-002345',
    genotipo: { nota_genetica: 8.2, disponivel: true, genetica: { ganho_peso_diario: 1.35, habilidade_materna: 75, fertilidade: 80, resistencia_doencas: 90, qualidade_carne: 70 } },
    fenotipo: { pelagem: 'cinza', chifres: 'mocho', nota_fenotipica: 7.8, conformacao: {nota: 7.5}, aprumos: {nota: 8.2}, reproducao: {nota: 9.0}, temperamento: {nota: 7.8} },
    peso_atual_kg: 420,
    valor_mercado: 32000,
    fazenda_id: 1,
    pasto_id: 2
  },
  {
    id: 'BOV-2025-003456',
    brinco_numero: '3456',
    nome: 'Relâmpago Cross',
    sexo: 'M',
    idade_meses: 24,
    raca_principal: 'F1 Nelore × Angus',
    tipo_animal: 'F1',
    composicao_racial: { Nelore: 0.5, Angus: 0.5 },
    registro_numero: null,
    genotipo: { nota_genetica: 8.8, disponivel: false, genetica: { ganho_peso_diario: 1.40, habilidade_materna: 72, fertilidade: 82, resistencia_doencas: 77, qualidade_carne: 82 } },
    fenotipo: { pelagem: 'preto', chifres: 'mocho', nota_fenotipica: 8.2, conformacao: {nota: 8.0}, aprumos: {nota: 8.5}, reproducao: {nota: 8.8}, temperamento: {nota: 7.5} },
    heterose: { coeficiente: 1.0, tipo: 'F1_taurino_zebuino', bonus: { habilidade_materna: 0.15, fertilidade: 0.10, ganho_peso: 0.08 } },
    peso_atual_kg: 480,
    valor_mercado: 45000,
    fazenda_id: 1,
    pasto_id: 1
  }
];

function ListaAnimais({ fazendaId = 1 }) {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animalSelecionado, setAnimalSelecionado] = useState(null);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    raca: 'todas',
    sexo: 'todos',
    busca: ''
  });
  
  useEffect(() => {
    carregarAnimais();
  }, [fazendaId]);
  
  const carregarAnimais = async () => {
    try {
      setLoading(true);
      // Tentar buscar do backend
      // const dados = await api.listarAnimais(fazendaId);
      // setAnimais(dados);
      
      // Por enquanto, usar mock
      setAnimais(MOCK_ANIMAIS);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
      // Fallback para mock em caso de erro
      setAnimais(MOCK_ANIMAIS);
    } finally {
      setLoading(false);
    }
  };
  
  const aplicarFiltros = (animais) => {
    return animais.filter(animal => {
      // Filtro de tipo
      if (filtros.tipo !== 'todos' && animal.tipo_animal !== filtros.tipo) {
        return false;
      }
      
      // Filtro de raça
      if (filtros.raca !== 'todas' && !animal.raca_principal.includes(filtros.raca)) {
        return false;
      }
      
      // Filtro de sexo
      if (filtros.sexo !== 'todos' && animal.sexo !== filtros.sexo) {
        return false;
      }
      
      // Busca
      if (filtros.busca) {
        const termo = filtros.busca.toLowerCase();
        const matchNome = animal.nome.toLowerCase().includes(termo);
        const matchId = animal.id.toLowerCase().includes(termo);
        const matchBrinco = animal.brinco_numero?.includes(termo);
        
        if (!matchNome && !matchId && !matchBrinco) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  const animaisFiltrados = aplicarFiltros(animais);
  
  const contarPorSexo = (sexo) => {
    return animais.filter(a => a.sexo === sexo).length;
  };
  
  if (animalSelecionado) {
    return (
      <DetalhesAnimal 
        animal={animalSelecionado} 
        onVoltar={() => setAnimalSelecionado(null)}
      />
    );
  }
  
  return (
    <div className="animais-view">
      {/* Header */}
      <header className="animais-view__header">
        <h1 className="animais-view__title">🐄 Meus Animais</h1>
        <div className="animais-view__stats">
          <div className="stat">
            <span className="stat__valor">{animais.length}</span>
            <span className="stat__label">Total</span>
          </div>
          <div className="stat">
            <span className="stat__valor">{contarPorSexo('M')}</span>
            <span className="stat__label">Machos</span>
          </div>
          <div className="stat">
            <span className="stat__valor">{contarPorSexo('F')}</span>
            <span className="stat__label">Fêmeas</span>
          </div>
        </div>
      </header>
      
      {/* Filtros */}
      <FiltrosAnimais filtros={filtros} onChange={setFiltros} />
      
      {/* Loading */}
      {loading && (
        <div className="animais-view__loading">
          <p>Carregando animais...</p>
        </div>
      )}
      
      {/* Grid de Cards */}
      {!loading && animaisFiltrados.length > 0 && (
        <div className="animais-grid">
          {animaisFiltrados.map(animal => (
            <CardAnimal 
              key={animal.id} 
              animal={animal}
              onClick={() => setAnimalSelecionado(animal)}
            />
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {!loading && animaisFiltrados.length === 0 && (
        <div className="animais-view__empty">
          <p className="animais-view__empty-text">
            {animais.length === 0 
              ? 'Nenhum animal cadastrado ainda.' 
              : 'Nenhum animal encontrado com os filtros selecionados.'}
          </p>
          {animais.length === 0 && (
            <button className="btn btn--primary">
              + Adicionar Primeiro Animal
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ListaAnimais;

