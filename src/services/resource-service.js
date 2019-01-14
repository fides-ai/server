/**
 * Created by asafam on 1/14/2019.
 */

'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const AbstractService = require('./abstract-service');


class ResourceService extends AbstractService {

    constructor(Model, options) {
        super();
        this.Model = Model;
        this.options = options || {};
    }

    getOptions(options) {
        if (!options) {
            return null;
        }

        const { populate, select, order, page, pageSize } = options;
        options = { populate, select, order, page, pageSize };
        options = _.pickBy(options, _.identity);
        return options;
    }

    updateParams(params, options) {
        options = Object.assign({}, this.options, options);
        params = params || {};

        if (options.populate) {
            let include = params.include || []
            params.attibutes = include.concat(options.populate)
        }

        if (options.select) {
            let attributes = params.attributes || []
            params.attibutes = attributes.concat(options.select)
        }

        if (options.order) {
            params.order = Object.assign(params.order, options.order)
        }

        if (options.page) {
            let pageSize = options.pageSize || 10;
            params.offset = options.page * pageSize;
        }

        if (options.pageSize) {
            params.limit = options.pageSize
        }

        return params;
    }

    /**
     * Generic method to find objects according to criteria
     * @param criteria
     * @param {object} [options]
     * @param {boolean} [options.skipPopulate]
     * @param {Array} [options.populate]
     * @param {object} [options.select]
     * @param {object} [options.sort]
     * @param {boolean} [options.raw]
     */
    find(params, options) {
        params = this.updateParams(params, options);
        return this.Model
            .findAll(params)
            .catch(err => {
                console.error(`${this.constructor.name}.find: Error`, err);
                throw err;
            });
    }

    /**
     * Generic method to find single object
     * @param criteria
     * @param [options]
     */
    findOne(criteria, options) {
        cparams = this.updateParams(params, options);

        return Model
            .findOne(params)
            .catch(err => {
                console.error(`${this.constructor.name}.findOne: Error`, err);
                // throw err;
            });

    }

    /**
     * Generic method to create Model object from params
     * @param params
     */
    create(params, options) {
        options = Object.assign({}, this.options, this.getOptions(options));

        return this.beforeCreate(params, options)
            .then(newParams => this.Model.create(newParams, options))
            .then(object => this.afterCreate(object, options))
            .catch(err => {
                console.error(`${this.constructor.name}.create: Error`, err);
                throw err;
            });
    }

    update(criteria, params, options) {
        const defaultOptions = {};
        options = Object.assign(defaultOptions, this.options, this.getOptions(options));

        this.beforeUpdate(criteria, params, options) // offers to reconstruct the criteria and the params
            .then(({ criteria, params }) => {
                if (!params) {
                    return null;
                }
                return this.Model.update(params, criteria, options);
            })
            .then(() => this.find(criteria, options))
            .then(updatedObjects => this.afterUpdate(updatedObjects, options))
            .catch(err => {
                console.error(`${this.constructor.name}.update: Error`, err);
                throw err;
            });
    }

    batchCreate(paramsArray, options, done) {
        options = Object.assign({}, this.options, this.getOptions(options));

        if (!paramsArray || paramsArray.length === 0) {
            return paramsArray;
        }

        return Promise.all(paramsArray.map(params => this.beforeCreate(params, options)))
            .then(newParamsArray => this.Model.bulkCreate(newParamsArray, options))
            .then(objects => Promise.all(objects.map(object => this.afterCreate(object, options))))
            .catch(err => {
                console.error(`${this.constructor.name}.create: Error`, err);
                throw err;
            });
    }

    /**
     * Hook method to be called before creation
     * @param params
     * @param [options]
     */
    beforeCreate(params, options) {
        const beforeCreateMiddlewares = this.Model.beforeCreateMiddlewares || [];
        return Promise.all(beforeCreateMiddlewares.map(beforeCreateMiddleware => beforeCreateMiddleware(params, options)))
            .then(() => params)
            .catch(err => {
                console.error(`${this.constructor.name}.create: Error`, err);
                throw err;
            });
    }

    /**
     * Hook method to be called after creation
     * @param object
     * @param [options]
     */
    afterCreate(object, options, done) {
        return new Promise(resolve => resolve(object));
    }

    /**
     * Hook method to be called before update
     * @param criteria
     * @param params
     */
    beforeUpdate(criteria, params, options) {
        const beforeUpdateMiddlewares = this.Model.beforeUpdateMiddlewares || [];
        return Promise.all(beforeUpdateMiddlewares.map(beforeUpdateMiddleware => beforeUpdateMiddleware(criteria, params, options)))
            .then(() => ({ criteria, params }))
            .catch(err => {
                console.error(`${this.constructor.name}.beforeUpdate: Error`, err);
                throw err;
            });
    }

    /**
     * Hook method to be called after update
     * @param object
     */
    afterUpdate(objects, options) {
        return objects;
    }

    /**
     * Generic method to update or create object
     * @param criteria
     * @param params
     * @param [options]
     */
    updateOrCreate(criteria, params, options) {
        const defaultOptions = {
            // upsert: true,
            // runValidators: true,
            // setDefaultsOnInsert: true
        };
        options = Object.assign(defaultOptions, this.options, this.getOptions(options));

        return (criteria ? this.findOne(criteria, options) : Promise.resolve())
            .then(object => {
                return object ? this.update(criteria, params, options) : this.create(params, options);
            })
            .catch(err => {
                console.error(`${this.constructor.name}.updateOrCreate: Error`, err);
                throw err;
            });
    }

    /**
     * Hook method to be called before remove
     * @param params
     */
    beforeRemove(criteria) {
        return new Promise(resolve => resolve(criteria));
    }

    /**
     * Hook method to be called after remove
     * @param object
     */
    afterRemove(object) {
        return object;
    }

    /**
     * Generic method to remove object
     * @param criteria
     */
    remove(criteria, options) {
        return this.beforeRemove(criteria)
            .then(newCriteria => this.Model.destroy(newCriteria, options))
            .then(object => this.afterRemove(object))
            .catch(err => {
                console.error(`${this.constructor.name}.remove: Error`, err);
                throw err;
            });
    }

}

module.exports = ResourceService;
