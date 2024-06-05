import fs from "fs";


const readJsonFile = (path) => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}


const writeJsonFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export {writeJsonFile, readJsonFile};