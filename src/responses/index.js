/**
 * Created by asafam on 1/1/19.
 */

'use strict';


const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));


const mount = (app) => {
    // responses
    console.debug('Loading responses...');
    var responsesDirName = __dirname;
    fs.readdirAsync(responsesDirName)
        .then(files => {
            files.forEach(file => {
                if (!isNaN(parseInt(file.substring(0, file.lastIndexOf('.')))) && file.substring(file.lastIndexOf('.')) === 'js') {
                    console.debug(responsesDirName + '/' + file);
                    const response = require(responsesDirName + '/' + file);
                    app.use(response);
                }
            });
        });
    console.debug('Finish loading responses.');
};

module.exports = {
    mount
};