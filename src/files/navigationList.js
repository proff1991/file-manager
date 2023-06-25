import { readdir as fsReaddir } from 'fs/promises'
import { join as pathJoin, resolve } from "path"
const typeFileName = 'file'
const typeFolderName = 'directory'
const typeOtherName = 'unknown'

class FilesAndFolders {
    constructor(Name, Type) {
        this.Name = Name
        this.Type = Type
    }
}


function checkType(fileObject){

    const errorMessage = 'unknown'

    try{

        if(fileObject.isFile()){
            return typeFileName
        }else if(fileObject.isDirectory()){
            return typeFolderName
        }else{
            return typeOtherName
        }

    }catch{

        return errorMessage

    }

}


async function navigationList(fullpath) {

    const bufferArray = []


    let list = await fsReaddir(pathJoin(fullpath), { withFileTypes: true })

    console.log(list)

    for( let i = 0 ; i<list.length ; ++i ){

        bufferArray.push(new FilesAndFolders(list[i]['name'], checkType(list[i])))

    }
    
    const arrayOfFolders = bufferArray.filter(item => item['Type'] == typeFolderName)
    const arrayOffiles = bufferArray.filter(item => item['Type'] == typeFileName)
    const table = [...arrayOfFolders, ...arrayOffiles]

    console.table(table)

    
}

export default navigationList