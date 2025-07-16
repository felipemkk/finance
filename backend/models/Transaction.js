const { executeQuery } = require('../config/database');

class Transaction {
  static async create(transactionData) {
    const { user_id, description, amount, type, category, transaction_date } = transactionData;
    
    // Garantir que não há valores undefined
    const cleanData = {
      user_id: user_id || 1, // Default user ID para teste
      description: description || '',
      amount: amount || 0,
      type: type || 'expense',
      category: category || null,
      transaction_date: transaction_date || new Date().toISOString().split('T')[0]
    };
    
    const query = 'INSERT INTO transactions (user_id, description, amount, type, category, transaction_date) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await executeQuery(query, [
      cleanData.user_id, 
      cleanData.description, 
      cleanData.amount, 
      cleanData.type, 
      cleanData.category, 
      cleanData.transaction_date
    ]);
    return result.insertId;
  }

  static async findAll() {
    const query = 'SELECT * FROM transactions ORDER BY transaction_date DESC';
    return await executeQuery(query);
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC';
    return await executeQuery(query, [userId]);
  }

  static async findById(id) {
    const query = 'SELECT * FROM transactions WHERE id = ?';
    const transactions = await executeQuery(query, [id]);
    return transactions[0];
  }

  static async update(id, transactionData) {
    const { description, amount, type, category, transaction_date } = transactionData;
    const query = 'UPDATE transactions SET description = ?, amount = ?, type = ?, category = ?, transaction_date = ? WHERE id = ?';
    await executeQuery(query, [description, amount, type, category || null, transaction_date, id]);
  }

  static async delete(id) {
    const query = 'DELETE FROM transactions WHERE id = ?';
    await executeQuery(query, [id]);
  }

  static async findByType(userId, type) {
    const query = 'SELECT * FROM transactions WHERE user_id = ? AND type = ? ORDER BY transaction_date DESC';
    return await executeQuery(query, [userId, type]);
  }

  static async findByMonth(userId, year, month) {
    const query = `
      SELECT * FROM transactions 
      WHERE user_id = ? 
      AND YEAR(transaction_date) = ? 
      AND MONTH(transaction_date) = ?
      ORDER BY transaction_date DESC
    `;
    return await executeQuery(query, [userId, year, month]);
  }

  static async findByCategory(userId, category) {
    const query = 'SELECT * FROM transactions WHERE user_id = ? AND category = ? ORDER BY transaction_date DESC';
    return await executeQuery(query, [userId, category]);
  }

  static async getMonthlyBalance(userId, year, month) {
    const query = `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as totalIncome,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as totalExpenses,
        SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
      FROM transactions 
      WHERE user_id = ? 
      AND YEAR(transaction_date) = ? 
      AND MONTH(transaction_date) = ?
    `;
    const result = await executeQuery(query, [userId, year, month]);
    const balance = result[0];
    
    // Buscar transações do mês
    const transactions = await this.findByMonth(userId, year, month);
    
    return {
      month: month,
      year: year,
      totalIncome: balance.totalIncome || 0,
      totalExpenses: balance.totalExpenses || 0,
      balance: balance.balance || 0,
      transactions: transactions
    };
  }

  static async getYearlyBalances(year) {
    const balances = [];
    for (let month = 1; month <= 12; month++) {
      const balance = await this.getMonthlyBalance(1, year, month);
      balances.push(balance);
    }
    return balances;
  }

  static async getTotalByType(userId, type) {
    const query = 'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = ?';
    const result = await executeQuery(query, [userId, type]);
    return result[0].total || 0;
  }
}

module.exports = Transaction;
