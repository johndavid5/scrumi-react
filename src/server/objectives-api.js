import C from '../constants'
//import { v4 } from 'uuid' // create uuid's on the fly
import { Objectives } from './models/objectives'
import { Router } from 'express'
//const logatim = require('logatim')
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

//    function doIt(data, error){
//         let sWho = "doIt"
//
//         console.log(`${sWho}(): data = `, data )
//
//         console.log(`${sWho}(): error = `, error )
//
//         let dispatchee = {
//            type: C.OBJECTIVES_GET,
//            filters: filters,
//            timestamp: timestamp,
//            objectives: data
//         }
//
//         console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee )
//
//         dispatchAndRespond(req, res, dispatchee )
//    }


    //LinksQa.getLinksQa(filter, doIt);
    // setTimeout( function(){ doIt(faux_objectives, null ) }, 1000 );

    console.log(`${sWho}(): Callin' Objectives.getObjectives( filters = `, filters, `...)`)

    Objectives.getObjectives( filters )
    .then( (objectives) => {

         console.log(`${sWho}().then: objectives = `, objectives )

         let dispatchee = {
            type: C.OBJECTIVES_GET,
            filters: filters,
            timestamp: timestamp,
            objectives: objectives,
            error: ""
         }

         console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee )

         dispatchAndRespond(req, res, dispatchee )
     })
     .catch( (error) => {
         console.log(`${sWho}(): Caught error = `, error )

         let dispatchee = {
            type: C.OBJECTIVES_GET,
            filters: filters,
            timestamp: timestamp,
            objectives: [],
            error: error
         }

         console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee )

         dispatchAndRespond(req, res, dispatchee )
     })

//        , (error) => {
//
//         console.log(`${sWho}(): Caught error = `, error )
//
//         let dispatchee = {
//            type: C.OBJECTIVES_GET,
//            filters: filters,
//            timestamp: timestamp,
//            objectives: [],
//            error: error
//         }
//
//         console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee )
//
//         dispatchAndRespond(req, res, dispatchee )
//     }
//     )


    }/* get() */

)/* router.post(/run_links_qa,...) */


export default router
