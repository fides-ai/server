/**
 * Created by asafam on 1/2/19.
 */

'use strict';

const Promise = require('./bluebird');
const Database = require('./database');
const Security = require('./security');

class Config {
    
    config(app) {
        return Promise
            .all([
                this.database(),
                this.responses(),
                this.security(app),
            ])
            .then(() => this.routes(app))
            .catch(err => {
                console.error(`Configuration.config: ERROR`, err);
                throw err;
            });
    }

    database() {
        return Database.connect();
    }

    responses(app) {
        if (!app) {
            return;
        }

        // responses
        log.debug('Loading responses...');
        var responsesDirName = __dirname + '/../responses';
        fs.readdirSync(responsesDirName).forEach(function (filename) {
            if (fileUtils.isFileWithExtension(filename, 'js')) {
                log.debug(responsesDirName + '/' + filename);
                var response = require(responsesDirName + '/' + filename);
                app.use(response);
            }
        });
        log.debug('Finish loading responses.');
    }

    routes(app) {
        if (!app) {
            return;
        }

        // routes
        require('../routes')(app);
    }

    security(app) {
        if (!app) {
            return;
        }

        // security
        Security.secure(app);

        // Use the passport package in our application
        app.use(passport.initialize());
    }
}

module.exports = Config;