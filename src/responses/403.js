/**
 * Created by asafam on 1/1/19.
 */

'use strict';

const UsersService = require('../services/users-service');
const usersService = new UsersService();


/**
 * Catch 403 and forward to error handler
 * @param req request object
 * @param res response object to decorate
 * @param next callback for error handler
 */
module.exports = function(req, res, next) {

    /**
     * Decorating response object with notFound object
     * @param message message to embed in error
     */
    res.forbidden = function(message) {
        const error = new Error(message || 'Access denied: you are not permitted to perform this action.');
        error.status = 403;

        if (req.user && req.user.roles && req.user.roles.length === 0) {
            usersService.getWaitingLineInfo({_id: req.user.id})
                .then(({user, count, placeInLine}) => {
                    error.info = {
                        user,
                        lineSize: count,
                        placeInLine: placeInLine
                    };

                    return next(error);
                });
        } else {
            return next(error);
        }
    };

    next();
};