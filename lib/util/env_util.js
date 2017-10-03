'use strict';

/*
 * reading node env is actually expensive,
 * so we cache it when app starts
 */
const NODE_ENV = process.env.NODE_ENV;

function envUtil() {

  return {
    isDevelopment: function () {
      return NODE_ENV === 'development';
    },
    isProduction: function () {
      return NODE_ENV === 'production';
    },
    isTest: function () {
      return NODE_ENV === 'test';
    }
  };
}

module.exports = envUtil;


