/**
 * GERADOR DE REGISTROS GENEALÓGICOS
 * Cria números de registro oficiais para cada raça/associação
 */

const associacoesData = require('../data/associacoes.json');

class GeradorRegistros {
  
  /**
   * Gera número de registro oficial para animal puro
   * @param {string} raca - Nome da raça
   * @param {string} tipo_registro - RN, RD, LA, etc
   * @returns {Object|null} Objeto com dados do registro ou null se raça não tem associação
   */
  gerarRegistro(raca, tipo_registro = 'RD') {
    const associacao = this._obterAssociacaoPorRaca(raca);
    
    if (!associacao) {
      console.warn(`Raça ${raca} não possui associação registrada`);
      return null;
    }
    
    const ano = new Date().getFullYear();
    const sequencial = this._gerarSequencial();
    
    let numero_registro;
    
    // Gerar registro baseado no formato da associação
    switch (associacao.sigla) {
      case 'ABCZ':
        const sigla_raca = associacao.siglas_racas[raca];
        if (!sigla_raca) {
          console.error(`Sigla não encontrada para raça ${raca} na ABCZ`);
          return null;
        }
        numero_registro = `ABCZ-${sigla_raca}-${tipo_registro}-${ano}-${sequencial}`;
        break;
        
      case 'ABA':
        numero_registro = `ANG-${tipo_registro}-${ano}-${sequencial}`;
        break;
        
      case 'ABHB':
        const sigla_her = raca === 'Hereford' ? 'HER' : 'BRA';
        numero_registro = `ABHB-${sigla_her}-${tipo_registro}-${ano}-${sequencial}`;
        break;
        
      case 'ABCG':
        // Girolando tem graus de sangue
        const grau = this._sortearGrauSangue(associacao.graus_sangue);
        numero_registro = `GIR-${grau}-${ano}-${sequencial}`;
        break;
        
      case 'ABSG':
        // Santa Gertrudis
        numero_registro = `ABSG-RG-${ano}-${sequencial}`;
        break;
        
      default:
        // Formato padrão
        numero_registro = `${associacao.sigla}-RG-${ano}-${sequencial}`;
    }
    
    return {
      numero_completo: numero_registro,
      associacao: associacao.sigla,
      associacao_nome: associacao.nome_completo,
      tipo_registro,
      ano_registro: ano,
      sequencial,
      status: 'ativo',
      data_registro: new Date().toISOString(),
      
      identificacao_fisica: this._gerarIdentificacaoFisica(associacao, sequencial, raca),
      
      website_associacao: associacao.website || null,
      programas_melhoramento: associacao.programas_melhoramento || []
    };
  }
  
  /**
   * Gera identificação física (tatuagens, brincos) baseada nas regras da associação
   * @private
   */
  _gerarIdentificacaoFisica(associacao, sequencial, raca) {
    const config = associacao.identificacao_fisica || {};
    
    let tatuagem_direita = config.tatuagem_orelha_direita || associacao.sigla;
    
    // Casos especiais
    if (tatuagem_direita === 'sigla_raca' && associacao.siglas_racas) {
      tatuagem_direita = associacao.siglas_racas[raca] || associacao.sigla;
    }
    
    return {
      tatuagem_obrigatoria: config.tatuagem_obrigatoria || false,
      tatuagem_orelha_direita: tatuagem_direita,
      tatuagem_orelha_esquerda: config.tatuagem_orelha_esquerda === 'sequencial' 
        ? sequencial 
        : sequencial,
      brinco_numero: sequencial,
      brinco_cor: config.brinco_cor_padrao || 'amarelo',
      brinco_obrigatorio: config.brinco_obrigatorio || false,
      microchip: null
    };
  }
  
  /**
   * Valida se um número de registro está no formato correto
   * @param {string} numero_registro - Número a validar
   * @returns {boolean}
   */
  validarFormatoRegistro(numero_registro) {
    // Padrão geral: SIGLA-TIPO-ANO-SEQUENCIAL
    const pattern = /^[A-Z]{2,6}-[A-Z0-9\/]{1,4}-\d{4}-\d{6}$/;
    return pattern.test(numero_registro);
  }
  
  /**
   * Extrai informações de um número de registro
   * @param {string} numero_registro - Número completo
   * @returns {Object|null}
   */
  parseRegistro(numero_registro) {
    if (!this.validarFormatoRegistro(numero_registro)) {
      return null;
    }
    
    const partes = numero_registro.split('-');
    
    return {
      associacao: partes[0],
      tipo_ou_raca: partes[1],
      ano: parseInt(partes[2]),
      sequencial: partes[3]
    };
  }
  
  /**
   * Busca associação responsável por uma raça
   * @private
   */
  _obterAssociacaoPorRaca(raca) {
    for (const [key, assoc] of Object.entries(associacoesData.associacoes)) {
      if (assoc.racas && assoc.racas.includes(raca)) {
        return assoc;
      }
    }
    return null;
  }
  
  /**
   * Gera número sequencial único
   * @private
   */
  _gerarSequencial() {
    // Em produção, isso viria do banco de dados
    // Por ora, usar timestamp + random
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${timestamp.slice(0, 3)}${random}`.padStart(6, '0');
  }
  
  /**
   * Sorteia grau de sangue para Girolando
   * @private
   */
  _sortearGrauSangue(graus) {
    if (!graus || graus.length === 0) {
      return '5/8'; // Padrão
    }
    return graus[Math.floor(Math.random() * graus.length)];
  }
  
  /**
   * Lista todas as associações disponíveis
   * @returns {Array}
   */
  listarAssociacoes() {
    return Object.values(associacoesData.associacoes).map(a => ({
      sigla: a.sigla,
      nome: a.nome_completo,
      racas: a.racas,
      website: a.website
    }));
  }
  
  /**
   * Obtem informações detalhadas de uma associação
   * @param {string} sigla - Sigla da associação
   * @returns {Object|null}
   */
  obterAssociacao(sigla) {
    return associacoesData.associacoes[sigla] || null;
  }
}

module.exports = new GeradorRegistros();

