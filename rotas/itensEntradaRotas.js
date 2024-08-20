//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo usuarioController
const itensEntradaController = require('../controllers/itensEntradaController');

/**
 * @swagger
 * /cadastraritensentrada:
 *   post:
 *     summary: Cadastrar uma nova Nota de Entrada
 *     tags: [Itens Entrada]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroNota:
 *                 type: integer
 *               codigoPeca:
 *                 type: string
 *               quantidadePeca:
 *                 type: double
 *               precoPeca:
 *                 type: double
 *               lote:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor cadastrado
 *       500:
 *         description: Erro ao criar Fornecedor
 */
router.post('/cadastraritensentrada', itensEntradaController.createItensNota);

/**
 * @swagger
 * /listaritensentrada:
 *   get:
 *     summary: Retorna a lista de todas as Entradas
 *     tags: [Itens Entrada]
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
router.get('/listaritensentrada', itensEntradaController.getItensEntrada);

//criar a rota editar Nota de Entrada
/**
 * @swagger
 * /editaritensentrada/{id}:
 *   put:
 *     summary: Atualiza uma Nota de Entrada existente
 *     tags: [Itens Entrada]
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
router.put('/editaritensentrada/:id', itensEntradaController.updateItensEntrada);

/**
 * @swagger
 * /itensentrada/{id}:
 *   get:
 *     summary: Buscar registro por ID
 *     tags: [Itens Entrada]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Buscar registro por ID
 */
router.get('/itensentrada/:id', );

module.exports = router