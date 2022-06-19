const { spawn } = require("child_process");
const path = require("path");
const events = require("events");
const eventEmitter = new events.EventEmitter();
const executeCpp = (filepath) => {
  const file = path.basename(filepath[1].split(".")[0]);

  const execute = new Promise((resolve, reject) => {
    var res = "";
    try {
      const run = spawn(
        `cd ${filepath[0]} && g++ ${file}.cpp -o ${file}.out && ./${file}.out < ${file}.txt`,
        {
          shell: true,
        }
      );
      run.stdout.on("data", (data) => {
        res += data;
      });
      run.stderr.on("data", (data) => {
        res += data;
      });
      run.on("error", (err) => {
        throw new Error(err.message);
      });
      run.on("close", (exitCode) => {
        if (parseInt(exitCode) !== 0) {
          //Handle non-zero exit
          throw new Error("Error Executing the File");
        }
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });

  return execute;
};

module.exports = {
  executeCpp,
};
