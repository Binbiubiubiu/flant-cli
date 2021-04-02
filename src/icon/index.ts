import readline from "readline";
import fs from "fs";
import ejs from "ejs";

import { success, warn } from "../log";
import {
  formatIconName,
  GENERATOR_TEMPLATE,
  ICON_ID_REGEX,
  ICON_NAME_BLACK_LIST,
  ICON_NAME_REGEX,
} from "./utils";
import { localFile } from "../utils";
import commander from "commander";

interface FlanIcon {
  name: string;
  code: string;
}

function apply(file: string, options: any) {
  if (!file) {
    warn("请选择目标文件");
    return;
  }

  let icons: FlanIcon[] = [];
  let iconName: string;

  const rl = readline.createInterface({
    input: fs.createReadStream(localFile(file)),
  });

  rl.on("line", function (line) {
    if (!line) return; // 忽略空行

    //匹配名字行
    if (ICON_NAME_REGEX.test(line)) {
      return formatIconName(line.match(ICON_NAME_REGEX)![1]);
    }
    //匹配icon 内容行
    if (ICON_ID_REGEX.test(line)) {
      const code = line.match(ICON_ID_REGEX)![1];
      icons.push({
        name: iconName,
        code,
      });
    }
  });

  rl.on("close", function () {
    const { familyName } = options;
    fs.writeFileSync(
      localFile(options.output),
      ejs.render(GENERATOR_TEMPLATE, { icons, familyName })
    );
    success("generate icons file success!!!");
  });
}

export default function (program: commander.Command) {
  program
    .command("generate_icons <file>")
    .alias("gi")
    .description("generate icon dart file from css file")
    .option("-o, --output <path>", "output filepath", "icons.dart")
    .option("-n, --name <name>", "familyName", "flanIcon")
    .action(apply)
    .addHelpText(
      "after",
      `\nExamples:\n  $ flant-cli generate_icons icon.less\n  $ flant-cli gi icon.less`
    );
}
