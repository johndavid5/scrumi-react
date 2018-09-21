import { Router } from 'express'
import { v4 } from 'uuid'
import { LinksQa } from './models/links-qa'
import C from '../constants'

//const logatim = require('logatim')
import { config } from '../config'
import { logajohn } from '../lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`./src/server/links-qa-api.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

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

/* HTTP Endpoints via the Express (domain-specific language)
* `Router`...
*/

/* Shouldn't this be a GET...? */
router.post('/run_links_qa', (req, res) => {
    const timestamp_begin_run = new Date().toString()

    const sWho = 'links-qa-api::post("/run_links_qa")'

    logajohn.debug(`${sWho}(): timestamp_begin_run=${timestamp_begin_run}...`)
    //logatim.setLevel('info')
    //logatim.green.info(`${sWho}(): timestamp_begin_run=${timestamp_begin_run}...`)
    logajohn.debug(`${sWho}(): req.body = `, req.body)

    const filter = {}
    if (req.body.basePath) {
        filter.basePath = req.body.basePath
    }
    if (req.body.additionOnlyCode) {
        filter.additionOnlyCode = req.body.additionOnlyCode
    }

    function doIt(data, error) {
        const sWho = 'doIt'

        const timestamp_end_run = new Date().toString()

        console.log(`${sWho}(): timestamp_end_run=${timestamp_end_run}...`)

        console.log(`${sWho}(): data = `, data)

        console.log(`${sWho}(): error = `, error)

        const dispatchee = {
            type: C.LINKS_QA_RUN,
            basePath: req.body.basePath,
            additionOnlyCode: req.body.additionOnlyCode,
            linksQa: {
                error,
                output: data,
                message: 'Let off some steam, Bennett!',
            },
            timestamp_begin_run,
            timestamp_end_run,
            timestamp: timestamp_end_run,
        }

        console.log(`${sWho}(): SHEMP: dispatchin' dhis, Moe: `, dispatchee)

        dispatchAndRespond(req, res, dispatchee)
    }


    LinksQa.getLinksQa(filter, doIt)

    // setTimeout( doIt, 5000 );
})/* router.post(/run_links_qa,...) */


export default router
