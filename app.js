'use strict';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const Waffle = require('@danielwpz/waffle');
const Innjector = require('innjector');
const logger = require('winston');

if (cluster.isMaster) {

  logger.info(`Master process ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < Math.min(numCPUs, 4); i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker process ${worker.process.pid} died`);
  });

} else {

  new Innjector(process.cwd() + '/lib', function (err, container) {

    if (err) {
      logger.error(err);
      logger.notice('Innjector error, exiting now');
      process.exit(1);
    }

    const config = container.get('config');
    const app = new Waffle({
      disable_log: config.log.disable_endpoints
    });

    const vxRoute = container.get('vxRoute');
    vxRoute.mount(app);

    app.run(process.env.npm_package_config_port);

  });
}
