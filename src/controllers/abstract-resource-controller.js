/**
 * Created by asafam on 1/14/19.
 */

'use strict';

const BaseController = require('./base-controller');


class AbstractResourceController extends BaseController {

    constructor(service, context) {
        super(context);
        this.service = service;
    }

    /**
     * GET /<resources>
     * @param req request object
     * @param res response object
     * @returns {*} 200 and objects JSON
     */
    list(req, res, next) {
        const options = this.getQueryParams(req);
        const context = this.getContext(req);

        this.service.find(null, options)
            .then(objects => {
                if (!objects) {
                    return res.notFound();
                }
                return res.status(200).json(objects);
            })
            .catch(err => res.serverError(err))
    }

    /**
     * GET /<resources>/:id
     * @param req request object with ID
     * @param res response object
     * @returns {*} 200 and object JSON
     */
    show(req, res, next) {
        const id = this.getIdentifier(req);
        const criteria = this.getCriteria(req);
        const options = this.getQueryParams(req);

        if (!id) {
            return res.badRequest('Missing object id');
        }

        this.service.findOne(criteria, options)
            .then(object => {
                if (!object) {
                    return res.notFound();
                }

                return res.status(200).json(object);
            })
            .catch(err => res.serverError(err));
    }

    /**
     * POST /<resources>
     * @param req request object
     * @param res response object
     * @returns {*} 201 and object JSON
     */
    create(req, res, next) {
        let params = this.getBody(req);

        if (!params || _.isEmpty(params)) {
            return res.badRequest('Missing object data');
        }

        this.service.create(params)
            .then(object => {
                if (!object) {
                    return res.unprocessable(err);
                }
                return res.status(201).json(object)
            })
            .catch(err => res.serverError(err));
    }

    /**
     * PUT /<resources>/:id
     * @param req request object
     * @param res response object
     * @returns {*} 200 status and object JSON
     */
    update(req, res, next) {
        const id = this.getIdentifier(req);
        const criteria = this.getCriteria(req);
        const params = this.getBody(req);

        if (!id) {
            return res.badRequest('Missing object id');
        }

        if (!params) {
            return res.badRequest('Missing object params');
        }

        this.service.update(criteria, params)
            .then(object => {
                if (!object) {
                    return res.notFound();
                }
                return res.status(200).json(object);
            })
            .catch(err => res.serverError(err));
    }

    /**
     * Delete /<resources>/:id
     * @param req request object with
     * @param res response object
     * @param next callback handle
     * @returns {*} 204 status
     **/
    destroy(req, res, next) {
        const id = this.getIdentifier(req);
        const criteria = this.getCriteria(req);

        if (!id) {
            return res.badRequest('Missing object id');
        }

        this.service.remove(criteria)
            .then(() => res.sendStatus(204))
            .catch(err => res.unprocessable(err));
    }
}

module.exports = AbstractResourceController;
