import { join as pathJoin, parse as pathParse} from 'path'

function navigationUp(__dirname) {
    return __dirname == pathParse(__dirname).root ? __dirname : pathJoin(__dirname, '../');
}

export default navigationUp