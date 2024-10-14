import { createReadStream as fsCreateReadStream, createWriteStream as fsCreateWriteStream } from 'fs'
import { readdir as fsReaddir } from 'fs/promises'
import { createBrotliCompress, createBrotliDecompress } from 'zlib'
import { pipeline as streamPipeline } from 'stream/promises'
import { join as pathJoin, isAbsolute as pathIsAbsolute, parse as pathParse, dirname as pathDirname } from 'path'
const errorMessage = 'Operation failed'

import { homedir } from 'os'
let __dirname = homedir()

async function checkType(exportPath, extension){

    let list = await fsReaddir(pathJoin(pathDirname(exportPath)), { withFileTypes: true })

    let parse = pathParse(pathJoin(exportPath))['base']

    if(JSON.stringify(parse) == '"."'){
        return extension
    }

    let type = list.filter( dir => dir.name == parse)[0]
    
    try{

        if(type.isDirectory()){
            return extension
        }else{
            return ''
        }
    }catch{

        return ''

    }
}


async function actionArchive(type, __dirname, currentFile, newFile){

    try {

        let currentFilePath = pathIsAbsolute(currentFile) 
        ? pathJoin(currentFile)
        : pathJoin(__dirname, currentFile)

        let newFilePath = pathIsAbsolute(newFile) 
        ? pathJoin(newFile)
        : pathJoin(pathDirname(currentFilePath),"\\", newFile) 


        console.log({currentFile,newFile})
        console.log({currentFileAbs: pathIsAbsolute(currentFile) ,newFileAbs:  pathIsAbsolute(newFile)  })


        if(type == 'compress'){
            console.log({currentFilePath, newFilePath})
            newFilePath = newFilePath + "\\" + pathParse(currentFilePath)['base'] + '.br'
            console.log({newFilePath})
        }else if(type == 'decompress'){
            
            newFilePath = pathJoin(newFilePath, await checkType(newFilePath, pathParse(currentFilePath)['name']))

        }

        let readStream = fsCreateReadStream(currentFilePath)
        let writeStream = fsCreateWriteStream(newFilePath)

        let actionType = type == 'compress' ? createBrotliCompress : type == 'decompress' ? createBrotliDecompress : null

        await streamPipeline( readStream, actionType(), writeStream )

    }catch(e){

        console.error(errorMessage)
    
    }

}

export default actionArchive