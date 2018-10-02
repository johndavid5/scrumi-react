/* Kill two birds with one stone: Test store and action creators together... */
import C from '../src/constants'
import storeFactory from '../src/store/index'
import { objectivesFilter, objectivesIsFetching } from '../src/actions'

import { faux_objectives } from '../data/fauxObjectives'

import { config } from '../src/config'
import { logajohn } from '../src/lib/logajohn'

import { errorStringify } from '../src/lib/utils'

import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch') // Need to mock isomorphic-fetch for objectivesFilter() action creator...

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`__tests__/actions.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe("Action Creators", () => {

    let store
    let faux_action

    describe("objectivesFilter() thunk-based action creator...", () => {

        beforeAll(() => {

            let sWho = "__tests__/actions.js: objectivesFilter(): beforeAll"
            logajohn.debug(`${sWho}(): SHEMP: Moe, storeFactory = `, storeFactory )
            let bServer = true
            store = storeFactory(bServer,{"objectives": {"name":"Moe"}})
            logajohn.debug(`${sWho}(): SHEMP: Moe, after constructin' store, store.getState() = `, store.getState() )
            logajohn.debug(`${sWho}(): SHEMP: Moe, after constructin' store, typeof store.dispatch = `, (typeof store.dispatch) )

            fetch.resetMocks()

            faux_action = {"type":"OBJECTIVES_GET",
                "filters":{"description_filter": "glassware"},
                "timestamp":"Thu Sep 20 2018 19:25:00 GMT-0400 (Eastern Daylight Time)",
                "objectives": faux_objectives,
                "error":""}

            logajohn.debug(`${sWho}(): SHEMP: Moe, faux_action = `, faux_action )

            // Set the response that we desire when isomorphic fetch is called within the actions.js file...
            fetch.mockResponse(JSON.stringify(faux_action))
            

            let le_filters = {}
            logajohn.debug(`${sWho}(): SHEMP: Moe, dispatchin' objectivesFilter()...here goes nuttin'...!`)
            //store.dispatch(objectivesFilter(le_filters))
            //objectivesFilter(store.dispatch, le_filters);
            //store.dispatch(objectivesFilter(le_filters)) // Same way it's called in containers.js::onObjectivesFilter()...
            let objectivesGefilter = objectivesFilter(le_filters)
            objectivesGefilter(store.dispatch)
            logajohn.debug(`${sWho}(): SHEMP: Moe, after dispatchin' objectivesFilter(), store.getState() = `, store.getState() )
        })

        // I don't think we're storing locally anymore...  
        //afterAll(() => global.localStorage['redux-store'] = false)

        it("should have objectives", () =>{
            let sWho = "__tests__/actions.js: objectivesFilter(): should have objectives"
            logajohn.debug(`${sWho}(): SHEMP: Moe, store.getState() = `, store.getState() )
            expect(store.getState().objectives.objectives_list.length).toBe(faux_objectives.length)
            expect(store.getState().objectives.objectives_list).toEqual(faux_objectives)
        })

        it("should have timestamp", () => {
            let sWho = "__tests__/actions.js: objectivesFilter(): should have timestamp"
            logajohn.debug(`${sWho}(): SHEMP: Moe, store.getState() = `, store.getState() )
            expect(store.getState().objectives.objectives_timestamp).toBeDefined()
        })

//        it("should have called fetch() with filter elements urlencoded into the url...", () => {
//            let sWho = "__tests__/actions.js: objectivesFilter(): should have called fetch() with filter elements urlencoded into the url..."
//            logajohn.debug(`${sWho}(): SHEMP: fetch.mock.calls = `, fetch.mock.calls )
//            //expect(fetch.toHaveBeenCalledWith("description_filter=glassware")
//            const url_expect = /description_filter=glassware/;
//            logajohn.debug(`${sWho}(): SHEMP: fetch.mock.calls[0][] = `, fetch.mock.calls[0][0] )
//            expect(fetch.mock.calls[0][0]).toEqual(expect.stringMatching(url_expect))
//        })

    })/* describe("objectivesFilter() thunk-based action creator..." */


    describe("objectivesIsFetching()...client-based action...(even though it uses immediately dispatched thunks...)", () => {

        beforeAll(() => {
            let sWho = "__tests__/actions.js: objectivesIsFetching():beforeAll"
            logajohn.debug(`${sWho}(): SHEMP: Moe, storeFactory = `, storeFactory )
            let bServer = true
            store = storeFactory(bServer,{"objectives": {"name":"Shemp"}})
            logajohn.debug(`${sWho}(): SHEMP: Moe, store.getState() = `, store.getState() )
        })

        it("can dispatch OBJECTIVES_FETCHING true", () => {
            let sWho = "__tests__/actions.js: can dispatch OBJECTIVES_FETCHING true"
            //store.dispatch(objectivesIsFetching(true)) // Naughty, naughty, not for thunks...they get dispatched later...
            objectivesIsFetching(store.dispatch, true) // Call it the same way it's called in ./src/actions.js/objectivesFilter()...
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


