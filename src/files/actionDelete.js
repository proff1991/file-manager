import { join as pathJoin, isAbsolute as pathIsAbsolute } from "path";
import { rm as fsRm } from 'fs/promises';

const actionDelete = async (__dirname, file, errorMessage) => {

    try {

        let filePath = pathIsAbsolute(file) ? pathJoin(file) : pathJoin(__dirname, file)
        await fsRm(filePath)

    }catch(e){

        errorMessage ? console.error(errorMessage) : ""
    
    }

}

export default actionDelete