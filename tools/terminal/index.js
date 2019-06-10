const fetch = require('node-fetch');
const { resolve, join, extname } = require('path');
const { promisify } = require('util');
const figletAsync = promisify(require('figlet'));
const clear = require('clear');
const inquirer = require('inquirer');
const ora = require('ora');
const AWS = require('aws-sdk');
const { createReadStream, statSync, createWriteStream } = require('fs');
const tar = require('tar-fs');
const del = require('del');
const chalk = require('chalk');
const zlib = require('zlib');

exports.initEnv = () => {
  require('dotenv').config({ path: resolve(__dirname, '..', '..', '.env') });
  console.log(process.env.BACKEND_URL);
};

exports.printHeader = async () => {
  clear();

  try {
    console.log(await figletAsync('CrazyEgg'));
    console.log();
  } catch {}
}

exports.sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

exports.checkServer = async (name, address, errCallback) => {
  const spinner = ora({
    text: `Checking if ${name.toUpperCase()} is running on ${address}`
  }).start();

  try {
    const response = await fetch(address);
    if (response) {
      spinner.text = `${name.toUpperCase()} is available on ${address}`;
      spinner.succeed();
    } else {
      spinner.text = `${name.toUpperCase()} is not available on ${address}`;
      spinner.fail();
    }
  } catch (error) {
    spinner.text = `${name.toUpperCase()} is not available on ${address}`;
    spinner.fail();
    errCallback(error);
  }

  console.log();
};

exports.createTar = async (fileName) => {
  const spinner = ora({
    text: `Creating archive...`
  }).start();
  const gzip = zlib.createGzip();
  const deletedPaths = await del([
    join(__dirname, '..', '..', 'dist'),
  ]);
  return new Promise((resolve, reject) => {
    // delete node_modules and dist
    tar.pack(
      join(__dirname, '..', '..'),
      {
        ignore: name => {
          if (extname(name) === '.tar' || extname(name) === '.tar.gz') { // ignore .tar files when packing
            return true;
          } if (name.includes('/node_modules/')) {
            return true;
          }
        }
      }
    ).pipe(gzip).pipe(
      createWriteStream(
        join(__dirname, '..', '..', `${fileName}.tar.gz`)
      )
    ).on('error', () => {
      spinner.text = 'Failed to create archive. Please check directory permissions.';
      spinner.fail();
      reject();
    }).on('finish', () => {
      spinner.text = 'Archive created successfully!';
      spinner.succeed();
      resolve(`${fileName}.tar.gz`);
    });
  });
};

const getSignedUrl = async (objectKey) => {
  const url = 'https://lvf7t1rj5e.execute-api.us-east-1.amazonaws.com/production/api';
  const params = new URLSearchParams({ object_key:  objectKey });
  const request = await fetch(`${url}?${params}`);
  const response = await request.json();
  return response;
}

exports.upload = async (fileName) => {
  const spinner = ora({
    text: `Uploading...`
  }).start();

  const filePath = join(__dirname, '..', '..', fileName);
  const stats = statSync(filePath);
  const readStream = createReadStream(filePath);

  const signedUrl = await getSignedUrl(fileName);

  try {
    await fetch(signedUrl.url, {
      method: 'PUT',
      headers: {
        'Content-Length': stats.size,
        'Content-Encoding': 'gzip',
        'Content-Type': 'binary/octet-stream',
      },
      body: readStream
    });
    spinner.text = 'Upload completed successfully!';
    spinner.succeed();
  } catch (error) {
    console.error(chalk.red('Failed to upload. Please check your connection and try again'));
    spinner.text = 'Upload failed!';
    spinner.fail();
  }
};
