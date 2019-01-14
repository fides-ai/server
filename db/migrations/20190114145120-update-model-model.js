'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Models', 'mode', { 
      type: Sequelize.ENUM,
        values: ['classification', 'regression'],
        allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Models', 'mode', { 
      type: Sequelize.STRING,
    });
  }
};
