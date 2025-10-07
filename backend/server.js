/**
 * SERVIDOR PRINCIPAL - PECUÁRIA PRO 4.0
 * API REST para sistema de genética bovina
 */

const express = require('express');
const cors = require('cors');
const { testarConexao } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rotas
const animaisRoutes = require('./routes/animais');
app.use('/api/animais', animaisRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Pecuária Pro 4.0 - API',
    versao: '1.0.0',
    endpoints: {
      animais: '/api/animais',
      health: '/health'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ 
    erro: 'Erro interno do servidor',
    mensagem: err.message 
  });
});

// Iniciar servidor
async function iniciar() {
  try {
    // Testar conexão com banco
    const dbOk = await testarConexao();
    
    if (!dbOk) {
      console.log('⚠️  Banco de dados não conectado, mas servidor iniciará assim mesmo');
      console.log('📝 Configure o MySQL e execute: mysql -u root < backend/database/schema.sql');
    }
    
    app.listen(PORT, () => {
      console.log('');
      console.log('🐄 ════════════════════════════════════════════════');
      console.log('   PECUÁRIA PRO 4.0 - API BACKEND');
      console.log('   ════════════════════════════════════════════════');
      console.log('');
      console.log(`   🚀 Servidor rodando na porta ${PORT}`);
      console.log(`   🌐 URL: http://localhost:${PORT}`);
      console.log(`   📊 API: http://localhost:${PORT}/api/animais`);
      console.log(`   ❤️  Health: http://localhost:${PORT}/health`);
      console.log('');
      console.log('   ════════════════════════════════════════════════');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

iniciar();

module.exports = app;

