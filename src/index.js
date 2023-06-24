import { EOL, homedir } from "os";



const checkUsersName = "--username="
const unknownUsersName = "noname"

let username = process.argv.slice(2).find( arg => arg.includes(checkUsersName));

if (username && username.length > checkUsersName.length) {

    process.env.username = username.split(checkUsersName)[1]

} else {

    process.env.username = unknownUsersName

}


let sayHelloMessage = `Welcome to the File Manager, ${process.env.username}!`
console.log(sayHelloMessage)

process.chdir(homedir())

let sayCurrentDir = `You are currently in ${process.cwd()} :`
console.log(sayCurrentDir)