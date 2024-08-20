const express = require('express')
const uploadarquivocontroller = require('../controllers/uploadArquivosController')

const upload = require('../Multer/multers')

const router = express.Router()

/**
* @swagger
* /uploadarquivo:
*   post:
*     summary: Salvar o upload de arquivo
*     tags: [Upload]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               image:
*                 type: string
*                 format: binary
*     responses:
*       201:
*         description: Upload de imagem efetuado com sucesso
*       500:
*         description: Erro ao efetuar o upload de imagem
*/
router.post('/uploadarquivo', upload.single('image'), uploadarquivocontroller.uploadarquivo);

/**
* @swagger
* /uploadarquivo/{id}:
*   get:
*     summary: Buscar arquivo por ID
*     tags: [Upload]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID do arquivo a ser buscado
*     responses:
*       200:
*         description: Arquivo buscado por sucesso
*       404:
*         description: Arquivo não encontrado
*       500:
*         description: Erro ao buscar arquivo
*/
router.get('/uploadarquivo/:id', uploadarquivocontroller.getArquivo);

module.exports = router