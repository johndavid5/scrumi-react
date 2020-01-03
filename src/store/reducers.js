import C from '../constants'
import { logajohn } from '../lib/logajohn'

/*
* Remember, Luke, never modify the state...
* Return a copy of the new state.
*/
export const objectives = (state = {}, action = { type: null }) => {

    const sWho = 'reducers::objectives'

    logajohn.debug(`${sWho}(): state = `, state)
    logajohn.debug(`${sWho}(): action = `, action)

    let returno

    switch (action.type) {
        case C.OBJECTIVES_GET:

            returno = {
                ...state,
                objectives_filters: action.filters,
                objectives_list: action.objectives,
                objectives_timestamp: action.timestamp,
                objectives_error: action.error,
            }

            logajohn.debug(`${sWho}(): SHEMP: case C.OBJECTIVES_GET: Moe, Retoynin' `, JSON.stringify(returno, null, ' '))

            return returno

        case C.OBJECTIVES_FETCHING:

            returno = {
                ...state,
                objectives_fetching: action.objectives_is_fetching,
            }

            logajohn.debug(`${sWho}(): SHEMP: case C.OBJECTIVES_FETCHING: Moe, Retoynin' `, JSON.stringify(returno, null, ' '))

            return returno

        default:
            // Just return a copy of state...
            returno = { ...state }
            logajohn.debug(`${sWho}(): SHEMP: default: Moe, Retoynin' simple copy of state: `, JSON.stringify(returno, null, ' '))
            return returno
    }
}


export const users = (state = {}, action = { type: null }) => {

    const sWho = 'reducers::users'

    logajohn.debug(`${sWho}(): state = `, state)
    logajohn.debug(`${sWho}(): action = `, action)

    let returno

    switch (action.type) {
        case C.USERS_GET:

            returno = {
                ...state,
                users_filters: action.filters,
                users_list: action.users,
                users_timestamp: action.timestamp,
                users_error: action.error,
            }

            logajohn.debug(`${sWho}(): SHEMP: case C.USERS_GET: Moe, Retoynin' `, JSON.stringify(returno, null, ' '))

            return returno

        case C.USERS_FETCHING:

            returno = {
                ...state,
                users_fetching: action.users_is_fetching,
            }

            logajohn.debug(`${sWho}(): SHEMP: case C.USERS_FETCHING: Moe, Retoynin' `, JSON.stringify(returno, null, ' '))

            return returno

        default:
            // Just return a verbatim copy of dha state...
            returno = { ...state }
            logajohn.debug(`${sWho}(): SHEMP: default case Moe, Retoynin' a simple copy of dha state: `, JSON.stringify(returno, null, ' '))
            return returno
    }
}



