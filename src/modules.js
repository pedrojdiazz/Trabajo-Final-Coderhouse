import { promises as fs } from "fs";


const readJsonFile = async (path) => {
    try {
        const data = await fs.readFile(path);
        return JSON.parse(data);
    } catch (error) { 
        throw error;
    }
}


const writeJsonFile = async (path, data) => {
    try{
        await fs.writeFile(path, JSON.stringify(data, null, 2));
    } catch (error) { 
        throw error;
    }
}

export {writeJsonFile, readJsonFile};