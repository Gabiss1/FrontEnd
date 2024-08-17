//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo usuarioController
const notaSaidaController = require('../controllers/notaSaidaController');

/**
 * @swagger
 * /cadastrarsaida:
 *   post:
 *     summary: Cadastrar uma nova Nota de Saida
 *     tags: [Saida]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroNota:
 *                 type: integer
 *               nomeEmpresa:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor cadastrado
 *       500:
 *         description: Erro ao criar Fornecedor
 */
router.post('/cadastrarsaida', notaSaidaController.cadastrarNotaSaida);

//criar a rota editar Nota de Entrada
/**
 * @swagger
 * /editarsaida/{numeroNota}:
 *   put:
 *     summary: Atualiza uma Nota de Saida existente
 *     tags: [Saida]
 *     parameters:
 *       - in: path
 *         name: numeroNota
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Nota de Saida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroNota:
 *                 type: integer
 *               nomeEmpresa:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota de Entrada atualizado
 *       404:
 *         description: Nota de Entrada não encontrado
 *       500:
 *         description: Erro ao atualizar Nota de Entrada
 */
router.put('/editarsaida/:numeroNota', notaSaidaController.updateSaida);

//criar a rota deletar Nota de Entrada
/**
 * @swagger
 * /deletarSaida/{numeroNota}:
 *   delete:
 *     summary: Deletar uma Nota de Saida
 *     tags: [Saida]
 *     parameters:
 *       - in: path
 *         name: numeroNota
 *         schema:
 *           type: string
 *         required: true
 *         description: NumeroNota da Nota de Saida
 *     responses:
 *       204:
 *         description: Nota de Saida deletada
 *       404:
 *         description: Nota não encontrada
 *       500:
 *         description: Erro ao deletar Nota
 */
router.delete('/deletarSaida/:numeroNota', notaSaidaController.deletarNotaSaida);

/**
 * @swagger
 * /listarsaidas:
 *   get:
 *     summary: Retorna a lista de todas as Saidas
 *     tags: [Saida]
 *     responses:
 *       200:
 *         description: A lista de Saidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/listarsaidas', notaSaidaController.getNotaSaidas);

module.exports = router;