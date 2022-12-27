const Queue = require("bull");

const Job = require("../modals/Job");
const { executeCpp } = require("./coderunner/executeCpp");
const { executePy } = require("./coderunner/executePy");
const { executeJAVA} = require("./coderunner/executeJava");

const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const jobId = data.id;
  const job = await Job.findById(jobId);
  if (job === undefined) {
    throw Error(`cannot find Job with id ${jobId}`);
  }
  try {
    let output;
    job["startedAt"] = new Date();
    if (job.ext === "cpp") {
      output = await executeCpp(job.filepath);
    } else if (job.ext === "py") {
      output = await executePy(job.filepath);
    }
    else if (job.ext === "java"){
      output = await executeJAVA(job.filepath);
    }
    job["completedAt"] = new Date();
    job["status"] = "Executed Successfully";
    job["output"] = output;
    await job.save();
    return true;
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "Error Executing the File";
    job["output"] = err.stderr;
    await job.save();
    throw Error(JSON.stringify(err));
  }
});
jobQueue.on("completed", () => {
  // console.log("completed")
})
jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async (jobId) => {
  jobQueue.add({
    id: jobId,
  });
};

module.exports = {
  addJobToQueue,
};