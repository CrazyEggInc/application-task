const { printHeader, checkServer, initEnv, upload, createTar } = require('./terminal');
const chalk = require('chalk');
const inquirer = require('inquirer');

const start = async () => {
  initEnv();
  await printHeader();

  const answers = await inquirer.prompt([
    {
      name: 'firstName',
      message: 'What is your first name?'
    },
    {
      name: 'lastName',
      message: 'And your last name?'
    }
  ]);
  const firstName = answers.firstName.replace(/[\W_]+/g, '').toLowerCase();
  const lastName = answers.lastName.replace(/[\W_]+/g, '').toLowerCase();
  const fileName = `${firstName}${lastName}`;
  console.log(fileName);
  exit(1);

  try {
    const compressedFile = await createTar(fileName);
    await upload(compressedFile);
  } catch (err) {
    console.error(chalk.red('Failed to submit.'));
  }
};

start();
