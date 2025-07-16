const express = require('express');
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(auth);

// Obter todos os pagamentos
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter pagamento por ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }
    res.json(payment);
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Criar novo pagamento
router.post('/', async (req, res) => {
  try {
    const { client_id, amount, payment_date, payment_method, status } = req.body;

    // Validar dados obrigatórios
    if (!client_id || !amount || !payment_date || !payment_method) {
      return res.status(400).json({ 
        message: 'Cliente, valor, data e método de pagamento são obrigatórios' 
      });
    }

    const paymentId = await Payment.create({ 
      client_id, 
      amount, 
      payment_date, 
      payment_method, 
      status 
    });
    const payment = await Payment.findById(paymentId);

    res.status(201).json({
      message: 'Pagamento criado com sucesso',
      payment
    });
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Atualizar pagamento
router.put('/:id', async (req, res) => {
  try {
    const { client_id, amount, payment_date, payment_method, status } = req.body;

    // Verificar se pagamento existe
    const existingPayment = await Payment.findById(req.params.id);
    if (!existingPayment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }

    // Validar dados obrigatórios
    if (!client_id || !amount || !payment_date || !payment_method) {
      return res.status(400).json({ 
        message: 'Cliente, valor, data e método de pagamento são obrigatórios' 
      });
    }

    await Payment.update(req.params.id, { 
      client_id, 
      amount, 
      payment_date, 
      payment_method, 
      status 
    });
    const updatedPayment = await Payment.findById(req.params.id);

    res.json({
      message: 'Pagamento atualizado com sucesso',
      payment: updatedPayment
    });
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Excluir pagamento
router.delete('/:id', async (req, res) => {
  try {
    // Verificar se pagamento existe
    const existingPayment = await Payment.findById(req.params.id);
    if (!existingPayment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }

    await Payment.delete(req.params.id);

    res.json({ message: 'Pagamento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir pagamento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter pagamentos por status
router.get('/status/:status', async (req, res) => {
  try {
    const payments = await Payment.findByStatus(req.params.status);
    res.json(payments);
  } catch (error) {
    console.error('Erro ao buscar pagamentos por status:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Obter totais de pagamentos
router.get('/totals/summary', async (req, res) => {
  try {
    const totalPago = await Payment.getTotalPayments();
    const totalPendente = await Payment.getTotalPending();
    const totalPagamentos = await Payment.findAll();

    res.json({
      total_pago: totalPago,
      total_pendente: totalPendente,
      total_pagamentos: totalPagamentos.length
    });
  } catch (error) {
    console.error('Erro ao buscar totais:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router; 