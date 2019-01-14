'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const ModelFeature = sequelize.define('ModelFeature', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('categorical', 'continuous', 'discrete'),
      defaultValue: 'continuous',
      allowNull: false
    },
    nameValueMap: {
      type: DataTypes.JSONB,
    },
  }, {});

  ModelFeature.associate = function(models) {
    ModelFeature.belongsTo(models.Model)
  };
  
  return ModelFeature;
};