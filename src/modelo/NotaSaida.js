const Sequelize = require('sequelize');
const database = require('../data_base/db');
const Fornecedor = require('./Fornecedor');
 
const NotaSaida = database.define('saida', {
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

       tableName: 'saida',

    // Configurações do modelo
       timestamps: true, // Habilita createdAt e updatedAt
        hooks: {
          beforeCreate: (saida, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            saida.createdAt = threeHoursLater;
            saida.updatedAt = threeHoursLater;
          },
          beforeUpdate: (saida, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            saida.updatedAt = threeHoursLater;
            console.log(`Hook beforeUpdate chamado. updatedAt: ${saida.updatedAt}`);
          }
    }
        
})

Fornecedor.hasMany(NotaSaida, { foreignKey: 'fornecedorId' });
NotaSaida.belongsTo(Fornecedor, { foreignKey: 'fornecedorId' });

module.exports = NotaSaida