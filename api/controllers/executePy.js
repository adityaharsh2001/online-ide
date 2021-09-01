const { exec } = require("child_process");
const path = require("path");
const inputPath = path.join(__dirname, "inputs");
const executePy = (filepath) => {

  const execute = new Promise((resolve, reject)  => {
    exec(
      `cat ${inputPath}/${filepath[1]} | python3 ${filepath[0]}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  })
  
  return execute
};

module.exports = {
  executePy,
};