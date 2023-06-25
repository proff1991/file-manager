import { createReadStream as fsCreateReadStream } from 'fs'
import { join as pathJoin, isAbsolute as pathIsAbsolute } from "path";
const errorMessage = "Operation failed"

const actionRename = async (__dirname, file) => {

    let filePath = pathIsAbsolute(file) ? file : pathJoin(__dirname, file)

    try {

    const stream = fsCreateReadStream(filePath, 'utf8')

    for await (const data of stream) {

        console.log(data)

    }

    }catch(e){

    console.error(errorMessage)
    
    }

}

export default actionRename