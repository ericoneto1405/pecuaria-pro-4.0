/**
 * GERADOR PROCEDURAL DE ANIMAIS
 * Cria animais com genética e fenótipo realistas
 * Suporta raças puras, F1, mestiços e raças compostas
 */

const SistemaGenetico = require('./SistemaGenetico');
const GeradorRegistros = require('./GeradorRegistros');
const racasData = require('../data/racas.json');
const nomesData = require('../data/nomes.json');

class GeradorAnimais {
  
  /**
   * Gera um animal PURO (100% de uma raça)
   * @param {string} raca - Nome da raça
   * @param {string} sexo - 'M' ou 'F'
   * @param {string} qualidade - 'baixa', 'media', 'boa', 'elite'
   * @returns {Object} Animal completo
   */
  gerarAnimalPuro(raca, sexo, qualidade = 'media') {
    const perfil = racasData[raca];
    
    if (!perfil) {
      throw new Error(`Raça ${raca} não encontrada`);
    }
    
    // 1. Gerar valores genéticos baseados no perfil da raça
    const genetica = this._gerarGeneticaPura(perfil, qualidade);
    
    // 2. Gerar genótipos Mendelianos
    const genotipos = this._gerarGenotiposPuros(perfil);
    
    // 3. Calcular fenótipo (genótipo + ambiente)
    const fenotipo = SistemaGenetico.calcularFenotipo(genetica, genotipos);
    
    // 4. Gerar ID único
    const id = this._gerarID(raca);
    
    // 5. Nome aleatório
    const nome = this._gerarNome(raca, sexo);
    
    // 6. Registro genealógico (se aplicável)
    const registro = GeradorRegistros.gerarRegistro(raca, 'RD');
    
    // 7. Idade aleatória
    const idade_meses = this._gerarIdade();
    
    return {
      id,
      nome,
      sexo,
      data_nascimento: this._calcularDataNascimento(idade_meses),
      idade_meses,
      
      raca_principal: raca,
      tipo_animal: 'puro',
      composicao_racial: { [raca]: 1.0 },
      
      registro,
      
      genotipo: {
        disponivel: qualidade === 'elite' || qualidade === 'boa',
        genetica,
        genotipos,
        nota_genetica: this._calcularNotaGenetica(genetica)
      },
      
      fenotipo: {
        ...fenotipo,
        nota_fenotipica: this._calcularNotaFenotipica(fenotipo)
      },
      
      peso_kg: this._calcularPeso(genetica, idade_meses, sexo),
      condicao_corporal: 3.5, // Escala 1-5
      
      fazenda_id: null,
      pasto_id: null,
      
      genealogia: {
        id_pai: null,
        id_mae: null
      },
      
      valor_mercado: this._calcularValorMercado(genetica, fenotipo, perfil.valor_base, qualidade),
      
      metadata: {
        gerado_em: new Date().toISOString(),
        origem: 'procedural',
        versao_gerador: '1.0.0'
      }
    };
  }
  
  /**
   * Gera animal F1 (cruzamento de duas raças puras)
   * @param {string} raca1 - Primeira raça
   * @param {string} raca2 - Segunda raça
   * @param {string} sexo - 'M' ou 'F'
   * @returns {Object} Animal F1
   */
  gerarAnimalF1(raca1, raca2, sexo) {
    const perfil1 = racasData[raca1];
    const perfil2 = racasData[raca2];
    
    if (!perfil1 || !perfil2) {
      throw new Error(`Raça não encontrada: ${raca1} ou ${raca2}`);
    }
    
    // 1. Média dos valores genéticos + heterose
    const genetica = this._gerarGeneticaF1(perfil1, perfil2);
    
    // 2. Combinar genótipos (Quadro de Punnett)
    const genotipos = this._combinarGenotipos(perfil1, perfil2);
    
    // 3. Calcular fenótipo
    const fenotipo = SistemaGenetico.calcularFenotipo(genetica, genotipos);
    
    // 4. Calcular heterose
    const composicao_racial = {
      [raca1]: 0.5,
      [raca2]: 0.5
    };
    const heterose = this._calcularHeteroseF1(raca1, raca2);
    
    // Aplicar bônus de heterose
    this._aplicarBonusHeterose(genetica, heterose.bonus);
    
    const id = this._gerarID('F1');
    const nome = this._gerarNome('F1', sexo);
    const idade_meses = this._gerarIdade();
    
    return {
      id,
      nome,
      sexo,
      data_nascimento: this._calcularDataNascimento(idade_meses),
      idade_meses,
      
      raca_principal: `F1 ${raca1} × ${raca2}`,
      tipo_animal: 'F1',
      composicao_racial,
      
      registro: null, // F1 geralmente não tem registro
      
      genotipo: {
        disponivel: false,
        genetica,
        genotipos,
        nota_genetica: this._calcularNotaGenetica(genetica)
      },
      
      heterose: {
        coeficiente: heterose.coeficiente,
        bonus: heterose.bonus,
        tipo: heterose.tipo
      },
      
      fenotipo: {
        ...fenotipo,
        nota_fenotipica: this._calcularNotaFenotipica(fenotipo)
      },
      
      peso_kg: this._calcularPeso(genetica, idade_meses, sexo),
      condicao_corporal: 3.7, // F1 geralmente melhor condição
      
      fazenda_id: null,
      pasto_id: null,
      
      genealogia: {
        id_pai: null,
        id_mae: null
      },
      
      valor_mercado: this._calcularValorMercadoF1(genetica, fenotipo, perfil1.valor_base, perfil2.valor_base),
      
      metadata: {
        gerado_em: new Date().toISOString(),
        origem: 'procedural',
        tipo: 'F1',
        versao_gerador: '1.0.0'
      }
    };
  }
  
  /**
   * Gera animal de RAÇA COMPOSTA (Santa Gertrudis, Girolando, etc)
   * @param {string} raca - Nome da raça composta
   * @param {string} sexo - 'M' ou 'F'
   * @param {string} qualidade - 'baixa', 'media', 'boa', 'elite'
   * @returns {Object} Animal de raça composta
   */
  gerarAnimalRacaComposta(raca, sexo, qualidade = 'media') {
    const perfil = racasData[raca];
    
    if (!perfil || perfil.tipo !== 'composta') {
      throw new Error(`${raca} não é uma raça composta`);
    }
    
    // Raças compostas têm composição fixa
    const composicao_racial = perfil.composicao_base;
    
    // Genética baseada na média das raças componentes
    const genetica = this._gerarGeneticaRacaComposta(perfil, qualidade);
    
    // Genótipos combinados
    const genotipos = this._gerarGenotiposCompostos(perfil);
    
    const fenotipo = SistemaGenetico.calcularFenotipo(genetica, genotipos);
    
    const id = this._gerarID(raca);
    const nome = this._gerarNome(raca, sexo);
    const idade_meses = this._gerarIdade();
    
    // Raças compostas podem ter registro
    const registro = GeradorRegistros.gerarRegistro(raca, 'RG');
    
    return {
      id,
      nome,
      sexo,
      data_nascimento: this._calcularDataNascimento(idade_meses),
      idade_meses,
      
      raca_principal: raca,
      tipo_animal: 'composta',
      composicao_racial,
      
      registro,
      
      genotipo: {
        disponivel: qualidade === 'elite' || qualidade === 'boa',
        genetica,
        genotipos,
        nota_genetica: this._calcularNotaGenetica(genetica)
      },
      
      heterose: {
        coeficiente: 1.0, // Heterose fixa em raças compostas estabilizadas
        tipo: 'permanente',
        observacao: 'Heterose fixa - raça sintética estabilizada'
      },
      
      fenotipo: {
        ...fenotipo,
        nota_fenotipica: this._calcularNotaFenotipica(fenotipo)
      },
      
      peso_kg: this._calcularPeso(genetica, idade_meses, sexo),
      condicao_corporal: 3.6,
      
      fazenda_id: null,
      pasto_id: null,
      
      genealogia: {
        id_pai: null,
        id_mae: null
      },
      
      valor_mercado: this._calcularValorMercado(genetica, fenotipo, perfil.valor_base, qualidade),
      
      metadata: {
        gerado_em: new Date().toISOString(),
        origem: 'procedural',
        tipo: 'raca_composta',
        versao_gerador: '1.0.0'
      }
    };
  }
  
  /**
   * Gera animal MESTIÇO (composição complexa)
   * @param {Object} composicao_racial - {Nelore: 0.5, Angus: 0.3, Brahman: 0.2}
   * @param {string} sexo - 'M' ou 'F'
   * @returns {Object} Animal mestiço
   */
  gerarAnimalMestico(composicao_racial, sexo) {
    // Calcular genética ponderada pela composição
    const genetica = this._gerarGeneticaMestico(composicao_racial);
    
    // Genótipos misturados
    const genotipos = this._gerarGenotiposMesticos(composicao_racial);
    
    const fenotipo = SistemaGenetico.calcularFenotipo(genetica, genotipos);
    
    const id = this._gerarID('mestico');
    const nome = this._gerarNome('mestico', sexo);
    const idade_meses = this._gerarIdade();
    
    return {
      id,
      nome,
      sexo,
      data_nascimento: this._calcularDataNascimento(idade_meses),
      idade_meses,
      
      raca_principal: 'Mestiço',
      tipo_animal: 'mestico_complexo',
      composicao_racial,
      
      registro: null,
      
      genotipo: {
        disponivel: false,
        genetica,
        genotipos,
        nota_genetica: this._calcularNotaGenetica(genetica)
      },
      
      fenotipo: {
        ...fenotipo,
        nota_fenotipica: this._calcularNotaFenotipica(fenotipo)
      },
      
      peso_kg: this._calcularPeso(genetica, idade_meses, sexo),
      condicao_corporal: 3.3,
      
      fazenda_id: null,
      pasto_id: null,
      
      genealogia: {
        id_pai: null,
        id_mae: null
      },
      
      valor_mercado: this._calcularValorMercadoMestico(genetica, fenotipo),
      
      metadata: {
        gerado_em: new Date().toISOString(),
        origem: 'procedural',
        tipo: 'mestico',
        versao_gerador: '1.0.0'
      }
    };
  }
  
  /**
   * Gera um LOTE de animais
   * @param {number} quantidade - Quantos animais gerar
   * @param {Object} criterios - Critérios de geração
   * @returns {Array} Array de animais
   */
  gerarLote(quantidade, criterios = {}) {
    const animais = [];
    
    const {
      racas = ['Nelore'],
      sexos = { M: 0.5, F: 0.5 },
      qualidade = 'media',
      tipo = 'puro',
      idade_min = 24,
      idade_max = 60
    } = criterios;
    
    for (let i = 0; i < quantidade; i++) {
      // Sortear raça
      const raca = racas[Math.floor(Math.random() * racas.length)];
      
      // Sortear sexo baseado em proporção
      const sexo = Math.random() < sexos.M ? 'M' : 'F';
      
      let animal;
      
      if (tipo === 'puro') {
        animal = this.gerarAnimalPuro(raca, sexo, qualidade);
      } else if (tipo === 'F1' && racas.length >= 2) {
        animal = this.gerarAnimalF1(racas[0], racas[1], sexo);
      } else if (tipo === 'composta') {
        animal = this.gerarAnimalRacaComposta(raca, sexo, qualidade);
      }
      
      // Ajustar idade
      if (idade_min || idade_max) {
        animal.idade_meses = Math.floor(
          Math.random() * (idade_max - idade_min) + idade_min
        );
        animal.data_nascimento = this._calcularDataNascimento(animal.idade_meses);
        animal.peso_kg = this._calcularPeso(animal.genotipo.genetica, animal.idade_meses, animal.sexo);
      }
      
      animais.push(animal);
    }
    
    return animais;
  }
  
  // ========== MÉTODOS PRIVADOS ==========
  
  _gerarGeneticaPura(perfil, qualidade) {
    const multiplicador = {
      'baixa': 0.7,
      'media': 1.0,
      'boa': 1.2,
      'elite': 1.5
    }[qualidade];
    
    return {
      ganho_peso_diario: this._valorAleatorio(
        perfil.ganho_peso.media * multiplicador,
        perfil.ganho_peso.desvio
      ),
      habilidade_materna: this._valorAleatorio(
        perfil.hab_materna.media * multiplicador,
        perfil.hab_materna.desvio
      ),
      fertilidade: this._valorAleatorio(
        perfil.fertilidade.media * multiplicador,
        perfil.fertilidade.desvio
      ),
      resistencia_doencas: this._valorAleatorio(
        perfil.resistencia.media * multiplicador,
        perfil.resistencia.desvio
      ),
      qualidade_carne: this._valorAleatorio(
        perfil.qualidade_carne.media * multiplicador,
        perfil.qualidade_carne.desvio
      )
    };
  }
  
  _gerarGeneticaF1(perfil1, perfil2) {
    // Média das duas raças
    return {
      ganho_peso_diario: (perfil1.ganho_peso.media + perfil2.ganho_peso.media) / 2,
      habilidade_materna: (perfil1.hab_materna.media + perfil2.hab_materna.media) / 2,
      fertilidade: (perfil1.fertilidade.media + perfil2.fertilidade.media) / 2,
      resistencia_doencas: (perfil1.resistencia.media + perfil2.resistencia.media) / 2,
      qualidade_carne: (perfil1.qualidade_carne.media + perfil2.qualidade_carne.media) / 2
    };
  }
  
  _gerarGeneticaRacaComposta(perfil, qualidade) {
    // Similar ao puro, mas usa perfil da raça composta
    return this._gerarGeneticaPura(perfil, qualidade);
  }
  
  _gerarGeneticaMestico(composicao_racial) {
    const genetica = {
      ganho_peso_diario: 0,
      habilidade_materna: 0,
      fertilidade: 0,
      resistencia_doencas: 0,
      qualidade_carne: 0
    };
    
    // Média ponderada
    for (const [raca, percentual] of Object.entries(composicao_racial)) {
      const perfil = racasData[raca];
      if (perfil) {
        genetica.ganho_peso_diario += perfil.ganho_peso.media * percentual;
        genetica.habilidade_materna += perfil.hab_materna.media * percentual;
        genetica.fertilidade += perfil.fertilidade.media * percentual;
        genetica.resistencia_doencas += perfil.resistencia.media * percentual;
        genetica.qualidade_carne += perfil.qualidade_carne.media * percentual;
      }
    }
    
    return genetica;
  }
  
  _gerarGenotiposPuros(perfil) {
    return {
      pelagem_mc1r: this._sortearAlelos(perfil.alelos_pelagem),
      chifres: this._sortearAlelos(perfil.alelos_chifres)
    };
  }
  
  _combinarGenotipos(perfil1, perfil2) {
    return {
      pelagem_mc1r: SistemaGenetico.aplicarQuadroPunnett(
        this._sortearAlelos(perfil1.alelos_pelagem),
        this._sortearAlelos(perfil2.alelos_pelagem)
      ),
      chifres: SistemaGenetico.aplicarQuadroPunnett(
        this._sortearAlelos(perfil1.alelos_chifres),
        this._sortearAlelos(perfil2.alelos_chifres)
      )
    };
  }
  
  _gerarGenotiposCompostos(perfil) {
    return this._gerarGenotiposPuros(perfil);
  }
  
  _gerarGenotiposMesticos(composicao_racial) {
    // Simplificado - pegar primeira raça dominante
    const raca_dominante = Object.keys(composicao_racial)[0];
    const perfil = racasData[raca_dominante];
    return this._gerarGenotiposPuros(perfil);
  }
  
  _calcularHeteroseF1(raca1, raca2) {
    const animal1 = { composicao_racial: { [raca1]: 1.0 } };
    const animal2 = { composicao_racial: { [raca2]: 1.0 } };
    return SistemaGenetico.calcularHeterose(animal1, animal2);
  }
  
  _aplicarBonusHeterose(genetica, bonus) {
    genetica.habilidade_materna *= (1 + bonus.habilidade_materna);
    genetica.fertilidade *= (1 + bonus.fertilidade);
    genetica.ganho_peso_diario *= (1 + bonus.ganho_peso);
    genetica.resistencia_doencas *= (1 + bonus.resistencia);
    genetica.qualidade_carne *= (1 + bonus.qualidade_carne);
  }
  
  _gerarID(prefixo) {
    const ano = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const sequencial = `${timestamp}${random}`.slice(0, 6).padStart(6, '0');
    return `BOV-${ano}-${sequencial}`;
  }
  
  _gerarNome(raca, sexo) {
    const lista = sexo === 'M' ? nomesData.machos : nomesData.femeas;
    const sobrenome = nomesData.sobrenomes[Math.floor(Math.random() * nomesData.sobrenomes.length)];
    const nome = lista[Math.floor(Math.random() * lista.length)];
    return `${nome} ${sobrenome}`;
  }
  
  _gerarIdade() {
    // Entre 24 e 60 meses (2 a 5 anos)
    return Math.floor(Math.random() * 36) + 24;
  }
  
  _calcularDataNascimento(idade_meses) {
    const data = new Date();
    data.setMonth(data.getMonth() - idade_meses);
    return data.toISOString().split('T')[0];
  }
  
  _calcularPeso(genetica, idade_meses, sexo) {
    const peso_base = 32; // kg ao nascer
    const ganho_diario = genetica.ganho_peso_diario;
    const dias = idade_meses * 30;
    
    let peso = peso_base + (ganho_diario * dias);
    
    // Machos 10-15% mais pesados
    if (sexo === 'M') {
      peso *= 1.125;
    }
    
    return Math.round(peso * 10) / 10;
  }
  
  _calcularNotaGenetica(genetica) {
    const valores = Object.values(genetica);
    const media = valores.reduce((a, b) => a + b) / valores.length;
    return Math.min(10, Math.max(0, media / 10));
  }
  
  _calcularNotaFenotipica(fenotipo) {
    const notas = [
      fenotipo.conformacao.nota,
      fenotipo.aprumos.nota,
      fenotipo.reproducao.nota,
      fenotipo.temperamento.nota
    ];
    return notas.reduce((a, b) => a + b) / notas.length;
  }
  
  _calcularValorMercado(genetica, fenotipo, valor_base, qualidade) {
    const nota_gen = this._calcularNotaGenetica(genetica);
    const nota_fen = this._calcularNotaFenotipica(fenotipo);
    
    const mult_qualidade = {
      'baixa': 0.5,
      'media': 1.0,
      'boa': 1.5,
      'elite': 3.0
    }[qualidade];
    
    return Math.round(valor_base * (nota_gen / 5) * (nota_fen / 5) * mult_qualidade);
  }
  
  _calcularValorMercadoF1(genetica, fenotipo, valor_base1, valor_base2) {
    const valor_base = (valor_base1 + valor_base2) / 2;
    return this._calcularValorMercado(genetica, fenotipo, valor_base * 1.25, 'boa');
  }
  
  _calcularValorMercadoMestico(genetica, fenotipo) {
    return this._calcularValorMercado(genetica, fenotipo, 5000, 'media');
  }
  
  _valorAleatorio(media, desvio) {
    // Distribuição normal (Box-Muller)
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.max(0, media + z * desvio);
  }
  
  _sortearAlelos(opcoes) {
    const alelo1 = opcoes[Math.floor(Math.random() * opcoes.length)];
    const alelo2 = opcoes[Math.floor(Math.random() * opcoes.length)];
    return `${alelo1}${alelo2}`;
  }
}

module.exports = new GeradorAnimais();

