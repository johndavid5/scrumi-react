/* Kill two birds with one stone: Test store and action creators together... */
import C from '../src/constants'
import storeFactory from '../src/store/index'
import { objectivesFilter, objectivesIsFetching } from '../src/actions'

import { faux_objectives } from '../data/fauxObjectives'

import { config } from '../src/config'
import { logajohn } from '../src/lib/logajohn'
import { errorStringify } from '../src/lib/utils'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`__tests__/actions.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe("Action Creators", () => {

    let store

//    describe("objectivesFilter() thunk-based action creator...", () => {
//
//        const sampleObjectives = faux_objectives 
//
//        beforeAll(() => {
//            store = storeFactory({sampleObjectives})
//            store.dispatch(objectivesFilter({}))
//        })
//
//        // I don't think we're storing locally anymore...  
//        //afterAll(() => global.localStorage['redux-store'] = false)
//
//        it("should have objectives", () =>{
//            expect(store.getState().objectives_list.length).toBe(3)
//            expect(store.getState().objectives_list).toEqual(sampleObjectives)
//        })
//
//        it("should have timestamp", () =>
//            expect(store.getState().timestamp).toBeDefined())
//
//    })/* describe("objectivesFilter() thunk-based action creator..." */


    describe("objectivesIsFetching()...client-based action...(even though it uses immediately dispatched thunks...)", () => {

        beforeAll(() => {
            let sWho = "__tests__/actions.js: objectivesIsFetching():beforeAll"
            logajohn.debug(`${sWho}(): SHEMP: Moe, storeFactory = `, storeFactory )
            let bServer = true
            store = storeFactory(bServer,{"objectives": {"name":"Shemp"}})
            logajohn.debug(`${sWho}(): SHEMP: Moe, store = `, store )
            logajohn.debug(`${sWho}(): SHEMP: Moe, store.getState() = `, store.getState() )
            //logajohn.debug(`${sWho}(): SHEMP: Moe, store.dispatch = `, store.dispatch )
        })

        it("can dispatch OBJECTIVES_FETCHING true", () => {
            let sWho = "__tests__/actions.js: can dispatch OBJECTIVES_FETCHING true"
            //store.dispatch(objectivesIsFetching(true)) // Naughty, naughty, not for thunks...they get dispatched later...
            objectivesIsFetching(store.dispatch, true)
            logajohn.debug(`${sWho}(): SHEMP: Moe, store.getState() = `, store.getState() )
            expect(store.getState().objectives.objectives_fetching).toEqual(true)
        })

        it("can dispatch OBJECTIVES_FETCHING false", () => {
            let sWho = "__tests__/actions.js: can dispatch OBJECTIVES_FETCHING false"
            objectivesIsFetching(store.dispatch, false)
            logajohn.debug(`${sWho}(): SHEMP: Moe, store.getState() = `, store.getState() )
            expect(store.getState().objectives.objectives_fetching).toEqual(false)
        })

    })


})
