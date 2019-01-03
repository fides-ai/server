/**
 * Created by asafam on 1/1/19.
 */

'use strict';

const express = require('express');
const apiRouter = require('./api');


const mount = (app) => {
    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
            // return 200 on OPTIONS request
            return res.sendStatus(200);
        } else if (req.url.indexOf('//') > -1 && req.url.length > 1) {
            // remove double slashes
            req.url = req.url.replace(/[/]+/g, '/');
            return res.redirect(301, req.url);
        } else {
            next();
        }
    });

    app.use('/api', apiRouter);
};

module.exports = {
    mount
};
