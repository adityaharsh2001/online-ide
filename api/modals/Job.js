const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    ext : {
        type: String,
        required: true,
        enum: ["cpp", "py" , "java"]
    },
    filepath: {
        type: Array,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    startedAt: {
        type: Date
    },
    CompileddAt: {
        type: Date
    },
    output: {
        type: String
    },
    status: {
        type: String,
        default: "running",
        enum: ["running", "Executed Successfully", "Error Executing the File"]
    }

});

const Job = new mongoose.model('Job', JobSchema);
 
module.exports = Job;