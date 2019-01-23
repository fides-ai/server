'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const ModelVersion = sequelize.define('ModelVersion', {
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
    releasedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now
    }
  }, {});

  ModelVersion.associate = function(models) {
    ModelVersion.belongsTo(models.Model)
  };
  
  return ModelVersion;
};