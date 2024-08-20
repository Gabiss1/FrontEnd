const Fornecedor = require('../modelo/Fornecedor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Op } = require('sequelize')

// Criar um novo usuário
exports.cadastrarFornecedor = async (req, res) => {
  const { nomeEmpresa, contato, email } = req.body;
  console.log('CadastrarFornecedor.NomeEmpresa'+nomeEmpresa);
  console.log('CadastrarFornecedor.Contato'+contato);
  console.log('CadastrarFornecedor.Email'+email);

  try {
    const novoFornecedor = await Fornecedor.create({ nomeEmpresa, contato, email });
    res.status(201).json(novoFornecedor);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar Fornecedor' });
  }
};

exports.updateFornecedor = async (req, res) => {
  const { id } = req.params;
  const { nomeEmpresa, contato, email } = req.body;
  try {
    const fornecedor = await Fornecedor.findByPk(id);
    if (fornecedor) {
      fornecedor.nomeEmpresa = nomeEmpresa;
      fornecedor.contato = contato;
      fornecedor.email = email;
      fornecedor.updatedAt = new Date();
      await fornecedor.save();
      res.status(200).json(fornecedor);
    } else {
      res.status(404).json({ error: 'Fornecedor não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Fornecedor' });
  }
};

exports.getFornecedores = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findAll();
    res.status(200).json(fornecedor);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuários', err });
  }
};

exports.deletarFornecedor = async (req, res) => {
  const { id } = req.params;
  try {
    const fornecedor = await Fornecedor.findByPk(id)
    if (fornecedor) {
      await fornecedor.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ err });
    }
  } catch (err) {
    res.status(500).json({ error:'Erro ao deletar Fornecedor' });
  }
};