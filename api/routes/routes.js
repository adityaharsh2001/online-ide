const express = require("express");
const router = express.Router();

const { generateFile } = require("../controllers/generateFile");
const { executeCpp } = require("../controllers/executeCpp");
const { executePy } = require("../controllers/executePy");


const Job = require("../modals/Job");
router.get("/", (req, res) => {
  return res.json({ hello: "world!" });
});

router.post("/run", async (req, res) => {
  const { ext, code, input } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try {
    // console.log(ext);
    const filepath = await generateFile(ext, code, input);
    const job = await new Job({ext, filepath}).save()
    const jobid = job["_id"];
    console.log(job);

    res.status(201).json({success: true, jobid})
    let output;
    if (ext === "cpp") output = await executeCpp(filepath);
    else if (ext === "py") {
      output = await executePy(filepath);
    }
    console.log({ filepath, output })
    // return res.json({ filepath, output });
  } catch (err) {
    console.log({err})
    // res.status(500).json({ err });
  }
});

module.exports = router;
