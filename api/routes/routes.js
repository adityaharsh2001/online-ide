const express = require("express");
const router = express.Router();

const { generateFile } = require("../controllers/generateFile");
const { executeCpp } = require("../controllers/executeCpp");
const { executePy } = require("../controllers/executePy");

router.get("/", (req, res) => {
  return res.json({ hello: "world!" });
});

router.post("/run", async (req, res) => {
  const { language, code, input } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {
    console.log(language);
    const filepath = await generateFile(language, code, input);
    let output;
    if (language === "cpp") output = await executeCpp(filepath);
    else if (language === "py") {
      output = await executePy(filepath);
    }
    return res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
