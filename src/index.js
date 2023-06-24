// for(let elem of process.argv){
//     console.log(elem)
// }
// process.username = "proff"
// console.log(process.username)

const checkUsersName = "--username="
const unknownUsersName = "noname"

let username = process.argv.slice(2).find( arg => arg.includes(checkUsersName));

if (username && username.length > checkUsersName.length) {

    process.env.username = username.split(checkUsersName)[1]

} else {

    process.env.username = unknownUsersName

}


console.log(process.env.username)