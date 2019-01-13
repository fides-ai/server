/**
 * Created by asafam 1/2/19.
 */

'use strict';

const express = require('express');
const router = express.Router();
const TestController = require('../controllers/api/test-controller');
const testController = new TestController();
const ModelsController = require('../controllers/api/models-controller');
const modelsController = new TestController();


router.route('/test')
    .get((req, res, next) => testController.list(req, res, next));

router.route('/model')
    .get((req, res, next) => modelsController.list(req, res, next));

module.exports = router;