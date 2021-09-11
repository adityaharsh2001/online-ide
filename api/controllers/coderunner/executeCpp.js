const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


const executeCpp = (filepath) => {
  const jobId = path.basename(filepath[0]).split(".")[0];

  const execute = new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath[0]} -o ${jobId}.out && ./${jobId}.out < ${filepath[0]}`,
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
