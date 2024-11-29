const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

class RG extends Model {}

RG.init(
  {
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        notEmpty: {
          msg: "O número do RG não pode estar vazio",
        },
      },
    },
    dataEmissao: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "A data de emissão deve ser uma data válida",
        },
        notEmpty: {
          msg: "A data de emissão é obrigatória",
        },
      },
    },
    clienteCPF: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Cliente, // Relaciona com o modelo Cliente
        key: 'CPF', // Usa o campo CPF do Cliente como chave estrangeira
      },
      onUpdate: 'CASCADE', // Atualiza o RG se o CPF mudar
      onDelete: 'CASCADE', // Remove o RG se o Cliente for excluído
    },
  },
  {
    sequelize,
    modelName: "rg",
    timestamps: false, // Remove os campos createdAt e updatedAt, caso não sejam necessários
  }
);

// Define a associação entre RG e Cliente
RG.belongsTo(Cliente, { foreignKey: 'clienteCPF' });
Cliente.hasMany(RG, { foreignKey: 'clienteCPF' });

module.exports = RG;