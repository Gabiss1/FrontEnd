const Sequelize = require('sequelize');
const database = require('../data_base/db');
const NotaEntrada = require('./NotaEntrada');
 
const ItensEntrada = database.define('itensentrada', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numeroNota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: NotaEntrada,   
          key: 'numeroNota'      
        },
        onUpdate: 'CASCADE',   
        onDelete: 'CASCADE',   
      },
    codigoPeca: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidadePeca: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    precoPeca: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    totalPeca: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    lote: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {

       tableName: 'itensentrada',

    // Configurações do modelo
       timestamps: true, // Habilita createdAt e updatedAt
        hooks: {
          beforeCreate: (itensentrada, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            itensentrada.createdAt = threeHoursLater;
            itensentrada.updatedAt = threeHoursLater;
          },
          beforeUpdate: (itensentrada, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            itensentrada.updatedAt = threeHoursLater;
            console.log(`Hook beforeUpdate chamado. updatedAt: ${itensentrada.updatedAt}`);
          }
    }
        
})

NotaEntrada.hasMany(ItensEntrada, { foreignKey: 'numeroNota' });
ItensEntrada.belongsTo(NotaEntrada, { foreignKey: 'numeroNota' });

module.exports = ItensEntrada