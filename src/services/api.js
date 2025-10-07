/**
 * SERVIÇO DE API
 * Configuração e métodos para comunicação com backend
 */

const API_URL = 'http://localhost:3001/api';

class ApiService {
  
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.erro || 'Erro na requisição');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }
  
  // ========== ANIMAIS ==========
  
  async listarAnimais(fazenda_id) {
    return this.request(`/animais?fazenda_id=${fazenda_id}`);
  }
  
  async buscarAnimal(id) {
    return this.request(`/animais/${id}`);
  }
  
  async criarAnimal(dados) {
    return this.request('/animais', {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  }
  
  async gerarLote(dados) {
    return this.request('/animais/gerar-lote', {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  }
  
  async atualizarAnimal(id, dados) {
    return this.request(`/animais/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados)
    });
  }
  
  async removerAnimal(id) {
    return this.request(`/animais/${id}`, {
      method: 'DELETE'
    });
  }
  
  async obterEstatisticas(fazenda_id) {
    return this.request(`/animais/estatisticas/${fazenda_id}`);
  }
}

export default new ApiService();

