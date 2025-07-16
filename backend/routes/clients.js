const express = require('express');
const Client = require('../models/Client');
const auth = require('../middleware/auth');

const router = express.Router();

// Remover autenticação temporariamente para testes
// router.use(auth);

// Obter todos os clientes
router.get('/', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(client);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Criar novo cliente
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Validar dados obrigatórios
    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    const clientId = await Client.create({ name, email, phone, address });
    const client = await Client.findById(clientId);

    res.status(201).json({
      message: 'Cliente criado com sucesso',
      client
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Verificar se cliente existe
    const existingClient = await Client.findById(req.params.id);
    if (!existingClient) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Validar dados obrigatórios
    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    await Client.update(req.params.id, { name, email, phone, address });
    const updatedClient = await Client.findById(req.params.id);

    res.json({
      message: 'Cliente atualizado com sucesso',
      client: updatedClient
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Excluir cliente
router.delete('/:id', async (req, res) => {
  try {
    // Verificar se cliente existe
    const existingClient = await Client.findById(req.params.id);
    if (!existingClient) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    await Client.delete(req.params.id);

    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter clientes por status
router.get('/status/:status', async (req, res) => {
  try {
    const clients = await Client.findByStatus(req.params.status);
    res.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes por status:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router; 