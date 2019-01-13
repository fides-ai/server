'use strict';

module.exports = (sequelize, DataTypes) => {
  const Organaization = sequelize.define('Organaization', {
    id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Organaization.associate = function(models) {
    // associations can be defined here
  };
  return Organaization;
};