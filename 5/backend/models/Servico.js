const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Servico extends Model {}

Servico.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'servico' }
);

module.exports = Servico;
