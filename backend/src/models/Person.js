const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(config.database);

const Person = sequelize.define('Person', {
  sphere: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payingAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  timestamps: true, // Habilita el manejo automático de `createdAt` y `updatedAt`
});

sequelize.sync();

module.exports = Person;
