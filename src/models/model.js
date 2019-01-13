/**
 * Created by asafam on 1/12/2019.
 */

'use strict';

const uuid = require('uuid/v4'); 


const Model = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT,

    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Model