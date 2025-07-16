const { executeQuery } = require('../config/database');

class Client {
  static async create(clientData) {
    const { name, email, phone, status = 'Ativo' } = clientData;
    
    const query = 'INSERT INTO clients (name, email, phone, status) VALUES (?, ?, ?, ?)';
    const result = await executeQuery(query, [name, email, phone, status]);
    return result.insertId;
  }

  static async findAll() {
    const query = 'SELECT * FROM clients ORDER BY name';
    return await executeQuery(query);
  }

  static async findById(id) {
    const query = 'SELECT * FROM clients WHERE id = ?';
    const clients = await executeQuery(query, [id]);
    return clients[0];
  }

  static async update(id, clientData) {
    const { name, email, phone, status } = clientData;
    const query = 'UPDATE clients SET name = ?, email = ?, phone = ?, status = ? WHERE id = ?';
    await executeQuery(query, [name, email, phone, status, id]);
  }

  static async delete(id) {
    const query = 'DELETE FROM clients WHERE id = ?';
    await executeQuery(query, [id]);
  }

  static async findByStatus(status) {
    const query = 'SELECT * FROM clients WHERE status = ? ORDER BY name';
    return await executeQuery(query, [status]);
  }
}

module.exports = Client; 