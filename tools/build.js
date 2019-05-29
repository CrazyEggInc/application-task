const { printHeader, initEnv } = require('./terminal');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConf = require('./webpack/webpack.config.prod');
const ora = require('ora');

const compileWebpack = () => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.hooks.done.tap('project', (stats) => {
      // compiled
      if (stats.compilation.errors.length) {
        reject(stats.compilation.errors);
      } else {
        resolve();
      }
    });

    compiler.run();
  });
}

const build = async () => {
  initEnv();
  printHeader();

  const spinner = ora({
    text: `Building project...`
  }).start();

  try {
    await compileWebpack();
    spinner.text = 'Build completed successfully!';
    spinner.succeed();
  } catch (err) {
    spinner.text = 'Build failed.';
    spinner.fail();
    console.error(chalk.red('Failed to build.'));
  }
};

build();
