/**
 * Created by asafam on 1/1/19.
 */

'use strict';

/**
 * Catch 400 and forward to error handler
 * @param req request object
 * @param res response object to decorate
 * @param next callback for error handler
 */
module.exports = (req, res, next) => {

    /**
     * Decorating response object with notFound object
     * @param message message to embed in error
     */
    res.badRequest = (message) => {
        const err = new Error(message || 'Not Found');
        err.status = 400;
        next(err);
    };

    next();
}
