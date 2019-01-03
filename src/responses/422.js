/**
 * Created by asafam on 1/1/19.
 */

'use strict';

/**
 * Catch 422 and forward to error handler
 * @param req request object
 * @param res response object to decorate
 * @param next callback for error handler
 */
module.exports = function(req, res, next) {

    /**
     * Decorating response object with notFound object
     * @param message message to embed in error
     */
    res.unprocessable = function(err, message,info) {
        err = message? new Error(message) : (err || new Error());

        if (message) {
            err.message = message;
        }

        err.info = info;
        err.status = 422;
        next(err);
    };

    next();
};
