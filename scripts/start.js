#!/usr/bin/env node

// eslint-disable-next-line import/newline-after-import
require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const DevServer = require('webpack-dev-server');

const createClientConfig = require('../webpack/client');
const createServerConfig = require('../webpack/server');

const { CONTENT_PORT } = require('../webpack/configUtils');

async function main() {
  const clientConfig = createClientConfig('dev');

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(createServerConfig('dev'));

  clientCompiler.plugin('done', () => {
    serverCompiler.watch(null, () => {});
  });

  const clientDevServer = new DevServer(clientCompiler, {
    port: CONTENT_PORT,
    hot: true,
    compress: true,
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      disableDotRule: true,
    },
  });

  clientDevServer.listen(CONTENT_PORT, () => console.log('server started'));
}

main();
