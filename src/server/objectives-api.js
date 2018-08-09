//import { LinksQa } from './models/links-qa'
import { Router } from 'express'
import C from '../constants'
import { v4 } from 'uuid'
const logatim = require('logatim')
const utils = require('../lib/utils')

/* Our Express Router... */
const router = Router() 

/* Every action created is handled the same way:
* it is dispatched on the server and then it
* is sent to the client.
*
* (1) Dispatch the action to the `serverStore`
* (2) Send the action to the client via the response object.
*/
const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action)
    res.status(200).json(action)
}

/* HTTP Endpoints via the Express (domain-specific language) `Router`...  */
router.get("/objectives", (req, res) => {

    let timestamp=new Date().toString()

    let sWho = "objectives-api::get(\"/objectives\")"

    //console.log(`${sWho}(): req = `, utils.customStringify(req) )
    console.log(`${sWho}(): req.query = `, utils.customStringify(req.query) )

    let filters = {}
//    if( req.body.basePath ){
//        filter.basePath = req.body.basePath
//    }
//    if( req.body.additionOnlyCode ){
//        filter.additionOnlyCode = req.body.additionOnlyCode
//    }

    function doIt(data, error){
         let sWho = "doIt"

         console.log(`${sWho}(): data = `, data )

         console.log(`${sWho}(): error = `, error )

         let dispatchee = {
            type: C.OBJECTIVES_GET,
            filters: filters,
            timestamp: timestamp,
            objectives: data
         }

         console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee )

         dispatchAndRespond(req, res, dispatchee )
    }


    //LinksQa.getLinksQa(filter, doIt);
    setTimeout( function(){ doIt([{who: "joe", what: "i don't know", when: "whenever"}], null ) }, 1000 );

    }/* get() */

)/* router.post(/run_links_qa,...) */


export default router
