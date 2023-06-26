import { createReadStream as fsCreateReadStream } from 'fs'
import { join as pathJoin, isAbsolute as pathIsAbsolute } from 'path'
const errorMessage = 'Operation failed'

const actionRead = async (__dirname, file) => {

    try {

        let filePath = pathIsAbsolute(file) ? pathJoin(file) : pathJoin(__dirname, file)
        const stream = fsCreateReadStream(filePath, 'utf8')

        for await (const data of stream) {

        console.log(data)

    }

    }catch(e){

        console.error(errorMessage)
    
    }

}

export default actionRead