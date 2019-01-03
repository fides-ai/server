/**
 * Created by asafam on 1/1/19.
 */

'use strict';

const Promise = require('bluebird');


class BaseController {
    constructor() {
    }

    getQueryParams(req) {
        if (!req) {
            return null;
        }

        for (let param in req.query) {
            if (req.query[param] === 'true') {
                req.query[param] = true;
            } else if (req.query[param] === 'false') {
                req.query[param] = false;
            } else if (req.query[param] === '') {
                req.query[param] = null;
            } else if (!isNaN(parseFloat(req.query[param]))) {
                req.query[param] = parseFloat(req.query[param]);
            }
        }

        return req.query;
    }

    getBody(req) {
        return req.body;
    }

}

module.exports = BaseController;