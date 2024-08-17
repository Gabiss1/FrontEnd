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

module.exports = router