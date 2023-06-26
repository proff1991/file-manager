import { createHash as cryptoCreateHash } from 'crypto'
import { readFile as fsReadFile } from 'fs/promises'
import { join as pathJoin } from 'path'

const calculateHash = async (file) => {

    let currentFilePath = pathIsAbsolute(file) 
    ? pathJoin(file)
    : pathJoin(__dirname, file)

    const content = await fsReadFile(currentFilePath)
    const hashDataSrc = cryptoCreateHash('sha256').update(content)
    const hashDataHex = hashDataSrc.digest('hex')
    console.log(hashDataHex)
    
}