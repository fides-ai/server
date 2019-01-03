/**
 * Created by asafam 1/2/19.
 */

'use strict';

const express = require('express');
const router = express.Router();
const TestController = require('../controllers/test-controller');
const testController = new TestController();


router.route('/test')
    .get((req, res, next) => testController.list(req, res, next));

module.exports = router;