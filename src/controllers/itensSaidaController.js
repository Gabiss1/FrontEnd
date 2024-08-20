const ItensSaida = require('../modelo/ItensSaida.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Op } = require('sequelize');
const NotaSaida = require('../modelo/NotaSaida');

// Criar um novo usuário
exports.createItensNotaSaida = async (req, res) => {
  const { codigoPeca, quantidadePeca, precoPeca, numeroNota, lote } = req.body;
  console.log('createItensNota.CodigoPeca'+codigoPeca);
  console.log('createItensNota.QuantidadePeca'+quantidadePeca);
  console.log('createItensNota.PrecoPeca'+precoPeca);
  // console.log('createItensNota.TotalPeca'+totalPeca);
  console.log('createItensNota.NumeroNota'+numeroNota);
  console.log('createItensNota.Lote'+lote);
  const totalPeca = quantidadePeca * precoPeca
  // const hashedPassword = getHashedPassword(senha)

  try {
    const saida = await NotaSaida.findByPk(numeroNota);

    if (saida) {
        const novaSaida = await ItensSaida.create({ numeroNota, codigoPeca , quantidadePeca, precoPeca, totalPeca, lote });
        res.status(201).json(novaSaida);
    }else{
        console.log('nota nao encontrada');
        res.status(500).json('nota nao encontrada');
    }

  } catch (err) {
    console.log('Erro:',err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};