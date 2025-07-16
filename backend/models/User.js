const { executeQuery } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const result = await executeQuery(query, [name, email, hashedPassword]);
    return result.insertId;
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const users = await executeQuery(query, [email]);
    return users[0];
  }

  static async findById(id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
    const users = await executeQuery(query, [id]);
    return users[0];
  }

  static async update(id, userData) {
    const { name, email } = userData;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    await executeQuery(query, [name, email, id]);
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    await executeQuery(query, [id]);
  }
}

module.exports = User; 