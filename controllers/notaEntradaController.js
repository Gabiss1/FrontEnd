const NotaEntrada = require('../modelo/NotaEntrada')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Op } = require('sequelize');
const Fornecedor = require('../modelo/Fornecedor');

exports.cadastrarNotaEntrada = async (req, res) => {
    const { numeroNota, nomeEmpresa } = req.body;
    try {
      const fornecedor = await Fornecedor.findOne({ where: { nomeEmpresa } });
      if (fornecedor) {
        fornecedorId = fornecedor.id
        const novaEntrada = await NotaEntrada.create({ numeroNota, fornecedorId });
        res.status(201).json(novaEntrada);
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar Nota' });
    }
  };

  exports.updateEntrada = async (req, res) => {
    const { numeroNota } = req.params;
    const { nomeEmpresa } = req.body;
    try {
      const fornecedor = await Fornecedor.findOne({ where: { nomeEmpresa } });
      const novaEntrada = await NotaEntrada.findByPk(numeroNota);
      if (fornecedor, novaEntrada) {
        novaEntrada.fornecedorId = fornecedor.id;
        novaEntrada.numeroNota = numeroNota;
        novaEntrada.updatedAt = new Date();
        await novaEntrada.save();
        res.status(200).json(novaEntrada);
      } else {
        res.status(404).json({ error: 'Peça não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar Peça' });
    }
  };

  exports.deletarNotaEntrada = async (req, res) => {
    const { numeroNota } = req.params;
    try {
      const notaEntrada = await NotaEntrada.findByPk(numeroNota)
      if (notaEntrada) {
        await notaEntrada.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ err });
      }
    } catch (err) {
      res.status(500).json({ error:'Erro ao deletar Entrada', err });
    }
  };

  exports.getNotaEntradas = async (req, res) => {
    try {
      const notaEntrada = await NotaEntrada.findAll();
      res.status(200).json(notaEntrada);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao obter Notas de Entrada', err });
    }
  };