const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

class Pet extends Model {}

Pet.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raca: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genero: {
      type: DataTypes.ENUM("Macho", "Fêmea", "Indefinido"),
      allowNull: false,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: "pet",
  }
);

Cliente.hasMany(Pet, { foreignKey: 'clienteId', as: 'pets' });
Pet.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'dono' });

module.exports = Pet;
