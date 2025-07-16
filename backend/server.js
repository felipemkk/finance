const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database');

// Carregar variáveis de ambiente
dotenv.config({ path: './config.env' });

// Importar rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const clientRoutes = require('./routes/clients');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware CORS - permitir acesso de qualquer origem na rede local
app.use(cors({
  origin: [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    /^http:\/\/192\.168\.\d+\.\d+:4200$/,  // IPs da rede local
    /^http:\/\/10\.\d+\.\d+\.\d+:4200$/,   // IPs da rede local
    /^http:\/\/172\.\d+\.\d+\.\d+:4200$/   // IPs da rede local
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/payments', paymentRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Finance Backend está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

// Testar conexão com banco antes de iniciar servidor
testConnection().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
    console.log(`🌐 URL Local: http://localhost:${PORT}`);
    console.log(`🌐 URL Rede: http://<SEU_IP>:${PORT}`);
    console.log(`🔗 Frontend: ${process.env.CORS_ORIGIN || 'http://localhost:4200'}`);
  });
}).catch((error) => {
  console.error('❌ Erro ao conectar com banco de dados:', error.message);
  console.log('📝 Verifique suas configurações no arquivo config.env');
});
