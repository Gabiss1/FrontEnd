const Sequelize = require('sequelize');
const database = require('../data_base/db');
 
const Pecas = database.define('pecas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    material:  {
        type: Sequelize.STRING,
        allowNull: false
    },
    fornecedor:  {
      type: Sequelize.STRING,
      allowNull: false
    },

    desenho: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
}, {

    // Configurações do modelo
       timestamps: true, // Habilita createdAt e updatedAt
        hooks: {
          beforeCreate: (pecas, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            pecas.createdAt = threeHoursLater;
            pecas.updatedAt = threeHoursLater;
          },
          beforeUpdate: (pecas, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            pecas.updatedAt = threeHoursLater;
            console.log(`Hook beforeUpdate chamado. updatedAt: ${pecas.updatedAt}`);
          }
    }
        
})


 
module.exports = Pecas;