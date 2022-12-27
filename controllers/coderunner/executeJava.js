const { spawn } = require("child_process");
const path = require("path");

const executeJAVA = async (filepath) => {
  const file = path.basename(filepath[1].split(".")[0]);

  const execute = await new Promise((resolve, reject) => {
    const run = spawn(
      `cd ${filepath[0]} && javac ${file}.java && java ${file}`,
      {
        shell: true,
        maxBuffer: 50000
      }
    );
    run.stderr.on("data", (data) => {
      resolve(String(data));
    });
    run.stdout.on("data", (data) => {
      resolve(data);
      // console.log(data);
    });
  });

  return execute;
};

module.exports = {
  executeJAVA,
};
