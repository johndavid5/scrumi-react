/* Let's create a store factory, boys and girls... */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors, linksQa } from './reducers'

/* I thunk we'd use thunks to help us with asynchronous actions... 
*
* These action creators, called thunks, will allow us to wait
* for a server response before dispatching an action locally.
* Thunks are higher-order functions.  Instead of action objects,
* they return other functions...
*/
import thunk from 'redux-thunk'

/* For isomorphism, use different loggers on client and server... */
const clientLogger = store => next => action => {
    if (action.type) {
        let result
        console.groupCollapsed("dispatching", action.type)
        console.log('prev state', store.getState())
        console.log('action', action)
        result = next(action)
        console.log('next state', store.getState())
        console.groupEnd()
        return result
    } else {
        return next(action)
    }
}

const serverLogger = store => next => action => {
    console.log('\n  dispatching server action\n')
    console.log(action)
    console.log('\n')
    return next(action)
}

/* Return the Redux middleware that should
* be incorporated to the new store in a single
* array...add any Redux middleware to this
* array, and it will be spread into the
* arguments of the Redux::applyMiddleware
* function...
*
* Note that we get the serverLogger if we're
* running on the server, and the clientLogger
* if we're running on the client...
*/
const middleware = server => [
    (server) ? serverLogger : clientLogger,
    thunk
]

const storeFactory = (server = false, initialState = {}) =>
    applyMiddleware(...middleware(server))(createStore)(
        combineReducers({colors, linksQa}),
        initialState
    )

export default storeFactory
