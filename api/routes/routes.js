const express = require('express');
const router = express.Router();
const generateFile = require("../controllers/file-generator");
const { executeCpp } = require("../controllers/runner-cpp");

router.post("/run", async (req, res) => {
    console.log(req.body);
    const code = req.body.code;
  
    if (code === undefined) {
      return res.status(400).json({ success: false, error: "empty code" });
    }
    try {
      const filepath = await generateFile(code, language);
      const output = await executeCpp(filepath);
      return res.status(200).send(output);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });

module.exports = router;