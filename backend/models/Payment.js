const { executeQuery } = require('../config/database');

class Payment {
  static async create(paymentData) {
    const { client_id, amount, payment_date, payment_method, status = 'Pendente' } = paymentData;
    
    const query = 'INSERT INTO payments (client_id, amount, payment_date, payment_method, status) VALUES (?, ?, ?, ?, ?)';
    const result = await executeQuery(query, [client_id, amount, payment_date, payment_method, status]);
    return result.insertId;
  }

  static async findAll() {
    const query = `
      SELECT p.*, c.name as client_name 
      FROM payments p 
      LEFT JOIN clients c ON p.client_id = c.id 
      ORDER BY p.payment_date DESC
    `;
    return await executeQuery(query);
  }

  static async findById(id) {
    const query = `
      SELECT p.*, c.name as client_name 
      FROM payments p 
      LEFT JOIN clients c ON p.client_id = c.id 
      WHERE p.id = ?
    `;
    const payments = await executeQuery(query, [id]);
    return payments[0];
  }

  static async update(id, paymentData) {
    const { client_id, amount, payment_date, payment_method, status } = paymentData;
    const query = 'UPDATE payments SET client_id = ?, amount = ?, payment_date = ?, payment_method = ?, status = ? WHERE id = ?';
    await executeQuery(query, [client_id, amount, payment_date, payment_method, status, id]);
  }

  static async delete(id) {
    const query = 'DELETE FROM payments WHERE id = ?';
    await executeQuery(query, [id]);
  }

  static async findByStatus(status) {
    const query = `
      SELECT p.*, c.name as client_name 
      FROM payments p 
      LEFT JOIN clients c ON p.client_id = c.id 
      WHERE p.status = ? 
      ORDER BY p.payment_date DESC
    `;
    return await executeQuery(query, [status]);
  }

  static async getTotalByStatus(status) {
    const query = 'SELECT SUM(amount) as total FROM payments WHERE status = ?';
    const result = await executeQuery(query, [status]);
    return result[0].total || 0;
  }

  static async getTotalPayments() {
    const query = 'SELECT SUM(amount) as total FROM payments WHERE status = "Pago"';
    const result = await executeQuery(query);
    return result[0].total || 0;
  }

  static async getTotalPending() {
    const query = 'SELECT SUM(amount) as total FROM payments WHERE status = "Pendente"';
    const result = await executeQuery(query);
    return result[0].total || 0;
  }
}

module.exports = Payment; 