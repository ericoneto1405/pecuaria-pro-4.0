/**
 * SISTEMA GENÉTICO
 * Cálculos de herança genética, heterose, endogamia, fenótipo
 */

const racasData = require('../data/racas.json');

class SistemaGenetico {
  
  constructor() {
    this.RACAS_TAURINAS = ['Angus', 'Hereford', 'Charolês', 'Senepol', 'Holandesa', 'Jersey'];
    this.RACAS_ZEBUINAS = ['Nelore', 'Brahman', 'Tabapuã', 'Guzerá', 'Sindi', 'Gir'];
    this.RACAS_COMPOSTAS = ['Girolando', 'Bonsmara', 'Santa Gertrudis'];
  }
  
  /**
   * Calcula valores genéticos de um bezerro baseado nos pais
   * @param {Object} pai - Dados genéticos do pai
   * @param {Object} mae - Dados genéticos da mãe
   * @returns {Object} Valores genéticos do bezerro
   */
  calcularGeneticaBezerro(pai, mae) {
    const genetica_bezerro = {};
    
    const caracteristicas = [
      'ganho_peso_diario',
      'habilidade_materna',
      'fertilidade',
      'resistencia_doencas',
      'qualidade_carne'
    ];
    
    for (const caracteristica of caracteristicas) {
      const valor_pai = pai.genetica[caracteristica];
      const valor_mae = mae.genetica[caracteristica];
      
      // Média dos pais
      const media = (valor_pai + valor_mae) / 2;
      
      // Heritabilidade da característica
      const heritabilidade = this._obterHeritabilidade(caracteristica);
      
      // Variação ambiental (inversamente proporcional à heritabilidade)
      const desvio = 1 - heritabilidade;
      const variacao = this._distribuicaoNormal(0, desvio);
      
      // Valor final
      genetica_bezerro[caracteristica] = Math.max(0, Math.min(100, media + variacao));
    }
    
    return genetica_bezerro;
  }
  
  /**
   * Calcula heterose (vigor híbrido) entre dois animais
   * @param {Object} animal1 - Primeiro animal
   * @param {Object} animal2 - Segundo animal
   * @returns {Object} Coeficiente e bônus de heterose
   */
  calcularHeterose(animal1, animal2) {
    const comp1 = animal1.composicao_racial;
    const comp2 = animal2.composicao_racial;
    
    // Calcular diversidade genética
    const diversidade = this._calcularDiversidadeGenetica(comp1, comp2);
    
    // Heterose máxima em F1 Taurino × Zebuíno
    const percentual_taurino = this._calcularPercentualTipo(comp1, comp2, this.RACAS_TAURINAS);
    const percentual_zebuino = this._calcularPercentualTipo(comp1, comp2, this.RACAS_ZEBUINAS);
    
    let heterose_base = 0;
    
    // F1 Taurino × Zebuíno = heterose máxima
    if (percentual_taurino >= 0.4 && percentual_taurino <= 0.6 &&
        percentual_zebuino >= 0.4 && percentual_zebuino <= 0.6) {
      heterose_base = 1.0; // 100%
    } else {
      // Heterose proporcional à diversidade
      heterose_base = 2 * Math.min(percentual_taurino, percentual_zebuino);
    }
    
    // Ajuste por diversidade intra-grupo
    heterose_base *= (1 + diversidade * 0.3);
    heterose_base = Math.min(1.0, heterose_base);
    
    // Bônus por característica
    const bonus = {
      habilidade_materna: heterose_base * 0.15,
      fertilidade: heterose_base * 0.10,
      ganho_peso: heterose_base * 0.08,
      resistencia: heterose_base * 0.12,
      qualidade_carne: heterose_base * 0.05
    };
    
    return {
      coeficiente: heterose_base,
      bonus,
      tipo: this._classificarTipoCruzamento(percentual_taurino, percentual_zebuino)
    };
  }
  
  /**
   * Calcula coeficiente de endogamia
   * @param {Object} animal - Animal com genealogia
   * @returns {number} Coeficiente de endogamia (0 a 1)
   */
  calcularEndogamia(animal) {
    // Simplificado - em produção, calcular baseado em pedigree completo
    // Por ora, retornar 0 (sem endogamia)
    return 0;
  }
  
  /**
   * Aplica Quadro de Punnett para características qualitativas
   * @param {string} alelo_pai - Alelos do pai (ex: "Pp")
   * @param {string} alelo_mae - Alelos da mãe (ex: "pp")
   * @returns {string} Genótipo do filho
   */
  aplicarQuadroPunnett(alelo_pai, alelo_mae) {
    // Separar alelos
    const alelos_pai = alelo_pai.split('');
    const alelos_mae = alelo_mae.split('');
    
    // Sortear um alelo de cada
    const alelo_p = alelos_pai[Math.floor(Math.random() * alelos_pai.length)];
    const alelo_m = alelos_mae[Math.floor(Math.random() * alelos_mae.length)];
    
    // Ordenar alfabeticamente (convenção genética: maiúscula antes)
    const genotipo = [alelo_p, alelo_m].sort((a, b) => {
      if (a === a.toUpperCase() && b !== b.toUpperCase()) return -1;
      if (a !== a.toUpperCase() && b === b.toUpperCase()) return 1;
      return a.localeCompare(b);
    }).join('');
    
    return genotipo;
  }
  
  /**
   * Calcula fenótipo baseado em genótipo + ambiente
   * @param {Object} genetica - Valores genéticos
   * @param {Object} genotipos - Genótipos qualitativos
   * @returns {Object} Fenótipo observável
   */
  calcularFenotipo(genetica, genotipos) {
    // Componente ambiental aleatório
    const ambiente = this._gerarAmbiente();
    
    return {
      conformacao: {
        nota: this._calcularNotaFenotipica(genetica.ganho_peso_diario, ambiente),
        observacoes: []
      },
      aprumos: {
        nota: this._calcularNotaFenotipica(genetica.resistencia_doencas, ambiente),
        observacoes: []
      },
      reproducao: {
        nota: this._calcularNotaFenotipica(genetica.fertilidade, ambiente),
        observacoes: []
      },
      temperamento: {
        nota: Math.random() * 10, // Simplificado
        observacoes: []
      },
      pelagem: this._determinarPelagem(genotipos.pelagem_mc1r),
      chifres: this._determinarChifres(genotipos.chifres)
    };
  }
  
  /**
   * Calcula composição racial de um bezerro
   * @param {Object} composicao_pai
   * @param {Object} composicao_mae
   * @returns {Object} Composição racial do bezerro
   */
  calcularComposicaoRacial(composicao_pai, composicao_mae) {
    const composicao_bezerro = {};
    
    // Obter todas as raças presentes
    const racas = new Set([
      ...Object.keys(composicao_pai),
      ...Object.keys(composicao_mae)
    ]);
    
    for (const raca of racas) {
      const perc_pai = composicao_pai[raca] || 0;
      const perc_mae = composicao_mae[raca] || 0;
      
      const perc_bezerro = (perc_pai + perc_mae) / 2;
      
      if (perc_bezerro > 0) {
        composicao_bezerro[raca] = perc_bezerro;
      }
    }
    
    return composicao_bezerro;
  }
  
  /**
   * Classifica tipo de animal baseado na composição racial
   * @param {Object} composicao_racial
   * @returns {string} Tipo do animal
   */
  classificarTipoAnimal(composicao_racial) {
    const racas = Object.keys(composicao_racial);
    
    // Animal puro (100% de uma raça)
    if (racas.length === 1 && composicao_racial[racas[0]] >= 0.9999) {
      return 'puro';
    }
    
    // PO - Puro de Origem (>=93.75%)
    if (racas.length === 1 && composicao_racial[racas[0]] >= 0.9375) {
      return 'puro_origem';
    }
    
    // F1 (50%/50%)
    if (racas.length === 2) {
      const valores = Object.values(composicao_racial);
      if (Math.abs(valores[0] - 0.5) < 0.01 && Math.abs(valores[1] - 0.5) < 0.01) {
        return 'F1';
      }
    }
    
    // 3/4 (75% de uma raça)
    for (const raca of racas) {
      if (Math.abs(composicao_racial[raca] - 0.75) < 0.01) {
        return '3/4';
      }
    }
    
    // Mestiço complexo
    return 'mestico_complexo';
  }
  
  // ========== MÉTODOS PRIVADOS ==========
  
  _obterHeritabilidade(caracteristica) {
    const heritabilidades = {
      'ganho_peso_diario': 0.4,
      'habilidade_materna': 0.2,
      'fertilidade': 0.1,
      'resistencia_doencas': 0.2,
      'qualidade_carne': 0.5
    };
    return heritabilidades[caracteristica] || 0.3;
  }
  
  _distribuicaoNormal(media, desvio) {
    // Box-Muller transform
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return media + z * desvio;
  }
  
  _calcularDiversidadeGenetica(comp1, comp2) {
    const todas_racas = new Set([...Object.keys(comp1), ...Object.keys(comp2)]);
    let soma_diferencas = 0;
    
    for (const raca of todas_racas) {
      const perc1 = comp1[raca] || 0;
      const perc2 = comp2[raca] || 0;
      soma_diferencas += Math.abs(perc1 - perc2);
    }
    
    return soma_diferencas / 2; // Normalizar
  }
  
  _calcularPercentualTipo(comp1, comp2, racas_tipo) {
    let total1 = 0;
    let total2 = 0;
    
    for (const raca of racas_tipo) {
      total1 += comp1[raca] || 0;
      total2 += comp2[raca] || 0;
    }
    
    return (total1 + total2) / 2;
  }
  
  _classificarTipoCruzamento(perc_taurino, perc_zebuino) {
    if (perc_taurino >= 0.4 && perc_taurino <= 0.6 && 
        perc_zebuino >= 0.4 && perc_zebuino <= 0.6) {
      return 'F1_taurino_zebuino';
    }
    
    if (perc_zebuino > 0.6) return 'predominante_zebuino';
    if (perc_taurino > 0.6) return 'predominante_taurino';
    
    return 'misto';
  }
  
  _gerarAmbiente() {
    // Fator ambiental aleatório (-1 a +1)
    return (Math.random() - 0.5) * 2;
  }
  
  _calcularNotaFenotipica(valor_genetico, ambiente) {
    // Fenótipo = Genótipo + Ambiente
    const nota = (valor_genetico / 10) + ambiente;
    return Math.max(1, Math.min(10, nota));
  }
  
  _determinarPelagem(genotipo) {
    // Simplificado - expandir com lógica completa depois
    if (genotipo.includes('E^D')) return 'preto';
    if (genotipo === 'ee') return 'vermelho';
    return 'variado';
  }
  
  _determinarChifres(genotipo) {
    // P = mocho (dominante), p = com chifres (recessivo)
    if (genotipo.includes('P')) return 'mocho';
    return 'com_chifres';
  }
}

module.exports = new SistemaGenetico();

