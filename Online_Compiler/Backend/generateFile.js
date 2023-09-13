const fs = require("fs");
const path = require("path");
const { v4:uuidv4 } = require('uuid');

const drCode = path.join(__dirname,"codes");

if(!fs.existsSync(drCode))
{
    fs.mkdirSync(drCode,{recursive:true});
}

const generateFile = async(format, content) => {
    const Id = uuidv4();
    const filename = `${Id}.${format}`;
    const filepath = path.join(drCode,filename);
    await fs.writeFileSync(filepath,content);
    return filepath;
};

module.exports = {
    generateFile,
};