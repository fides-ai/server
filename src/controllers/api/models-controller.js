/** 
 * Created by asafam on 1/13/2019.
 **/

'use strict';

const BaseApiController = require('./base-api-controller');
const ModelsService = require('../../services/models-service');


class ModelsController extends BaseApiController {

    constructor() {
        let service = new ModelsService();
        super(service);
    }

    byOrganizationId(req) {
        const { organizationId } = req.params;

        if (organizationId) {
            this.options = {
                ...this.options,
                ...{ where: { organizationId } }
            }
        }
    }

    list(req, res, next) {
        byOrganizationId(req);
        return super.list(req, res, next);
    }

    show(req, res, next) {
        byOrganizationId(req);
        return super.show(req, res, next);
    }

    create(req, res, next) {
        byOrganizationId(req);
        return super.create(req, res, next);
    }

    update(req, res, next) {
        return super.update(req, res, next);
    }
}

module.exports = ModelsController;