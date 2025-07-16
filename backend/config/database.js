const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'finance_user',
  password: process.env.DB_PASSWORD || 'finance123',
  database: process.env.DB_NAME || 'finance_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Testar conexão
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
    connection.release();
  } catch (error) {
    console.error('❌ Erro ao conectar com MySQL:', error.message);
    console.log('📝 Verifique suas configurações no arquivo config.env');
  }
};

// Executar query
const executeQuery = async (query, params = []) => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('❌ Erro na query:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  testConnection,
  executeQuery
};
