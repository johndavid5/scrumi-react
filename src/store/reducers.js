import C from '../constants'
import { logajohn } from '../lib/logajohn' 

export const color = (state = {}, action={ type: null }) => {
    switch (action.type) {
        case C.ADD_COLOR:
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                timestamp: action.timestamp,
                rating: 0
            }
        case C.RATE_COLOR:
            return (state.id !== action.id) ? state :
            {
                ...state,
                rating: action.rating
            }
        default :
            return state
    }
}

export const colors = (state = [], action={ type: null }) => {
    switch (action.type) {
        case C.ADD_COLOR :
            return [
                ...state,
                color({}, action)
            ]
        case C.RATE_COLOR :
            return state.map(
                c => color(c, action)
            )
        case C.REMOVE_COLOR :
            return state.filter(
                c => c.id !== action.id
            )
        default:
            return state
    }
}

export const linksQa = (state = {}, action={ type: null }) => {

    let sWho = "reducers::linksQa";

    logajohn.debug(`${sWho}(): state = `, state )
    logajohn.debug(`${sWho}(): action = `, action )

    logajohn.debug(`${sWho}(): action.basePath = `, action.basePath )
    logajohn.debug(`${sWho}(): action.additionOnlyCode = `, action.additionOnlyCode)
    logajohn.debug(`${sWho}(): action.timestamp = `, action.timestamp)
    logajohn.debug(`${sWho}(): action.linksQa = `, action.linksQa)

    let returno

    switch (action.type) {

        case C.LINKS_QA_RUN:

            returno = {
                ...state,
                basePath: action.basePath,
                additionOnlyCode: action.additionOnlyCode,
                timestamp: action.timestamp,
                timestamp_begin_run: action.timestamp_begin_run,
                timestamp_end_run: action.timestamp_end_run,
                linksQa: action.linksQa,
            }

            //returno.basePath = action.basePath
            //returno.additionOnlyCode = action.additionOnlyCode
            //returno.timestamp = action.timestamp
            //returno.linksQa = action.linksQa

            logajohn.debug(`${sWho}(): SHEMP: Moe, Retoynin' `, JSON.stringify(returno,null,' ') )

            return returno

            //return [
            //    basePath: action.basePath,
            //    additionOnlyCode: action.additionOnlyCode,
            //    timestamp: action.timestamp,
            //    linksQa: action.linksQa,
            //    ...state,
            //]
        default:
            returno = {...state}
            logajohn.debug(`${sWho}(): SHEMP: Moe, Retoynin' `, JSON.stringify(returno,null,' ') )
            return returno
            //return state
    }
}


export const objectives = (state = {}, action={ type: null }) => {

    let sWho = "reducers::objectives";

    logajohn.debug(`${sWho}(): state = `, state )
    logajohn.debug(`${sWho}(): action = `, action )

    let returno

    switch (action.type) {

        case C.OBJECTIVES_GET:

            returno = {
                ...state,
                objectives: action.objectives
            }

            logajohn.debug(`${sWho}(): SHEMP: Moe, Retoynin' `, JSON.stringify(returno,null,' ') )

            return returno

        default:
            // Just return a copy of state...
            returno = {...state}
            logajohn.debug(`${sWho}(): SHEMP: Moe, Retoynin' `, JSON.stringify(returno,null,' ') )
            return returno
    }
}
