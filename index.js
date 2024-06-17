const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('university', 'postgres', 'route', {
    host: 'localhost',  // Adjust this if your PostgreSQL server is hosted elsewhere
    dialect: 'postgres', // Use 'postgres' dialect
    logging: console.log, // Enable logging for debugging
});

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'items',
  timestamps: false, // Adjust if you want timestamp columns
});

sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to synchronize models:', err);
  });

module.exports = { Student };
