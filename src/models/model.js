'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const Model = sequelize.define('Model', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('classification', 'regression'),
      allowNull: false
    },
    version: DataTypes.STRING,
  }, {});
  
  Model.associate = function(models) {
    Model.belongsTo(models.Organization);
    Model.hasMany(models.ModelFeature);
  };

  return Model;
};