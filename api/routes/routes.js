const express = require("express");
const router = express.Router();

const { generateFile } = require("../controllers/coderunner/generateFile");
const { executeCpp } = require("../controllers/coderunner/executeCpp");
const { executePy } = require("../controllers/coderunner/executePy");


const Job = require("../modals/Job");
const { json } = require("express");


router.get("/status", async(req, res) => {
  const jobid = req.query.id;
  
  if (jobid == undefined)
  return res.status(400).json({success: false, error: "Job Id Query is undefined"})
  console.log("ststus", jobid);
  try {
    const job = await Job.findById(jobid);
    if (job === undefined){ 
      return res.status(404).json({success: false, error: "Invalid Job ID"});
    }
    return res.status(200).json({success: true, job});
  }
  catch{
    console.log(err)

    return res.status(400).json({success: false, error: JSON.stringify(err)})
  }
});

router.post("/run", async (req, res) => {
  const { ext, code, input } = req.body;
  
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  let job;  
  try {
    // console.log(ext);
    const filepath = await generateFile(ext, code, input);
    job = await new Job({ext, filepath}).save()
    const jobid = job["_id"];
    console.log(job);

    res.status(201).json({success: true, jobid})

    job["startedAt"] = new Date();

    if (ext === "cpp") output = await executeCpp(filepath);
    else if (ext === "py") {
      output = await executePy(filepath);
    }

    job["CompiledAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    
    await job.save();
  
    console.log(job)
    
    // return res.json({ filepath, output });
  } catch (err) {
    
    job["CompletedAt"] = new Date();
    job["status"] = "error";
    // console.log(err);
    job["output"] = JSON.stringify(err)
    
    await job.save();
    console.log(job)
    // res.status(500).json({ err });
  }
});

module.exports = router;
