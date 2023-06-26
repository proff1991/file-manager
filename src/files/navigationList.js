import { readdir as fsReaddir } from 'fs/promises'
import { join as pathJoin } from 'path'
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

    try{

        if(fileObject.isFile()){
            return typeFileName
        }else if(fileObject.isDirectory()){
            return typeFolderName
        }else{
            return typeOtherName
        }

    }catch{

        return typeOtherName

    }

}


async function navigationList(fullpath) {

    try{

        const bufferArray = []


        let list = await fsReaddir(pathJoin(fullpath), { withFileTypes: true })
    
        for( let i = 0 ; i<list.length ; ++i ){
    
            bufferArray.push(new FilesAndFolders(list[i]['name'], checkType(list[i])))
    
        }
        
        const arrayOfFolders = bufferArray.filter(item => item['Type'] == typeFolderName)
        const arrayOffiles = bufferArray.filter(item => item['Type'] == typeFileName)
        const table = [...arrayOfFolders, ...arrayOffiles]
    
        console.table(table)


    }catch{

        console.error('Operation failed')

    }


}

export default navigationList