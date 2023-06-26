import { EOL, cpus, homedir, userInfo, arch } from 'os'

export function __eol(){
    console.log(JSON.stringify(EOL))
}
  
export function __cpus() {

    const cpusArray = cpus()
    console.log(`Overall amount of cpus: ${cpusArray.length}`)
    for (const core of cpusArray) {
        console.log(`model: ${core.model}, clock rate: ${(core.speed*0.001).toFixed(2)}GHz`)
    }

}

export function __homedir(){
    console.log(homedir())
}

export function __username(){
    console.log(userInfo().username)
}

export function __architecture(){
    console.log(arch())
}