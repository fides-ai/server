/**
 * Created by asafam on 1/2/19.
 */

'use strict';

class Security {

    static secure(app) {
        // request interceptor
        app.use((req, res, next) => {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request headers allowed: Any
            res.setHeader('Access-Control-Allow-Headers', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-spr-exp, X-API-Version, x-access-token');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
    }
};

module.exports = Security;

//TODO: use lusca node module
