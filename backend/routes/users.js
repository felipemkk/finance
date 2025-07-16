const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(auth);

// Obter perfil do usuário logado
router.get('/profile', async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        created_at: req.user.created_at
      }
    });
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar perfil do usuário
router.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validar dados obrigatórios
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }

    // Verificar se email já existe (exceto para o usuário atual)
    const existingUser = await User.findByEmail(email);
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    await User.update(req.user.id, { name, email });
    const updatedUser = await User.findById(req.user.id);

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        created_at: updatedUser.created_at
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Excluir conta do usuário
router.delete('/profile', async (req, res) => {
  try {
    await User.delete(req.user.id);

    res.json({ message: 'Conta excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir conta:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router; 