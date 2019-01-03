/**
 * Created by asafam on 1/2/19.
 */

 'use strict';

 const BaseController = require('./base-controller');

 class TestController extends BaseController {

    list(req, res, next) {
        return res.status(200).json(`The time is ${new Date()}`);
    }

 }

 module.exports = TestController