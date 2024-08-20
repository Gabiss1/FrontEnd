const ItensEntrada = require('../modelo/ItensEntrada');

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
    const itensEntrada = await NotaEntrada.findByPk(numeroNota);

    if (itensEntrada) {
        const novoItensEntrada = await ItensEntrada.create({ numeroNota, codigoPeca , quantidadePeca, precoPeca, totalPeca, lote });
        res.status(201).json(novoItensEntrada);
    }else{
        console.log('nota nao encontrada');
        res.status(500).json('nota nao encontrada');
    }

  } catch (err) {
    console.log('Erro:',err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

exports.getItensEntrada = async (req, res) => {
    try {
      const itensEntrada = await ItensEntrada.findAll();
      res.status(200).json(itensEntrada);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao obter Itens de Entrada', err });
    }
  };

  exports.updateItensEntrada = async (req, res) => {
    const { id } = req.params;
    const { codigoPeca, quantidadePeca, precoPeca, numeroNota, lote } = req.body;
    try {
      const novoItensEntrada = await ItensEntrada.findByPk(id);
      if (novoItensEntrada) {
        novoItensEntrada.codigoPeca = codigoPeca;
        novoItensEntrada.quantidadePeca = quantidadePeca;
        novoItensEntrada.precoPeca = precoPeca;
        novoItensEntrada.totalPeca = precoPeca * quantidadePeca;
        novoItensEntrada.numeroNota = numeroNota;
        novoItensEntrada.lote = lote;
        novoItensEntrada.updatedAt = new Date();
        await novoItensEntrada.save();
        res.status(200).json(novoItensEntrada);
      } else {
        res.status(404).json({ error: 'Peça não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar Peça' });
    }
  };

  exports.itensEntradaId = async (req, res) => {
    const { id } = req.params;
    try {
      const itensEntrada = await ItensEntrada.findByPk(id);
  
      if (itensEntrada) {
        res.status(200).json(itensEntrada);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
  };