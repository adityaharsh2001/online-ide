const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");
const inputPath = path.join(__dirname, "inputs");
const dirCodes = path.join(__dirname,"codes" );
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath[0]).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  // exec (`rm -rf ${dirCodes}/${filepath[0]} ${inputPath}/${jobId}.out ${inputPath}/${filepath[1]}`);
  const execute = new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath[0]} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}/${filepath[1]}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    )
  });

  return execute
};

module.exports = {
  executeCpp,
};
