import { Command } from "commander";
import pkg from "../package.json";
import { errorCatch } from "./utils";

import IconPlugin from "./icon";

errorCatch();

const program = new Command();
program.version(pkg.version);

IconPlugin(program);

program.parse(process.argv);
