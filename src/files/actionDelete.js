import { join as pathJoin, isAbsolute as pathIsAbsolute } from "path";
import { rm as fsRm } from 'fs/promises';
const errorMessage = "Operation failed"

const actionDelete = async (__dirname, file) => {

    try {

        let filePath = pathIsAbsolute(file) ? file : pathJoin(__dirname, file)
        await fsRm(filePath)

    }catch(e){

        console.error(errorMessage)
    
    }

}

export default actionDelete