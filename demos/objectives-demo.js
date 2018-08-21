import { Objectives } from '../src/server/models/objectives'
import { logajohn } from '../src/lib/logajohn'

logajohn.setLevel('info')

let sWho = "objectives-demo.js"

logajohn.info(`${sWho}...`)

let dbname = "scrumi"
//let path = process.argv[0] || "g:\\p27174"
for(let i = 0; i < process.argv.length; i++ ){
    logajohn.info(`${sWho}: process.argv[${i}] = "${process.argv[i]}"...`)
    if( process.argv[i] == "-d" ){
        dbname = process.argv[++i]
    }
}

logajohn.info(`${sWho}(): dbname =`, dbname )

function staticCallback(data,error){ 
    let sWho = "ObjectivesModelDemo::staticCallback";
    logajohn.info(`${sWho}(): SHEMP: Moe, data = `, JSON.stringify(data, null, ' ') )
    logajohn.info(`${sWho}(): SHEMP: Moe, error = `, error )
}

sWho = "ObjectivesModelDemo::static";
let filter = {}
let objectivesModel = new Objectives(dbname);
logajohn.info(`${sWho}(): SHEMP: Moe, callin' objectivesModel.getObjectives( filter = `, filter )

objectivesModel.getObjectives( filter )
.then( (objectives) => {
    logajohn.info(`${sWho}(): SHEMP: Moe, got objectives = `, objectives );
})
.catch( (error) => {
    logajohn.info(`${sWho}(): SHEMP: Moe, got error = `, error );
})

