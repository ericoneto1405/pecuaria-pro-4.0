/**
 * CONTROLLER DE ANIMAIS
 * Gerencia operações CRUD de animais
 */

const { pool } = require('../config/database');
const GeradorAnimais = require('../services/GeradorAnimais');

class AnimaisController {
  
  /**
   * GET /api/animais
   * Lista todos os animais de uma fazenda
   */
  async listar(req, res) {
    try {
      const { fazenda_id } = req.query;
      
      let query = 'SELECT * FROM animais WHERE ativo = TRUE';
      let params = [];
      
      if (fazenda_id) {
        query += ' AND fazenda_id = ?';
        params.push(fazenda_id);
      }
      
      query += ' ORDER BY data_nascimento DESC';
      
      const [animais] = await pool.execute(query, params);
      
      // Parse JSON fields
      const animaisFormatados = animais.map(a => ({
        ...a,
        composicao_racial: JSON.parse(a.composicao_racial),
        genotipo: JSON.parse(a.genotipo),
        fenotipo: JSON.parse(a.fenotipo),
        heterose: a.heterose ? JSON.parse(a.heterose) : null,
        registro_completo: a.registro_completo ? JSON.parse(a.registro_completo) : null
      }));
      
      res.json(animaisFormatados);
    } catch (error) {
      console.error('Erro ao listar animais:', error);
      res.status(500).json({ erro: 'Erro ao listar animais' });
    }
  }
  
  /**
   * GET /api/animais/:id
   * Busca um animal específico
   */
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      
      const [animais] = await pool.execute(
        'SELECT * FROM animais WHERE id = ? AND ativo = TRUE',
        [id]
      );
      
      if (animais.length === 0) {
        return res.status(404).json({ erro: 'Animal não encontrado' });
      }
      
      const animal = {
        ...animais[0],
        composicao_racial: JSON.parse(animais[0].composicao_racial),
        genotipo: JSON.parse(animais[0].genotipo),
        fenotipo: JSON.parse(animais[0].fenotipo),
        heterose: animais[0].heterose ? JSON.parse(animais[0].heterose) : null,
        registro_completo: animais[0].registro_completo ? JSON.parse(animais[0].registro_completo) : null
      };
      
      res.json(animal);
    } catch (error) {
      console.error('Erro ao buscar animal:', error);
      res.status(500).json({ erro: 'Erro ao buscar animal' });
    }
  }
  
  /**
   * POST /api/animais
   * Cria um novo animal
   */
  async criar(req, res) {
    try {
      const { raca, sexo, qualidade, tipo, fazenda_id } = req.body;
      
      let animal;
      
      if (tipo === 'composta') {
        animal = GeradorAnimais.gerarAnimalRacaComposta(raca, sexo, qualidade);
      } else if (tipo === 'puro') {
        animal = GeradorAnimais.gerarAnimalPuro(raca, sexo, qualidade);
      } else {
        return res.status(400).json({ erro: 'Tipo de animal inválido' });
      }
      
      // Associar à fazenda
      animal.fazenda_id = fazenda_id;
      
      // Inserir no banco
      await pool.execute(
        `INSERT INTO animais (
          id, brinco_numero, brinco_cor, brinco_lado,
          nome, sexo, data_nascimento,
          raca_principal, tipo_animal, composicao_racial,
          registro_numero, registro_associacao, registro_status, registro_data, registro_completo,
          genotipo, fenotipo, heterose,
          id_pai, id_mae,
          peso_atual_kg, condicao_corporal,
          fazenda_id, pasto_id,
          origem_tipo, origem_data,
          valor_mercado, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          animal.id,
          animal.registro?.identificacao_fisica?.brinco_numero,
          animal.registro?.identificacao_fisica?.brinco_cor,
          animal.registro?.identificacao_fisica?.brinco_lado || 'orelha_direita',
          animal.nome,
          animal.sexo,
          animal.data_nascimento,
          animal.raca_principal,
          animal.tipo_animal,
          JSON.stringify(animal.composicao_racial),
          animal.registro?.numero_completo,
          animal.registro?.associacao,
          animal.registro?.status,
          animal.registro?.data_registro,
          JSON.stringify(animal.registro),
          JSON.stringify(animal.genotipo),
          JSON.stringify(animal.fenotipo),
          animal.heterose ? JSON.stringify(animal.heterose) : null,
          animal.genealogia?.id_pai,
          animal.genealogia?.id_mae,
          animal.peso_kg,
          animal.condicao_corporal,
          animal.fazenda_id,
          animal.pasto_id,
          'geracao_procedural',
          new Date(),
          animal.valor_mercado,
          'ativo'
        ]
      );
      
      res.status(201).json(animal);
    } catch (error) {
      console.error('Erro ao criar animal:', error);
      res.status(500).json({ erro: 'Erro ao criar animal', detalhes: error.message });
    }
  }
  
  /**
   * PUT /api/animais/:id
   * Atualiza dados de um animal
   */
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, peso_atual_kg, condicao_corporal, pasto_id } = req.body;
      
      const updates = [];
      const params = [];
      
      if (nome) {
        updates.push('nome = ?');
        params.push(nome);
      }
      if (peso_atual_kg) {
        updates.push('peso_atual_kg = ?');
        params.push(peso_atual_kg);
      }
      if (condicao_corporal) {
        updates.push('condicao_corporal = ?');
        params.push(condicao_corporal);
      }
      if (pasto_id) {
        updates.push('pasto_id = ?');
        params.push(pasto_id);
      }
      
      params.push(id);
      
      await pool.execute(
        `UPDATE animais SET ${updates.join(', ')} WHERE id = ?`,
        params
      );
      
      res.json({ sucesso: true, mensagem: 'Animal atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      res.status(500).json({ erro: 'Erro ao atualizar animal' });
    }
  }
  
  /**
   * DELETE /api/animais/:id
   * Remove (soft delete) um animal
   */
  async remover(req, res) {
    try {
      const { id } = req.params;
      
      await pool.execute(
        'UPDATE animais SET ativo = FALSE, status = ? WHERE id = ?',
        ['vendido', id]
      );
      
      res.json({ sucesso: true, mensagem: 'Animal removido com sucesso' });
    } catch (error) {
      console.error('Erro ao remover animal:', error);
      res.status(500).json({ erro: 'Erro ao remover animal' });
    }
  }
  
  /**
   * POST /api/animais/gerar-lote
   * Gera um lote de animais
   */
  async gerarLote(req, res) {
    try {
      const { quantidade, racas, tipo, qualidade, fazenda_id } = req.body;
      
      const animais = GeradorAnimais.gerarLote(quantidade, {
        racas,
        tipo: tipo || 'puro',
        qualidade: qualidade || 'media'
      });
      
      // Inserir todos no banco
      for (const animal of animais) {
        animal.fazenda_id = fazenda_id;
        
        await pool.execute(
          `INSERT INTO animais (
            id, brinco_numero, brinco_cor, nome, sexo, data_nascimento,
            raca_principal, tipo_animal, composicao_racial,
            registro_numero, registro_associacao, registro_completo,
            genotipo, fenotipo, heterose,
            peso_atual_kg, condicao_corporal, fazenda_id,
            origem_tipo, valor_mercado, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            animal.id,
            animal.registro?.identificacao_fisica?.brinco_numero,
            animal.registro?.identificacao_fisica?.brinco_cor,
            animal.nome,
            animal.sexo,
            animal.data_nascimento,
            animal.raca_principal,
            animal.tipo_animal,
            JSON.stringify(animal.composicao_racial),
            animal.registro?.numero_completo,
            animal.registro?.associacao,
            JSON.stringify(animal.registro),
            JSON.stringify(animal.genotipo),
            JSON.stringify(animal.fenotipo),
            animal.heterose ? JSON.stringify(animal.heterose) : null,
            animal.peso_kg,
            animal.condicao_corporal,
            animal.fazenda_id,
            'geracao_procedural',
            animal.valor_mercado,
            'ativo'
          ]
        );
      }
      
      res.status(201).json({
        sucesso: true,
        mensagem: `${quantidade} animais gerados com sucesso`,
        animais
      });
    } catch (error) {
      console.error('Erro ao gerar lote:', error);
      res.status(500).json({ erro: 'Erro ao gerar lote', detalhes: error.message });
    }
  }
  
  /**
   * GET /api/animais/estatisticas/:fazenda_id
   * Estatísticas do rebanho
   */
  async estatisticas(req, res) {
    try {
      const { fazenda_id } = req.params;
      
      const [stats] = await pool.execute(
        'SELECT * FROM vw_estatisticas_fazenda WHERE fazenda_id = ?',
        [fazenda_id]
      );
      
      res.json(stats[0] || {});
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({ erro: 'Erro ao buscar estatísticas' });
    }
  }
}

module.exports = new AnimaisController();

