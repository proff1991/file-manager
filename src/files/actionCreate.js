import { createWriteStream as fsCreateWriteStream } from 'fs'
import { readdir as fsReaddir } from 'fs/promises'
import { join as pathJoin, isAbsolute as pathIsAbsolute , dirname as pathDirname, parse as pathParse } from 'path'
const errorMessage = 'Operation failed'

async function checkDir(dirPath){

    try{

    let list = await fsReaddir(pathJoin(pathDirname(dirPath)), { withFileTypes: true })

        if(list){
            
            try{
               
              let checkFullPath = await fsReaddir(pathJoin(dirPath), { withFileTypes: true })

              return false

            }catch{

                return true

            }

        }else{
            return false
        }

    }catch{
        return false
    }

}



const actionCreate = async (__dirname, file) => {

    try {

        let filePath = pathIsAbsolute(file) ? pathJoin(file) : pathJoin(__dirname, file)

        if(await checkDir(filePath)){

            try{

                const stream =  fsCreateWriteStream(filePath)
                stream.end()

            }catch{

                console.error(errorMessage)

            }

        }else{
            console.error(errorMessage)
        }


    }catch{
        console.error(errorMessage)
    }
}

export default actionCreate

