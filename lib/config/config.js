'use strict';

const _ = require('lodash');

module.exports = function (
  envUtil,
  defaultConfig,
  testConfig,
  developmentConfig,
  productionConfig,
  localConfig) {

  let envConfig;

  if (envUtil.isProduction()) {
    envConfig = productionConfig;
  } else if (envUtil.isTest()) {
    envConfig = testConfig;
  } else {
    envConfig = developmentConfig;
  }

  return _.merge({}, defaultConfig, envConfig, localConfig);
};