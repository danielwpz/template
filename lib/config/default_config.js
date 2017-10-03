'use strict';

const config = {
  log: {
    disable_endpoints: [
      '/status/health',
      '/status/version'
    ]
  }
};

module.exports = function () {
  return config;
};