/**
 * Created by asafam 1/2/19.
 */

'use strict';

const express = require('express');
const router = express.Router();
const TestController = require('../controllers/api/test-controller');
const testController = new TestController();
const ModelsController = require('../controllers/api/models-controller');
const modelsController = new ModelsController();


router.route('/test')
    .get((req, res, next) => testController.list(req, res, next));

router.route('/organization/:organizationId/model')
    .get((req, res, next) => modelsController.list(req, res, next))
    .post((req, res, next) => modelsController.create(req, res, next));
router.route('/organization/:organizationId/model/:id')
    .get((req, res, next) => modelsController.show(req, res, next))
    .put((req, res, next) => modelsController.update(req, res, next));

module.exports = router;