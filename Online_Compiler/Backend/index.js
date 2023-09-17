const express = require('express');
const { generateFile } = require('./generateFile');

const {addJobToQueue} = require('./jobQueue')
const Job = require("./models/Job");
const cors = require("cors");
const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/ojapp", (err) => {
//     if(err) {
//         console.error(err);
//         process.exit(1);
//     }
//     console.log("Successfully connected to mongodb database");
// });

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/ojapp');
  console.log("Successfully connected to mongodb database");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/status", async(req, res) => {
    
    
    const jobId = req.query.id;
    console.log("status requested", jobId);

    if(jobId == undefined) {
        return res.status(400).json({success: false, error: "missing id query param"});
    }
    try {
        const job = await Job.findById(jobId);

        if(job === undefined) {
            return res.status(404).json({success: false, error: "invalid job id"});
        }

        return res.status(200).json({success: true, job});

    }
    catch (err) {
        return res.status(400).json({success:false, error: JSON.stringify(err)});
    }

});

app.post("/run", async (req, res) => {
    const {language = "cpp",code} = req.body;
    
    if (code === undefined) {
        return res.status(400).json({success: false, error: "Empty code body"});
    }

    let job;

    try {
    const filepath = await generateFile(language, code)
    job = await new Job({language, filepath}).save();
    const jobId = job["_id"];
    addJobToQueue(jobId);
    console.log(job);
    res.status(201).json({success: true, jobId});

    } catch(err)
    {
        return res.status(500).json({success: false, err: JSON.stringify(err)})
    }
    
});

app.listen(5000, () => {
    console.log('Listening on port 5000!');
});