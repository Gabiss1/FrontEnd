//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo usuarioController
const fornecedorController = require('../controllers/fornecedorController');

/**
 * @swagger
 * /fornecedor:
 *   post:
 *     summary: Cadastrar um novo fornecedor
 *     tags: [Fornecedor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeEmpresa:
 *                 type: string
 *               contato:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor cadastrado
 *       500:
 *         description: Erro ao criar Fornecedor
 */
router.post('/fornecedor', fornecedorController.cadastrarFornecedor);

//criar a rota buscar Fornecedores
/**
 * @swagger
 * tags:
 *   name: Fornecedores
 *   description: Busca todos os usuários
 */

/**
 * @swagger
 * /listarfornecedores:
 *   get:
 *     summary: Retorna a lista de todos os fornecedores
 *     tags: [Fornecedor]
 *     responses:
 *       200:
 *         description: A lista de Fornecedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/listarfornecedores', fornecedorController.getFornecedores);

//criar a rota deletar Fornecedor
/**
 * @swagger
 * /deletarFornecedor/{id}:
 *   delete:
 *     summary: Deletar um Fornecedor
 *     tags: [Fornecedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Fornecedor
 *     responses:
 *       204:
 *         description: Fornecedor deletado
 *       404:
 *         description: Fornecedor não encontrad0
 *       500:
 *         description: Erro ao deletar Fornecedor
 */
router.delete('/deletarFornecedor/:id', fornecedorController.deletarFornecedor);

//criar a rota editar Fornecedor
/**
 * @swagger
 * /editarfornecedor/{id}:
 *   put:
 *     summary: Atualiza um fornecedor existente
 *     tags: [Fornecedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeEmpresa:
 *                 type: string
 *               contato:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fornecedor atualizado
 *       404:
 *         description: Fornecedor não encontrado
 *       500:
 *         description: Erro ao atualizar Fornecedor
 */
router.put('/editarfornecedor/:id', fornecedorController.updateFornecedor);

module.exports = router;