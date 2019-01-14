/**
 * Created by asafam on 1/1/19.
 */

'use strict';

const Promise = require('bluebird');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const jsender = require('jsender');
const Config = require('./config');
const errorHandler = require('./controllers/errors-controller');

const app = express();
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(responseTime());
app.use(jsender());
app.use(errorHandler);

new Promise.resolve()
    .then(() => config.config(app))
    .then(() => {
        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.info(`App listening on port ${PORT}`);
            console.info('Press Ctrl+C to quit.');
        });
    });

