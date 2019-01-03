/**
 * Create by asafam on 1/2/19.
 */

'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const yaml = require('js-yaml');

const SETTINGS_APP_FILE_PATH = `${__dirname}/application.yml`;
const SETTINGS_ENV_FILE_PATH = `${__dirname}/${process.env.NODE_ENV}.yml`;

let _settings = null;

class Settings {

    loadSettingsFilesSync(path, reload=false, verbose=false) {
        verbose && console.info(`Settings: start loading settings ${path}`);
        const file = fs.readFileSync(path);
        _settings = (_settings && !reload) || yaml.safeLoad(file);
        verbose && console.info(`Settings: finish loading settings ${path}`);
        return _settings;
    }

    get settings() {
        if (_settings) {
            return _settings;
        }
        const appSettings = this.loadSettingsFilesSync(SETTINGS_APP_FILE_PATH);
        const envSettings = this.loadSettingsFilesSync(SETTINGS_ENV_FILE_PATH);
        _settings = _.merge(appSettings, envSettings);
        return _settings;
    }
}

module.exports = Settings;