import { Router } from 'express'
import C from '../constants'
// import { v4 } from 'uuid' // create uuid's on the fly
import { Objectives } from './models/objectives'
// const logatim = require('logatim')
const utils = require('../lib/utils')

/* Our Express Router... */
const router = Router()

/* Every action created is handled the same way:
* it is dispatched on the server and then it
* is sent to the client.
*
* (1) Dispatch the action to the `serverStore`
*
*     NOTE: This only occurs if you supply options: dispatchToStore=true
*     ...because it's oft-times senseless to just write
*     the entire state to the server-side store every time
*     you respond to a request.
*
* (2) Send the action to the client via the response object.
*/
const dispatchAndRespond = (req, res, action, options = {}) => {
    if (options.dispatchToStore) {
        req.store.dispatch(action)
    }
    res.status(200).json(action)
}

/* HTTP Endpoints via the Express (domain-specific language) `Router`...  */
router.get('/objectives', (req, res) => {
    const timestamp = new Date().toString()

    const sWho = 'objectives-api::get("/objectives")'

    // console.log(`${sWho}(): req = `, utils.customStringify(req) )
    console.log(`${sWho}(): req.query = `, utils.customStringify(req.query))

    const filters = {}

    // if( req.body.basePath ){
    //     filter.basePath = req.body.basePath
    // }
    // if( req.body.additionOnlyCode ){
    //     filter.additionOnlyCode = req.body.additionOnlyCode
    // }

    const objectivesModel = new Objectives()
    console.log(`${sWho}(): Callin' objectivesModel.getObjectives( filters = `, filters, '...)')

    objectivesModel.getObjectives(filters)
        .then((objectives) => {
            console.log(`${sWho}().then: objectives = `, objectives)

            const dispatchee = {
                type: C.OBJECTIVES_GET,
                filters,
                timestamp,
                objectives,
                error: '',
            }

            console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee)

            dispatchAndRespond(req, res, dispatchee)
        })
        .catch((error) => {
            console.log(`${sWho}(): Caught error = `, error)

            const dispatchee = {
                type: C.OBJECTIVES_GET,
                filters,
                timestamp,
                objectives: [],
                error,
            }

            console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee)

            dispatchAndRespond(req, res, dispatchee)
        })
}, /* get() */

)/* router.post(/run_links_qa,...) */


export default router
