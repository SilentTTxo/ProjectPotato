let process = require("child_process")
let iconv = require('iconv-lite');
const ADB_PATH = "adb"
let env = Object.assign({});
env.PATH = "./bin/adb/"
let BASE_BIN_ADDR = "/data/data/com.silenttt.potato/bin"

class Phone{
    constructor(id,state){
        this.id = id
        this.state = state
    }
}

let execSync = function(cmd,modelData){
    var encoding = 'cp936';
    var binaryEncoding = 'binary';

    rs = process.execSync(cmd,{
        env:env
    })
    rs = iconv.decode(new Buffer(rs,binaryEncoding), encoding)
    if(modelData){
        modelData.shell += `>>> ${cmd}\n`
        modelData.shell += rs
    }

    console.log(`shell: ${cmd} result: ${rs}`)
    return rs
}

let exec = function(cmd,modelData){
    var encoding = 'cp936';
    var binaryEncoding = 'binary';

    shellProcess = process.exec(cmd,{
        env:env
    })
    
    rs = iconv.decode(new Buffer(rs,binaryEncoding), encoding)
    if(modelData){
        modelData.shell += `>>> ${cmd}\n`
        shellProcess.stdout.on('data', function(data){
            modelData.shell += data
        })
        shellProcess.stderr.on('data', function(data){
            modelData.shell += `ERR !!! ${data}`
        })
    }

    console.log(`shell: ${cmd} result: ${rs}`)
    return rs
}

let adbExecSync = function(arg,modelData){
    rs = execSync(`adb ${arg}`,modelData)
    return rs
}

let adbExec = function(arg,modelData){
    rs = exec(`adb ${arg}`,modelData)
    return rs
}

exports.execSync = execSync
exports.adbExecSync = adbExecSync
exports.exec = exec
exports.adbExec = adbExec
exports.BASE_BIN_ADDR = BASE_BIN_ADDR

exports.getPhoneList = function(){
    let rs,out = []
    rs = adbExecSync("devices")
    for(let line of rs.trim().split("\n")){
        paramList = line.split("\t")
        if(paramList.length != 2){
            continue
        }

        out.push(new Phone(paramList[0],paramList[1]))
        // console.log(line)
    }
    return out
}