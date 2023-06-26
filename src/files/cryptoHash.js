import { createHash as cryptoCreateHash } from 'crypto'
import { readFile as fsReadFile } from 'fs/promises'
import { join as pathJoin, isAbsolute as pathIsAbsolute } from 'path'
const errorMessage = 'Operation failed'

 async function cryptoHash(__dirname, file){

    try{

        let currentFilePath = pathIsAbsolute(file) 
        ? pathJoin(file)
        : pathJoin(__dirname, file)
    
        const content = await fsReadFile(currentFilePath)
        const hashDataSrc = cryptoCreateHash('sha256').update(content)
        const hashDataHex = hashDataSrc.digest('hex')
        console.log(hashDataHex)

    }catch{

        console.error(errorMessage)

    }


}

export default cryptoHash