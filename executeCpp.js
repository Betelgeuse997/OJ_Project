const { exec } = require("child_process");
const fs = require("fs");
const path = require('path');
const opPath = path.join(__dirname,"outputs");
if (!fs.existsSync(opPath)){
    fs.mkdirSync(opPath,{recursive: true});
}
const executeCpp = (filepath) => {
    const Id = path.basename(filepath).split(".")[0];
    const oP = path.join(opPath, `${Id}.out`);

    return new Promise((resolve,reject) => {
        exec(
            `g++ ${filepath} -o ${oP} && cd ${opPath} && ${Id}.out`,
            (error,stdout,stderr) => {
                error && reject({error, stderr});
                stderr && reject(stderr);
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};