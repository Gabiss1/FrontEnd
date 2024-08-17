//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo usuarioController
const notaEntradaController = require('../controllers/notaEntradaController');

/**
 * @swagger
 * /cadastrarentrada:
 *   post:
 *     summary: Cadastrar uma nova Nota de Entrada
 *     tags: [Entrada]
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
router.post('/cadastrarentrada', notaEntradaController.cadastrarNotaEntrada);

//criar a rota editar Nota de Entrada
/**
 * @swagger
 * /editarentrada/{numeroNota}:
 *   put:
 *     summary: Atualiza uma Nota de Entrada existente
 *     tags: [Entrada]
 *     parameters:
 *       - in: path
 *         name: numeroNota
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Nota de Entrada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
router.put('/editarentrada/:numeroNota', notaEntradaController.updateEntrada);

//criar a rota deletar Nota de Entrada
/**
 * @swagger
 * /deletarEntrada/{numeroNota}:
 *   delete:
 *     summary: Deletar uma Nota de Entrada
 *     tags: [Entrada]
 *     parameters:
 *       - in: path
 *         name: numeroNota
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da Nota de Entrada
 *     responses:
 *       204:
 *         description: Nota de Entrada deletada
 *       404:
 *         description: Nota não encontrada
 *       500:
 *         description: Erro ao deletar Nota
 */
router.delete('/deletarEntrada/:numeroNota', notaEntradaController.deletarNotaEntrada);

/**
 * @swagger
 * /listarentradas:
 *   get:
 *     summary: Retorna a lista de todas as Entradas
 *     tags: [Entrada]
 *     responses:
 *       200:
 *         description: A lista de Entradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/listarentradas', notaEntradaController.getNotaEntradas);

module.exports = router;