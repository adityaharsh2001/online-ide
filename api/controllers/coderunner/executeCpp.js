const { spawn } = require("child_process");
const path = require("path");

const executeCpp = (filepath) => {
  const file = path.basename(filepath[1].split(".")[0]);

  const execute = new Promise((resolve, reject) => {
    try {
      const run = spawn(
        `cd ${filepath[0]} && g++ ${file}.cpp -o ${file}.out && ./${file}.out < ${file}.txt`,
        {
          shell: true,
          maxBuffer: 50000
        }
      );
      run.stdout.on("data", (data) => {
        resolve(data);
      });
      run.stderr.on("data", (data) => {
        resolve(data);
      });
      run.on("error", (err) => {
        throw new Error(err.message);
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
