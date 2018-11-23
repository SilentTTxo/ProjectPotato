let remote = window.nodeRequire('electron').remote
let globalData = remote.getGlobal('data');
let cli = window.nodeRequire('../services/cli.js')
let modelData = {
    phoneList: [],
    shell:"",
}

function btnInit(){
    $("#app").delegate("#init","click",function(){
        cli.adbExec("-s ")
    })
}

function getPreShell(e){
    let self = $(e.target)
    let did = self.attr("deviceid")
    let preShell = `-s ${did} `
    return preShell
}

$(function init(){
    
    let vm = new Vue({
        el: '#app',
        data: modelData,
        methods: {
            init: function(e){
                let preShell = getPreShell(e)
                cli.adbExecSync(preShell + `push bin/linuxdeploy /sdcard/linuxdeploy`,modelData)
                cli.adbExec(preShell + "shell < bin/option_init.sh",modelData)
            },
            install: function(e){
                let preShell = getPreShell(e)
                cli.adbExec(`${preShell} shell < bin/option_install.sh`,modelData)
            },
            clear: function(e){
                let preShell = getPreShell(e)
                cli.adbExec(`${preShell} shell < bin/option_clear.sh`,modelData)
            },
            telnet: function(e){
                let preShell = getPreShell(e)
                cli.adbExec(`${preShell} shell < bin/option_telnet.sh`,modelData)
            }
        }
    })
    devicesRefresh()
    setInterval(devicesRefresh,3000)

})
function devicesRefresh(){
    let out = cli.getPhoneList()
    modelData.phoneList = out
}