const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');
const Cliente = require('./Cliente');
const Servico = require('./Servico');
const Pet = require('./Pet');

class Venda extends Model {}

Venda.init(
  {
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Produto,
        key: 'id',
      },
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: 'id',
      },
    },
    servicoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Servico,
        key: 'id',
      },
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Pet,
        key: 'id',
      },
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "O valor deve ser um número válido.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'venda',
    timestamps: true,
  }
);

Venda.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' });
Venda.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });
Venda.belongsTo(Servico, { foreignKey: 'servicoId', as: 'servico' });
Venda.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });

Produto.hasMany(Venda, { foreignKey: 'produtoId' });
Cliente.hasMany(Venda, { foreignKey: 'clienteId' });
Servico.hasMany(Venda, { foreignKey: 'servicoId' });
Pet.hasMany(Venda, { foreignKey: 'petId' });

module.exports = Venda;
