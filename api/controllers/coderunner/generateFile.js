const fs = require("fs");
const path = require("path");

const generateFile = async (jobId, format, content, input) => {
  const dirCodes = path.join(__dirname, `${jobId}`);

  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  const filename = `main.${format}`;
  const inputFileName = `main.txt`;
  const inputFilePath = path.join(dirCodes, inputFileName);
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, content);
  await fs.writeFileSync(inputFilePath, input);
  return [dirCodes, filename];
};

module.exports = {
  generateFile,
};
