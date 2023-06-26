import { join as pathJoin, isAbsolute as pathIsAbsolute } from 'path'
import { access as fsAcces } from 'fs/promises';
const discArray = ["A:", "B:", "C:", "D:", "E:", "F:", "G:", "H:", "I:", "J:", "K:", "L:", "M:", "N:", "O:", "P:", "Q:", "R:", "S:", "T:", "U:", "V:", "W:", "X:", "Y:", "Z:"]

async function navigationCd(currentPath, argPath) {

    try {

        argPath = discArray.includes(String(argPath).toUpperCase()) ? (argPath+"\\") : argPath

        let newPath = pathIsAbsolute(argPath) ? pathJoin(argPath) : pathJoin(currentPath, argPath)
        await fsAcces(newPath)
        return newPath

    } catch (e) {

        console.error('Operation failed')
        return await currentPath

    }
}

export default navigationCd