const Sequelize = require('sequelize');
const database = require('../data_base/db');
 
const Fornecedor = database.define('fornecedor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeEmpresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:  {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {

       tableName: 'fornecedor',

    // Configurações do modelo
       timestamps: true, // Habilita createdAt e updatedAt
        hooks: {
          beforeCreate: (fornecedor, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            fornecedor.createdAt = threeHoursLater;
            fornecedor.updatedAt = threeHoursLater;
          },
          beforeUpdate: (fornecedor, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            fornecedor.updatedAt = threeHoursLater;
            console.log(`Hook beforeUpdate chamado. updatedAt: ${fornecedor.updatedAt}`);
          }
    }
        
})

module.exports = Fornecedor