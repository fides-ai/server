'use strict';

const User = sequelize.define('user', {/* ... */})


module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING
  }, {});
  Organization.associate = (models) => {
    Organization.hasMany(models.Model)
  };
  return Organization;
};