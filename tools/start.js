const chalk = require('chalk');
const webpack = require('webpack');
const { printHeader, initEnv } = require('./terminal');
const webpackConfig = require('./webpack/webpack.config.dev');

const serve = () => {
  return new Promise(async (resolve, reject) => {
    const WebpackDevServer = require('webpack-dev-server');

    const options = {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      inline: true,
      stats: { colors: true }
    };

    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, options);

    compiler.hooks.done.tap('project', (stats) => {
      // compiled
      if (stats.compilation.errors.length) {
        reject(server)
      } else {
        console.log();
        console.log(chalk.green('Server started on http://localhost:8080'));
        console.log();
        resolve(server);
      }
    });

    server.listen(8080, 'localhost', err => {
      if (err) {
        reject(server);
      }
      console.log(chalk.green(`Development server starting...`));
    });
  });
};

const start = async () => {
  initEnv();
  await printHeader();
  console.log(chalk.yellow('You will be up and running in a second...'));
  console.log();
  await serve();
};

start();
