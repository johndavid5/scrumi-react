import { FileModel } from '../src/server/models/file'
import { logajohn } from '../src/lib/logajohn'

logajohn.setLevel('info')

let sWho = "file-model-demo.js"

logajohn.info(`${sWho}...`)

let path = "g:\\p27174"
//let path = process.argv[0] || "g:\\p27174"
for(let i = 0; i < process.argv.length; i++ ){
    logajohn.info(`${sWho}: process.argv[${i}] = "${process.argv[i]}"...`)
    path = process.argv[i]
}

logajohn.info(`${sWho}(): path=`,path)

function staticCallback(data,error){ 
    let sWho = "FileModelDemo::staticCallback";
    logajohn.info(`${sWho}(): SHEMP: Moe, data = `, JSON.stringify(data, null, ' ') )
    logajohn.info(`${sWho}(): SHEMP: Moe, error = `, error )
}

sWho = "FileModelDemo::static";
let filter = {'path': path }
logajohn.info(`${sWho}(): SHEMP: Moe, callin' FileModel.getDir( `, filter, `, staticCallback )...`)
FileModel.getDir( filter, staticCallback );

