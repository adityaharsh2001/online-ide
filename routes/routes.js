const express = require("express");
const router = express.Router();

const { generateFile } = require("../controllers/coderunner/generateFile");


const {addJobToQueue} = require('../controllers/queue')
const Job = require("../modals/Job");

router.get("/", (req, res) => {
  res.send(`GeekyAdi Is God`);
})

router.get("/status", async(req, res) => {
  const jobid = req.query.id;
  
  if (jobid == undefined)
  return res.status(400).json({success: false, error: "Job Id Query is undefined"})
  // console.log("status", jobid);
  try {
    const job = await Job.findById(jobid);
    // console.log("job", job)
    if (job === undefined){ 
      return res.status(404).json({success: false, error: "Invalid Job ID"});
    }
    else return res.status(200).json({success: true, job});
  }
  catch{
    console.log(err)
    return res.status(400).json({success: false, error: JSON.stringify(err)})
  }
});

router.post("/run", async (req, res) => {
  
  const { jobId, ext, code, input } = req.body;
  
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  let job;  
  try {
    // console.log(ext);
    const filepath = await generateFile(jobId, ext, code, input);
    job = await new Job({ext, filepath}).save()
    const jobid = job["_id"];
    addJobToQueue(jobid);
    // console.log(job);
    res.status(201).json({success: true, jobid})

  } catch (err) {
    
    res.status(500).json({success: false, err: JSON.stringify(err) });
  }
});

module.exports = router;
