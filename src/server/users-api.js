import { Router } from 'express'
import C from '../constants'
import { Users } from './models/users'

import utils from '../lib/utils'

import { config } from '../config'
import { logajohn } from '../lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`users-api.js: config.DEBUG_LEVEL = `, config.DEBUG_LEVEL )
logajohn.info(`users-api.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

/* Our Express Router... */
const router = new Router()

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
* 
*/
const dispatchAndRespond = (req, res, action, options = {}) => {

    const sWho = "users-api::dispatchAndRespond";

    if (options.dispatchToStore) {
        req.store.dispatch(action)
    }

    //logajohn.info(`${sWho}(): Calling res.status(200).json(action)...`)
    //res.status(200).json(action) -- refactor into 2 calls so express mock doesn't trip over chained calls...
    
    if( res ){
        logajohn.info(`${sWho}(): Calling res.status(200)...`)
        res.status(200)
    }
    else {
        logajohn.info(`${sWho}(): Not calling res.status(200)...`)
    }

    if( res ){
        logajohn.info(`${sWho}(): Calling res.json(action), action = `, action )
        res.json(action)
    }
    else {
        logajohn.info(`${sWho}(): Not calling res.json(action)...`)
    }

}

// NOTE: Added options = {callback: x, filters: x} for unit testing...
export const doGet = (req, res, options) => {

    const timestamp = new Date().toString()

    const sWho = 'users-api::doGet("/users")'

    logajohn.info(`${sWho}()...`)

    logajohn.info(`${sWho}(): req = `, utils.customStringify(req))
    logajohn.info(`${sWho}(): res = `, utils.customStringify(res))

    let filters = {}

    if( req ){
        if( req.hasOwnProperty('query') ){
            logajohn.info(`${sWho}(): req.query = `, utils.customStringify(req.query))
            logajohn.info(`${sWho}(): Setting filters equal to req.query...`)
            filters = {...req.query}
        }
        else{
            logajohn.info(`${sWho}(): Sorry, req.query property don't exist, Moe...`)
        }
    }

    // Only if we needed to pass filters via options param...for testing...normally they should go in via req.query...
    if (options && options.hasOwnProperty('filters') ){
        logajohn.info(`${sWho}(): Setting filters equal to options.filters...`)
        filters = {...options.filters}
    }

    let callback = null
    if (options && options.hasOwnProperty('callback') ){
        callback = options.callback
    }

    const usersModel = new Users()
    logajohn.info(`${sWho}(): Callin' usersModel.getUsers( filters = `, filters, '...)')

    //Promise.resolve("OK") 
    usersModel.getUsers(filters)
        .then((users) => {
            logajohn.info(`${sWho}().then: users = `, users)

            const dispatchee = {
                type: C.USERS_GET,
                filters,
                timestamp,
                users,
                error: '',
            }

            logajohn.info(`${sWho}(): SHEMP: Callin' dispatchAndRespond() widh...`, dispatchee)

            dispatchAndRespond(req, res, dispatchee)

            if( callback ){
                callback();
            }
        })
        .catch((error) => {
            logajohn.info(`${sWho}(): Caught error = `, utils.errorStringify(error))

            const dispatchee = {
                type: C.USERS_GET,
                filters,
                timestamp,
                users: [],
                error,
            }

            logajohn.info(`${sWho}(): SHEMP: Callin' dispatchAndRespond() widh...`, dispatchee)

            dispatchAndRespond(req, res, dispatchee)

            if( callback ){
                callback();
            }
        })

} /* doGet() */

/* HTTP Endpoints via the Express (domain-specific language) `Router`...  */
router.get('/users', doGet );


export default router
