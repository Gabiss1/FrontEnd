//importa as configuracoes do arquivo de configuracao
require("dotenv").config();

//Importa o modulo do Sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECT, {dialect: 'mysql'});
 
module.exports = sequelize;