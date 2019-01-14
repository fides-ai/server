/**
 * Created by asafam on 1/2/19.
 */

'use strict';

const Promise = require('./bluebird');
const responses = require('./responses');
const routes = require('./routes');
const Database = require('./database');
const Security = require('./security');

class Config {
    
    static config(app) {
        return Promise.resolve()
            .all([
                responses.mount(app),
                Database.connect(),
                Security.secure(app),
            ])
            .then(() => routes.mount(app))
            .catch(err => {
                console.error(`Configuration.config: ERROR`, err);
                throw err;
            });
    }
}

module.exports = Config;