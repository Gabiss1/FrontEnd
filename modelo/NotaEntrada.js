const Sequelize = require('sequelize');
const database = require('../data_base/db');
const Fornecedor = require('./Fornecedor');
 
const NotaEntrada = database.define('entrada', {
    numeroNota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fornecedorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Fornecedor,   
          key: 'id'      
        },
        onUpdate: 'CASCADE',   
        onDelete: 'CASCADE',   
      },
}, {

       tableName: 'entrada',

    // Configurações do modelo
       timestamps: true, // Habilita createdAt e updatedAt
        hooks: {
          beforeCreate: (entrada, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            entrada.createdAt = threeHoursLater;
            entrada.updatedAt = threeHoursLater;
          },
          beforeUpdate: (entrada, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            entrada.updatedAt = threeHoursLater;
            console.log(`Hook beforeUpdate chamado. updatedAt: ${entrada.updatedAt}`);
          }
    }
        
})

Fornecedor.hasMany(NotaEntrada, { foreignKey: 'fornecedorId' });
NotaEntrada.belongsTo(Fornecedor, { foreignKey: 'fornecedorId' });

module.exports = NotaEntrada