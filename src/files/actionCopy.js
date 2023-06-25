import { createReadStream as fsCreateReadStream, createWriteStream as fsCreateWriteStream } from 'fs'
import { pipeline as streamPipeline } from 'stream/promises'
import { join as pathJoin, isAbsolute as pathIsAbsolute, dirname as pathDirname, parse as pathParse } from "path";
const errorMessage = "Operation failed"

const actionCopy = async (__dirname, file, newFileName) => {

    try {

        let currentFilePath = pathIsAbsolute(file) 
        ? file 
        : pathJoin(__dirname, file)

        let newFilePath = pathIsAbsolute(newFileName) 
        ? newFileName 
        : pathJoin(pathDirname(currentFilePath), newFileName)

        newFilePath = pathParse(currentFilePath)['base'] == pathParse(newFilePath)['base'] 
        ? newFilePath
        : newFilePath + pathParse(currentFilePath)['base']

        let readStream = fsCreateReadStream(currentFilePath)
        let writeStream = fsCreateWriteStream(newFilePath)
        await streamPipeline(readStream, writeStream)

    }catch(e){

        console.error(errorMessage)
    
    }

}

export default actionCopy