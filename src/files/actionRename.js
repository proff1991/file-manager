import { rename as frRename } from 'fs/promises';
import { join as pathJoin, isAbsolute as pathIsAbsolute, dirname as pathDirname } from "path";
const errorMessage = "Operation failed"

const actionRename = async (__dirname, file, newFileName) => {

    try {

        let currentFilePath = pathIsAbsolute(file) ? file : pathJoin(__dirname, file)
        let newFilePath = pathIsAbsolute(newFileName) ? newFileName : pathJoin(pathDirname(currentFilePath), newFileName)        
        await frRename(currentFilePath, newFilePath);

    }catch(e){

        console.error(errorMessage)
    
    }

}

export default actionRename