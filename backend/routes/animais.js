/**
 * ROTAS DE ANIMAIS
 */

const express = require('express');
const router = express.Router();
const animaisController = require('../controllers/animaisController');

// Listar animais
router.get('/', animaisController.listar.bind(animaisController));

// Buscar animal específico
router.get('/:id', animaisController.buscarPorId.bind(animaisController));

// Criar animal
router.post('/', animaisController.criar.bind(animaisController));

// Gerar lote de animais
router.post('/gerar-lote', animaisController.gerarLote.bind(animaisController));

// Estatísticas do rebanho
router.get('/estatisticas/:fazenda_id', animaisController.estatisticas.bind(animaisController));

// Atualizar animal
router.put('/:id', animaisController.atualizar.bind(animaisController));

// Remover animal
router.delete('/:id', animaisController.remover.bind(animaisController));

module.exports = router;

