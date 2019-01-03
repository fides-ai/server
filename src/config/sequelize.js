/**
 * Create by asafam on 1/2/19.
 */
'use strict';

const Settings = require('./settings');
const settings = new Settings();
const config = settings.settings;

module.exports = {
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: config.db.name,
        host: config.db.ip,
        dialect: 'postgres'
    }
}