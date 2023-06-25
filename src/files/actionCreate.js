import { createWriteStream as fsCreateWriteStream } from 'fs'
import { join as pathJoin, isAbsolute as pathIsAbsolute } from "path";
const errorMessage = "Operation failed"

const actionCreate = async (__dirname, file) => {

    try {

    let filePath = pathIsAbsolute(file) ? file : pathJoin(__dirname, file)
    const stream = fsCreateWriteStream(filePath)
    stream.end()

    }catch(e){

    console.error(errorMessage)
    
    }

}

export default actionCreate