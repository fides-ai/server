/**
 * Created by asafam on 1/1/19.
 */

'use strict';

var log = require('../config/logger').getLog();

/**
 * Catch 500 and forward to error handler
 * @param req request object
 * @param res response object to decorate
 * @param next callback for error handler
 */
module.exports = function(req, res, next) {

    /**
     * Decorating response object with notFound object
     * @param message message to embed in error
     */
    res.serverError = function(err) {
        if (process.env.NODE_ENV === 'development') {
            log.debug('serverError: \n' + err);
        } else {
            err = new Error('Internal server error');
        }
        err.status = 500;
        next(err);
    };

    next();
};
