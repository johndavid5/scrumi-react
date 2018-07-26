import { Router } from 'express'
import C from '../constants'
import { v4 } from 'uuid'

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
router.get("/colors", (req, res) =>
    // In the real world, we'd get the color from a data-store
    // such as MySQL or PostgreSQL...
    res.status(200).json(req.store.getState().colors)
)

router.post("/colors", (req, res) =>
    dispatchAndRespond(req, res, {
        type: C.ADD_COLOR,
        id: v4(),
        title: req.body.title,
        color: req.body.color,
        timestamp: new Date().toString()
    })
)

router.put("/color/:id", (req, res) =>
    dispatchAndRespond(req, res, {
        type: C.RATE_COLOR,
        id: req.params.id,
        rating: parseInt(req.body.rating)
    })
)

router.delete("/color/:id", (req, res) =>
    dispatchAndRespond(req, res, {
        type: C.REMOVE_COLOR,
        id: req.params.id
    })
)

export default router
