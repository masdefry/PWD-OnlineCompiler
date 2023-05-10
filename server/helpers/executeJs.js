const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "../outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJs = (filepath) => {
  const fileId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${fileId}.out`);

  return new Promise((resolve, reject) => {
    exec(
      `node ${filepath}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeJs
};