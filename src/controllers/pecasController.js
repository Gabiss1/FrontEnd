
//Importa o objeto Pecas
const Pecas = require('../modelo/Pecas');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Op } = require('sequelize')

// Criar um novo usuário
exports.createpeca = async (req, res) => {
  const { codigo, nome, material, fornecedor, desenho } = req.body;
  console.log('CreatePecas.Nome'+nome);
  console.log('createPecas.Código'+codigo);
  console.log('createPecas.Material'+material);
  console.log('createPecas.Fornecedor'+fornecedor);
  console.log('createPecas.Desenho'+desenho);

  // const hashedPassword = getHashedPassword(senha)

  try {
    const novaPeca = await Pecas.create({ codigo, nome, material, fornecedor, desenho});
    res.status(201).json(novaPeca);
  } catch (err) {
    console.log('Erro 500',err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// exports.login = async (req, res)=>{
//   const { email, senha} = req.body
//   console.log('Login', email)

//   try{
//     const Pecas = await Pecas.findOne({ where: {email}})
//     console.log('Pecas...:', Pecas)
//     if (Pecas===null) {
//       return res.status(400).send('Dados incorretos - cod 001!')
//     } else{
//       console.log('Pecas.email encontrado:', Pecas.email)
//       const isPasswordValid = bcrypt.compareSync(senha, Pecas.senha)

//       if (!isPasswordValid) {
//         console.log('Dados incorretos!')
//         return res.status(400).send('Dados incorretos - cod 002!')
//       }
//       const token = jwt.sign({ PecasId: Pecas.id}, process.env.JWT_KEY)
//       res.send({ token })
//     }
//   } catch(err){
//     console.log('Erro no login', err)
//       res.status(400).send('Erro no login: ', err.message)
//   }
// }

// Obter todos os usuários
exports.getPecas = async (req, res) => {
  console.log('getPecas')
  try {
    const pecas = await Pecas.findAll();
    res.status(200).json(pecas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuários', err });
  }
};

// Atualizar um usuário
exports.updatePecas = async (req, res) => {
  const { id } = req.params;
  const { codigo, nome, material, fornecedor, desenho } = req.body;
  try {
    const pecas = await Pecas.findByPk(id);
    if (pecas) {
      pecas.nome = nome;
      pecas.codigo = codigo;
      pecas.material = material;
      pecas.fornecedor = fornecedor;
      pecas.desenho = desenho;
      pecas.updatedAt = new Date();
      await pecas.save();
      res.status(200).json(pecas);
    } else {
      res.status(404).json({ error: 'Peça não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Peça' });
  }
};

// Deletar um usuário
exports.deletePecas = async (req, res) => {
  const { codigo } = req.params;
  try {
    const pecas = await Pecas.findOne({ where: {codigo}})
    if (pecas) {
      await pecas.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ err });
    }
  } catch (err) {
    res.status(500).json({ error:'Erro ao deletar Peça', err });
  }
};

// exports.buscarPecasPorNome = async (req, res) => {
//   const {nome} = req.params;
//   try {
//     const Pecas = await Pecas.findAll({ where: { nome: {  [Op.like]: `%${nome}%` } } });

//     if (Pecas) {
//       res.status(200).json(Pecas);
//     } else {
//       res.status(404).json({ error: 'Nenhum nome de usuário não encontrado' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Erro ao buscar o por nome de usuário' });
//   }
// };

exports.buscarCodigo = async (req, res) => {
  const { id } = req.params;
  try {
    const pecas = await Pecas.findByPk(id);

    if (pecas) {
      res.status(200).json(pecas);
    } else {
      res.status(404).json({ error: 'Peça não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o Peça' });
  }
};

function getHashedPassword(senha) {
  console.log('getHashedPassword', senha)
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(senha, salt)
  console.log('getHashedPassword.hashedPassword:', hashedPassword)
  return hashedPassword
}