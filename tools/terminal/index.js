const fetch = require('node-fetch');
const { resolve, join, extname } = require('path');
const { promisify } = require('util');
const figletAsync = promisify(require('figlet'));
const clear = require('clear');
const inquirer = require('inquirer');
const ora = require('ora');
const AWS = require('aws-sdk');
const { createReadStream, readdirSync, createWriteStream } = require('fs');
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
  } catch (err) {
    spinner.text = `${name.toUpperCase()} is not available on ${address}`;
    spinner.fail();
    errCallback(err);
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
          } else if (name.includes('/node_modules/')) {
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

exports.upload = (fileName) => {
  return new Promise((resolve, reject) => {
    const spinner = ora({
      text: `Uploading...`
    }).start();

    const s3Bucket = new AWS.S3({
      endpoint: 'https://s3.amazonaws.com/ce-application-submissions/',
      s3BucketEndpoint: true
    });

    const filePath = join(__dirname, '..', '..', fileName);
    const readStream = createReadStream(filePath);

    const params = {
      Bucket: 'ce-application-submissions',
      Key: fileName,
      Body: readStream
    };

    s3Bucket.upload(params, (err, data) => {
      if (err) {
        console.error(chalk.red('Failed to upload. Please check your connection and try again.'));
        spinner.text = 'Upload failed!';
        spinner.fail();
        reject();
      } else {
        spinner.text = 'Upload completed successfully!';
        spinner.succeed();
        resolve();
      }
    });
  });
};
