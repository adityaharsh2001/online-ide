const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");
const inputPath = path.join(__dirname, "inputs");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}
if (!fs.existsSync(inputPath)) {
  fs.mkdirSync(inputPath, { recursive: true });
}

const generateFile = async (jobId, format, content, input) => {
  const filename = `${jobId}.${format}`;
  const inputFileName = `${jobId}.txt`;
  const inputFilePath = path.join(inputPath, inputFileName);
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, content);
  await fs.writeFileSync(inputFilePath, input);
  return [filepath, inputFileName];
};

module.exports = {
  generateFile,
};
