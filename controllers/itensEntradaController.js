const ItensEntrada = require('../modelo/ItensEntrada');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Op } = require('sequelize');
const NotaEntrada = require('../modelo/NotaEntrada');

// Criar um novo usuário
exports.createItensNota = async (req, res) => {
  const { codigoPeca, quantidadePeca, precoPeca, numeroNota, lote } = req.body;
  console.log('createItensNota.CodigoPeca'+codigoPeca);
  console.log('createItensNota.QuantidadePeca'+quantidadePeca);
  console.log('createItensNota.PrecoPeca'+precoPeca);
  console.log('createItensNota.NumeroNota'+numeroNota);
  console.log('createItensNota.Lote'+lote);
  const totalPeca = quantidadePeca * precoPeca

  // const hashedPassword = getHashedPassword(senha)

  try {
    const entrada = await NotaEntrada.findByPk(numeroNota);

    if (entrada) {
        const novaEntrada = await ItensEntrada.create({ numeroNota, codigoPeca , quantidadePeca, precoPeca, totalPeca, lote });
        res.status(201).json(novaEntrada);
    }else{
        console.log('nota nao encontrada');
        res.status(500).json('nota nao encontrada');
    }

  } catch (err) {
    console.log('Erro:',err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};