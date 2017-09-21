'use strict';

function statusRoute(statusController) {

  function mount(router) {
    router.get('/health', statusController.health);
    router.get('/version', statusController.version);
  }

  return {
    mount
  };
}

module.exports = statusRoute;