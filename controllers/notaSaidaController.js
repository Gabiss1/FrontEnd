const NotaSaida = require('../modelo/NotaSaida')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Op } = require('sequelize');
const Fornecedor = require('../modelo/Fornecedor');

exports.cadastrarNotaSaida = async (req, res) => {
    const { numeroNota, nomeEmpresa } = req.body;
    try {
      const fornecedor = await Fornecedor.findOne({ where: { nomeEmpresa } });
      if (fornecedor) {
        fornecedorId = fornecedor.id
        const novaSaida = await NotaSaida.create({ numeroNota, fornecedorId });
        res.status(201).json(novaSaida);
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar Nota' });
    }
  };

  exports.updateSaida = async (req, res) => {
    const { numeroNota } = req.params;
    const { nomeEmpresa } = req.body;
    try {
      const fornecedor = await Fornecedor.findOne({ where: { nomeEmpresa } });
      const novaSaida = await NotaSaida.findByPk(numeroNota);
      if (fornecedor, novaSaida) {
        fornecedorId = fornecedor.id
        novaSaida.fornecedorId = fornecedorId;
        novaSaida.updatedAt = new Date();
        await novaSaida.save();
        res.status(200).json(novaSaida);
      } else {
        res.status(404).json({ error: 'Peça não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar Peça' });
    }
  };

  exports.deletarNotaSaida = async (req, res) => {
    const { numeroNota } = req.params;
    try {
      const notaSaida = await NotaSaida.findByPk(numeroNota)
      if (notaSaida) {
        await notaSaida.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ err });
      }
    } catch (err) {
      res.status(500).json({ error:'Erro ao deletar Entrada', err });
    }
  };

  exports.getNotaSaidas = async (req, res) => {
    try {
      const notaSaida = await NotaSaida.findAll();
      res.status(200).json(notaSaida);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao obter Notas de Entrada', err });
    }
  };