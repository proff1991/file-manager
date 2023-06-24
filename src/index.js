import { EOL, homedir } from 'os'
import { EventEmitter } from 'node:events'
import { createInterface } from 'readline'
import navigationUp from './files/navigationUp.js'

let __dirname = homedir()

const emitter = new EventEmitter()
const checkUsersName = '--username='
const unknownUsersName = 'noname'
const unknownOperationMessage = 'Invalid input'
const operationErrorMessage = 'Operation failed'

let username = process.argv.slice(2).find( arg => arg.includes(checkUsersName))

if (username && username.length > checkUsersName.length) {

    process.env.username = username.split(checkUsersName)[1]

} else {

    process.env.username = unknownUsersName

}

let sayHelloMessage = `Welcome to the File Manager, ${process.env.username}!`
console.log(sayHelloMessage)

process.chdir(__dirname)


function sayCurrentlyFolder(path){
    console.log(`You are currently in ${path}`)
}

sayCurrentlyFolder(__dirname)


const rl = createInterface({input: process.stdin, output: process.stdout})

let sayBuyMessage = `Thank you for using File Manager, ${process.env.username}, goodbye!`

function sayBuy(){
    console.log(sayBuyMessage)
}



rl.on('close', () => {
    sayBuy()
    rl.close()
})

// а нужен ли этот пункт?

rl.on('SIGINT', () => {
    rl.close()
})

rl.on('line', async (line) => {

    let [lineCommand, ...lineArguments] = line.includes('"') ? line.split('"').map(elem => String(elem).trim()) : line.split(' ')
    console.log(lineCommand)
    console.log(arrayOfArguments)
    switch(arrayOfArguments[0]){
        case '.exit': {
            rl.close()
            break
        }
        case 'up': {
            __dirname = navigationUp(__dirname)
            sayCurrentlyFolder(__dirname)
            break
        }
        case 'cd': {
            __dirname = navigationUp(__dirname)
            console.log(__dirname)
            break
        }
        default: {
            console.error(unknownOperationMessage)
        }
    }

})