const { spawn } = require("child_process");
const path = require("path");
const { stderr } = require("process");

const executePy = (filepath) => {
  const file = path.basename(filepath[1].split(".")[0]);

  const execute = new Promise((resolve, reject) => {
    try {
      const run = spawn(
        `cd ${filepath[0]} &&  python3 main.py < ${file}.txt `,
        {
          shell: true,
          maxBuffer: 50000
        }
        // (error, stdout, stderr) => {
        //   error && reject({ error, stderr });
        //   stderr && reject(stderr);
        //   resolve(stdout);
        // }
      );
      var stderr=""
      run.stderr.on("data", (data) => {
        // console.log(String(data));
        stderr += data;
      });
      run.stdout.on("data", (data) => {
        resolve(data);
      });
      run.on("error", (err) => {
        throw new Error(err.message);
      });
      run.on("exit", (code) => {
        if (code !== 0) {
          resolve(stderr)
        }
      });
    } catch (e) {
      reject(e);
    }
  });

  return execute;
};

module.exports = {
  executePy,
};
