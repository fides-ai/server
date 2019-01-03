/**
 * Created by asafam on 1/2/19.
 */

'use strict';

const Settings = require('./settings');
const settings = new Settings();
const config = settings.settings;
const Sequelize = require('sequelize');

let client = null;

class Database {

    static connect(resetConnection=false) {
        client = (client && !resetConnection) || Database.createConnection();
        return Promise()
            .then(() => Database.testConnection());
    }

    static createConnection() {
        conn = new Sequelize(config.db.name, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: config.db.ip,
            dialect: 'postgres',
            operatorsAliases: false,
            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
            },
          });
        return conn;
    }

    static testConnection() {
        if (!client) {
            console.error('Unable to connect to the database:', err);
        }

        return client
          .authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
            return true;
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
            return false;
          });
        }
}

module.exports = Database;