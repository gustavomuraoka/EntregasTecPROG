const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

class Telefone extends Model {}

Telefone.init(
  {
    ddd: {
      type: DataTypes.STRING(2), // Limita a 2 caracteres
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "O DDD deve conter apenas números",
        },
        len: {
          args: [2, 2],
          msg: "O DDD deve conter exatamente 2 dígitos",
        },
      },
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "O número deve conter apenas números",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "telefone",
  }
);

Cliente.hasMany(Telefone, { foreignKey: 'clienteId', as: 'telefone' });
Telefone.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'dono' });

module.exports = Telefone;
