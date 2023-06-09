const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Pokemon = sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
     
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      
    },
    height: {
      type: DataTypes.STRING,
      
    },
    weight: {
      type: DataTypes.STRING,
      
    }
  }, {
    timestamps: false,
  });

  return Pokemon;
};

