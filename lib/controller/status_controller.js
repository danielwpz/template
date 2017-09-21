'use strict';

const Promise = require('bluebird');
const errors = require('@danielwpz/waffle').error;

function statusController() {

  function health(req, res) {
    return Promise.resolve({ health: 'ok' });
  }

  function version(req, res) {
    throw new errors.NotImplementedError();
  }

  return {
    health,
    version
  };

}

module.exports = statusController;