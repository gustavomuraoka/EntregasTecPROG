const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Cliente extends Model {}

Cliente.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomeSocial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CPF: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "O CPF não pode estar vazio",
      },
    },
  },
  dataCadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, { 
  sequelize, 
  modelName: 'cliente',
  tableName: 'clientes', 
  timestamps: false,
});


module.exports = Cliente;