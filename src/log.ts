import chalk from "chalk";

const log = console.log;

export const warn = (str: string) => log("🚨 " + chalk.yellow(str));
export const success = (str: string) => log("✨ " + chalk.green(str));
export const error = (str: string) => log("🔥 " + chalk.red(str));
