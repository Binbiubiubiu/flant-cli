const chalk = require("chalk");
const log = console.log;

const warn = (str) => log(chalk.yellow(str));

module.exports = {
  warn,
};
