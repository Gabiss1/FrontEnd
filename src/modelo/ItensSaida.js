const Sequelize = require('sequelize');
const database = require('../data_base/db');
const NotaSaida = require('./NotaSaida');
 
const ItensSaida = database.define('itenssaida', {
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
          model: NotaSaida,   
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

       tableName: 'itenssaida',

    // Configurações do modelo
       timestamps: true, // Habilita createdAt e updatedAt
        hooks: {
          beforeCreate: (itenssaida, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            itenssaida.createdAt = threeHoursLater;
            itenssaida.updatedAt = threeHoursLater;
          },
          beforeUpdate: (itenssaida, options) => {
            const now = new Date();
            const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000);
            itenssaida.updatedAt = threeHoursLater;
            console.log(`Hook beforeUpdate chamado. updatedAt: ${itenssaida.updatedAt}`);
          }
    }
        
})

NotaSaida.hasMany(ItensSaida, { foreignKey: 'numeroNota' });
ItensSaida.belongsTo(NotaSaida, { foreignKey: 'numeroNota' });

module.exports = ItensSaida