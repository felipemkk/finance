const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Obter todas as transações (sem autenticação para testes)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter transação por ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    res.json(transaction);
  } catch (error) {
    console.error('Erro ao buscar transação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Criar nova transação
router.post('/', async (req, res) => {
  try {
    const { description, amount, type, category, transaction_date } = req.body;

    // Validar dados obrigatórios
    if (!description || !amount || !type || !transaction_date) {
      return res.status(400).json({ 
        message: 'Descrição, valor, tipo e data são obrigatórios' 
      });
    }

    const transactionId = await Transaction.create({ 
      user_id: 1, // Usuário padrão para testes
      description, 
      amount, 
      type, 
      category, 
      transaction_date 
    });
    const transaction = await Transaction.findById(transactionId);

    res.status(201).json({
      message: 'Transação criada com sucesso',
      transaction
    });
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar transação
router.put('/:id', async (req, res) => {
  try {
    const { description, amount, type, category, transaction_date } = req.body;

    // Verificar se transação existe
    const existingTransaction = await Transaction.findById(req.params.id);
    if (!existingTransaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    // Validar dados obrigatórios
    if (!description || !amount || !type || !transaction_date) {
      return res.status(400).json({ 
        message: 'Descrição, valor, tipo e data são obrigatórios' 
      });
    }

    await Transaction.update(req.params.id, { 
      description, 
      amount, 
      type, 
      category, 
      transaction_date 
    });
    const updatedTransaction = await Transaction.findById(req.params.id);

    res.json({
      message: 'Transação atualizada com sucesso',
      transaction: updatedTransaction
    });
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Excluir transação
router.delete('/:id', async (req, res) => {
  try {
    // Verificar se transação existe
    const existingTransaction = await Transaction.findById(req.params.id);
    if (!existingTransaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    await Transaction.delete(req.params.id);

    res.json({ message: 'Transação excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir transação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter transações por tipo
router.get('/type/:type', async (req, res) => {
  try {
    const transactions = await Transaction.findByType(1, req.params.type);
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações por tipo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter transações por mês/ano
router.get('/month/:year/:month', async (req, res) => {
  try {
    const transactions = await Transaction.findByMonth(1, parseInt(req.params.year), parseInt(req.params.month));
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações por mês:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Calcular saldo mensal
router.get('/balance/:year/:month', async (req, res) => {
  try {
    const balance = await Transaction.getMonthlyBalance(
      1, 
      parseInt(req.params.year), 
      parseInt(req.params.month)
    );
    res.json(balance);
  } catch (error) {
    console.error('Erro ao buscar saldo mensal:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Calcular saldos anuais
router.get('/yearly/:year', async (req, res) => {
  try {
    const balances = await Transaction.getYearlyBalances(parseInt(req.params.year));
    res.json(balances);
  } catch (error) {
    console.error('Erro ao buscar saldos anuais:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
