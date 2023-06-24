import { EOL, homedir } from 'os'
import { EventEmitter } from 'node:events'
import { createInterface } from 'readline'

const emitter = new EventEmitter()
const checkUsersName = '--username='
const unknownUsersName = 'noname'

let username = process.argv.slice(2).find( arg => arg.includes(checkUsersName))

if (username && username.length > checkUsersName.length) {

    process.env.username = username.split(checkUsersName)[1]

} else {

    process.env.username = unknownUsersName

}

let sayHelloMessage = `Welcome to the File Manager, ${process.env.username}!`
console.log(sayHelloMessage)

process.chdir(homedir())

let sayCurrentDir = `You are currently in ${process.cwd()}`
console.log(sayCurrentDir)

const rl = createInterface({input: process.stdin, output: process.stdout})

let sayBuyMessage = `Thank you for using File Manager, ${process.env.username}, goodbye!`

function sayBuy(){
    console.log(sayBuyMessage)
}

rl.on('close', () => {
    sayBuy()
    rl.close()
})

rl.on('SIGINT', () => {
    rl.close()
})

rl.on('line', async (line) => {
   if(line=='.exit'){
    rl.close()
   }
})