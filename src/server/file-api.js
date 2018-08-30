import { FileModel } from './models/file'
import { Router } from 'express'

// NOTE: This API doesn't dispatch and send Redux actions...
// ...just plain old JSON...
//import C from '../constants'
//import { v4 } from 'uuid'

import { logajohn } from '../lib/logajohn'
//import { config } from '../../config'
import { config } from '../config'

/* Our Express Router... */
const router = Router() 

/* HTTP Endpoints via the Express (domain-specific language) `Router`... */
router.get("/dir", (req, res) => {

    let timestamp_begin_run=new Date().toString()

    let sWho = "file-api::get(\"/dir\")"

    console.log(`${sWho}(): timestamp_begin_run=${timestamp_begin_run}...`) 
    logajohn.setLevel('info')
    logajohn.info(`${sWho}(): Calling logajohn.setLevel(config.DEBUG_LEVEL='${config.DEBUG_LEVEL}')...`)
    logajohn.setLevel(config.DEBUG_LEVEL)

    logajohn.trace(`${sWho}(): req = `, req )
    logajohn.info(`${sWho}(): req.query = `, req.query )

    let filter = {}

    if( req.query.path ){
        filter.path = req.query.path
    }
    else{
        filter.path = ""; // Hopefully makes for a less obnoxious error...
    }

    logajohn.info(`${sWho}(): filter = `, filter )

    const doIt = (data, error) => {

         let sWho = "file-api.get.doIt"

         let timestamp_end_run = new Date().toString()

         console.log(`${sWho}(): timestamp_end_run=${timestamp_end_run}...`) 

         console.log(`${sWho}(): error = `, error )

         console.log(`${sWho}(): Sending to client: data = `, data )

         res.status(200).json(data)

    }/* doIt() */

    logajohn.info(`${sWho}(): SHEMP: Moe, callin' FileModel.getDir( `, filter, `, staticCallback )...`)
    FileModel.getDir( filter, doIt );

})/* router.get(/dir,...) */


export default router
