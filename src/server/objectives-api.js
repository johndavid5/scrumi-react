import { Router } from 'express'
import C from '../constants'
// import { v4 } from 'uuid' // create uuid's on the fly
import { Objectives } from './models/objectives'

const utils = require('../lib/utils')

import { config } from '../config'
import { logajohn } from '../lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`objectives-api.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

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

export const doGet = (req, res) => {
    const timestamp = new Date().toString()

    const sWho = 'objectives-api::doGet("/objectives")'

    console.log(`${sWho}()...`)

    console.log(`${sWho}(): req = `, utils.customStringify(req))

    if( req ){
        if( req.hasOwnProperty(query) ){
            console.log(`${sWho}(): req.query = `, utils.customStringify(req.query))
        }
        else{
            console.log(`${sWho}(): req.query -> property don't exist, Moe...`)
        }
    }

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

            console.log(`${sWho}(): SHEMP: Callin' dispatchAndRespond() widh...`, dispatchee)

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

            console.log(`${sWho}(): SHEMP: Callin' dispatchAndRespond() widh...`, dispatchee)

            dispatchAndRespond(req, res, dispatchee)
        })

} /* doGet() */

/* HTTP Endpoints via the Express (domain-specific language) `Router`...  */
router.get('/objectives', doGet );


export default router
