const readline = require("readline");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { warn } = require("../log");

const todoParseFile = process.argv.splice(2)[0];

if (!todoParseFile) {
  warn("请选择目标文件");
  return;
}

const join = (name) => path.join(__dirname, name);
const localFile = (name) => path.join(process.cwd(), name);

const ICON_NAME_REGEX = /^.van-icon-(.+)::before/;
const ICON_ID_REGEX = /\"\\(.+)\";/;
const GENERATOR_TEMPLATE = join("icons.ejs");
const GENERATOR_OUTPUT = localFile("icons.dart");

let icons = [];
let iconName;

// function underLine2CamelCase(source, splitChar = "-") {
//   let arr = source.split(splitChar);
//   return (
//     arr[0] +
//     arr.slice(1).map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//   );
// }

const formatIconName = (source) => source.replace(/-/g, "_");

const rl = readline.createInterface({
  input: fs.createReadStream(localFile(todoParseFile)),
});

rl.on("line", function (line) {
  if (!line) return; // 忽略空行
  //匹配名字行
  if (ICON_NAME_REGEX.test(line)) {
    iconName = formatIconName(line.match(ICON_NAME_REGEX)[1]);
    return;
  }
  //匹配icon 内容行
  if (ICON_ID_REGEX.test(line)) {
    const id = line.match(ICON_ID_REGEX)[1];
    icons.push({
      name: iconName,
      id,
    });
  }
});

rl.on("close", function () {
  ejs.renderFile(GENERATOR_TEMPLATE, { icons }, function (err, str) {
    if (err) {
      console.error(err);
    }

    fs.writeFileSync(GENERATOR_OUTPUT, str);
  });
});
