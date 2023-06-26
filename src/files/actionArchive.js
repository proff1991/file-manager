import { createReadStream as fsCreateReadStream, createWriteStream as fsCreateWriteStream } from 'fs'
import { readdir as fsReaddir } from 'fs/promises'
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline as streamPipeline } from 'stream/promises'
import { join as pathJoin, isAbsolute as pathIsAbsolute, parse as pathParse, dirname as pathDirname } from "path";
const errorMessage = "Operation failed"


async function checkType(exportPath, extension){

    

    let list = await fsReaddir(pathJoin(pathDirname(exportPath)), { withFileTypes: true })
    let parse = pathParse(pathJoin(exportPath))["base"]
    let type = list.filter( dir => dir.name == parse)[0]

    try{

        if(type.isDirectory()){
            return extension
        }else{
            return ""
        }

    }catch{

        return ""

    }

}


async function actionArchive(type, __dirname, currentFile, newFile){

    try {

        let currentFilePath = pathIsAbsolute(currentFile) 
        ? pathJoin(currentFile)
        : pathJoin(__dirname, currentFile)

        console.log(currentFilePath)

        let newFilePath = pathIsAbsolute(newFile) 
        ? pathJoin(newFile)
        : pathJoin(pathDirname(currentFile), newFile) 

        if(type == 'compress'){

            newFilePath = newFilePath + pathParse(currentFilePath)['base'] + '.br'

        }else if(type == 'decompress'){

            newFilePath = pathJoin(newFilePath, await checkType(newFilePath, pathParse(currentFilePath)['name']))

        }

        console.log(newFilePath)

        let readStream = fsCreateReadStream(currentFilePath)
        let writeStream = fsCreateWriteStream(newFilePath)

        let actionType = type == 'compress' ? createBrotliCompress : type == 'decompress' ? createBrotliDecompress : null

        await streamPipeline( readStream, actionType(), writeStream )

    }catch(e){

        console.error(errorMessage)
    
    }

}


export default actionArchive
// await actionArchive('compress', 'S:\\NODE2023\\РЕШЕНИЕ4\\src\\', "S:\\NODE2023\\РЕШЕНИЕ4\\src\\20211203_175810.jpg","S:\\NODE2023\\РЕШЕНИЕ4\\src\\")
// await actionArchive('decompress', 'S:\\NODE2023\\РЕШЕНИЕ4\\src\\', "S:\\NODE2023\\РЕШЕНИЕ4\\src\\20211203_175810.jpg.br","S:\\NODE2023\\РЕШЕНИЕ4\\src\\175810.jpg")