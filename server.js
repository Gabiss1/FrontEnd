
const express = require('express');
const sequelize = require('./data_base/db');
const pecasRotas = require('./rotas/pecasRotas');
const fornecedoresRotas = require('./rotas/fornecedorRotas')
const notaEntradaRotas = require('./rotas/notaEntradaRotas')
const itensEntradaRotas = require('./rotas/itensEntradaRotas')
const itensSaidaRotas = require('./rotas/itensSaidaRotas')
const notaSaidaRotas = require('./rotas/notaSaidaRotas')
const loginRotas = require('./rotas/usuarioRotas')
const uploadArquivosRotas = require('./rotas/uploadArquivosRotas')
const validarToken = require('./rotas/tokenRotas')

//Importar o modulo Swagger
const setupSwagger = require('./swagger');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(require("cors")())

const corsOptions = {
  origin: 'http://localhost:3000',
  method: 'GET,HEAD,PUT,PATCH,DELETE',
  credentials: true,
  optionsSucessStatus: 204
}

app.use(cors(corsOptions))

app.use(express.json());
app.use('/api', pecasRotas);
app.use('/api', fornecedoresRotas);
app.use('/api', notaEntradaRotas);
app.use('/api', itensEntradaRotas);
app.use('/api', itensSaidaRotas);
app.use('/api', notaSaidaRotas);
app.use('/api', loginRotas);
// app.use('/api', uploadArquivosRotas)
// app.use('/api', validarToken)


// Configurar Swagger
setupSwagger(app);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});