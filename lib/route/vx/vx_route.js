'use strict';

const Waffle = require('@danielwpz/waffle');

function vxRoute(statusRoute) {

  function mount(router) {
    const statusRouter = new Waffle.router();
    statusRoute.mount(statusRouter);
    router.use('/status', statusRouter);
  }

  return {
    mount
  };
}

module.exports = vxRoute;