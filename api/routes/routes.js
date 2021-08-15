const express = require("express");
const router = express.Router();

const { generateFile } = require("../controllers/generateFile");
const { executeCpp } = require("../controllers/executeCpp");

router.get("/", (req, res) => {
  return res.json({ hello: "world!" });
});

router.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {
    const filepath = await generateFile(language, code);
    const output = await executeCpp(filepath);
    return res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
