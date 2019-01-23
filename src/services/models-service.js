'use strict';

const _ = require('lodash');
const ResourceService = require('./resource-service');
const Model = require('../models').Model;


class ModelsService extends ResourceService {

    constructor(options) {
        options = options || {};
        super(Model, options);
    }

    getByOrganizationId(organizationId, options) {
        return {
            ...options,
            ...{where: {organizationId}}
        };
    }

    findByOrganizationId(organizationId, options) {
        options = this.getByOrganizationId(organizationId, options)
        return this.find(options);
    }

}


module.exports = ModelsService;