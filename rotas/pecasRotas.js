
//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo usuarioController
const pecasController = require('../controllers/pecasController');

//criar a rota buscar peças
/**
 * @swagger
 * tags:
 *   name: Peças
 *   description: Busca todos os usuários
 */

/**
 * @swagger
 * /listarpecas:
 *   get:
 *     summary: Retorna a lista de todas 
 *     tags: [Peças]
 *     responses:
 *       200:
 *         description: A lista de Peças
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/listarpecas', pecasController.getPecas);

//criar a rota cadastra Peças
/**
 * @swagger
 * /cadastrarpeca:
 *   post:
 *     summary: Cadastrar uma nova peça
 *     tags: [Peças]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nome:
 *                 type: string
 *               material:
 *                 type: string
 *               desenho:
 *                 type: string
 *               fornecedor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Peça criado
 *       500:
 *         description: Erro ao criar Peça
 */
router.post('/cadastrarpeca', pecasController.createpeca);


//criar a rota editar usuarios
/**
 * @swagger
 * /pecas/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Peças]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nome:
 *                 type: string
 *               material:
 *                 type: string
 *               desenho:
 *                 type: string
 *               fornecedor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Peça atualizada
 *       404:
 *         description: Peça não encontrada
 *       500:
 *         description: Erro ao atualizar Peça
 */
router.put('/pecas/:id', pecasController.updatePecas);

//criar a rota deletar Peça
/**
 * @swagger
 * /deletar/{codigo}:
 *   delete:
 *     summary: Deletar uma Peça registrada
 *     tags: [Peças]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: string
 *         required: true
 *         description: Código da Peça
 *     responses:
 *       204:
 *         description: Peça deletado
 *       404:
 *         description: Peça não encontrada
 *       500:
 *         description: Erro ao deletar Peça
 */
router.delete('/deletar/:codigo', pecasController.deletePecas);

// //criar a rota buscar usuarios que contem o nome
// /**
//  * @swagger
//  * tags:
//  *   name: Usuario
//  *   description: Busca todos os usuários que contem o nome
//  */

// /**
//  * @swagger
//  * /buscarUsuarioPorNome/{nome}:
//  *   get:
//  *     summary: Busca todos os usuários que contem o nome
//  *     tags: [Usuario]
//  *     parameters:
//  *       - in: path
//  *         name: nome
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Nome do usuario
//  *     responses:
//  *       200:
//  *         description: Busca todos os usuários que contem o nome
//  */
// router.get('/buscarUsuarioPorNome/:nome', usuarioController.buscarUsuarioPorNome);

// //criar a rota buscar usuarios
// /**
//  * @swagger
//  * tags:
//  *   name: Usuario
//  *   description: Busca todos os usuários
//  */

// /**
//  * @swagger
//  * /buscarId/{id}:
//  *   get:
//  *     summary: Buscar registro por ID
//  *     tags: [Usuario]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID do usuário
//  *     responses:
//  *       200:
//  *         description: Buscar registro por ID
//  */
// router.get('/buscarId/:id', usuarioController.buscarId);

//exporta as rotas criadas
module.exports = router;