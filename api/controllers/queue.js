const Queue = require("bull");
const Job = require("../modals/Job");

const { executeCpp } = require("./coderunner/executeCpp");
const { executePy } = require("./coderunner/executePy");

const jobQueue = new Queue("job-queue");

const workers = 5;
jobQueue.process(workers, async ({ data }) => {
  console.log(data);
  const { id: jobid } = data;
  const job = await Job.findById(jobid);
  if (job === undefined) {
    throw Error("Job not found");
  }
  console.log("Fetched Job", job);

  try {
    job["startedAt"] = new Date();

    if (job.ext === "cpp") output = await executeCpp(job.filepath);
    else if (ext === "py") {
      output = await executePy(job.filepath);
    }

    job["CompiledAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;

    await job.save();

    console.log(job);

    // return res.json({ filepath, output });
  } catch (err) {
    job["CompletedAt"] = new Date();
    job["status"] = "error";
    // console.log(err);
    job["output"] = JSON.stringify(err);

    await job.save();
    console.log(job);
    // res.status(500).json({ err });
  }
  return true;
});
jobQueue.on("failed", (error) => {
  console.log(error.data.id, "Failed", error.failedReason);
});
const addJobToQueue = async (jobid) => {
  await jobQueue.add({ id: jobid });
};

module.exports = {
  addJobToQueue,
};
