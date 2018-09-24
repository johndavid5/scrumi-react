/* Kill two birds with one stone: Test store and action creators together... */
import C from '../src/constants'
import storeFactory from '../src/store/index'
import { objectivesFilter, objectivesIsFetching } from '../src/actions'

import { faux_objectives } from '../data/fauxObjectives'

import { config } from '../src/config'
import { logajohn } from '../src/lib/logajohn'
import { errorStringify } from '../src/lib/utils'

//import { mockFetch, mockFetchSetOutput } from 'isomorphic-fetch'
import fetch from 'isomorphic-fetch'
 
// isomorphic-fetch is getting mocked at global scope...see __tests__/global.js...
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
                "filters":{},
                "timestamp":"Thu Sep 20 2018 19:25:00 GMT-0400 (Eastern Daylight Time)",
                "objectives": faux_objectives,
                "error":""}

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

//         Action Creators › objectivesIsFetching()...client-based action...(even though it uses immediately dispatched thunks...) › can dispatch OBJECTIVES_FETCHING false
//
//        Actions must be plain objects. Use custom middleware for async actions.
//
//      at dispatch (node_modules/redux/lib/createStore.js:165:13)
//      at node_modules/redux-thunk/lib/index.js:14:16
//      at src/store/index.js:35:20
//      at node_modules/logatim/dist/logatim.umd.min.js:1:4736
//      at Array.map (native)
//      at s (node_modules/logatim/dist/logatim.umd.min.js:1:4689)
//      at u (node_modules/logatim/dist/logatim.umd.min.js:1:4982)
//      at a (node_modules/logatim/dist/logatim.umd.min.js:1:4897)
//      at Object.debug (src/lib/logajohn.js:30:225)
//      at objectivesIsFetching (src/actions.js:52:24)
//      at Object.<anonymous> (__tests__/actions.test.js:76:47)

        it("can dispatch OBJECTIVES_FETCHING false", () => {
            let sWho = "__tests__/actions.js: can dispatch OBJECTIVES_FETCHING false"
            objectivesIsFetching(store.dispatch, false)
            logajohn.debug(`${sWho}(): SHEMP: Moe, store.getState() = `, store.getState() )
            expect(store.getState().objectives.objectives_fetching).toEqual(false)
        })

    })


})


//[2018-09-20 19:25:00.597][INFO] objectives-api::dispatchAndRespond(): Calling res.json(action), action = {"type":"OBJECTIVES_GET","filters":{},"timestamp":"Thu Sep 20 2018 19:25:00 GMT-0400 (Eastern Daylight Time)","objectives":[{"task_id":1,"description":"Wash glassware","user_id_assigned_to":1,"first_name":"Joe","middle_name":"S.","last_name":"Kovacs"},{"task_id":2,"description":"Arrange files","user_id_assigned_to":2,"first_name":"Jean","middle_name":"R.","last_name":"Kovacs"},{"task_id":3,"description":"Run Cyanide analysis","user_id_assigned_to":3,"first_name":"John","middle_name":"D.","last_name":"Aynedjian"},{"task_id":4,"description":"Digest Fort Dix Samples","user_id_assigned_to":4,"first_name":"\"Zero\"","middle_name":"","last_name":""},{"task_id":5,"description":"Act Important","user_id_assigned_to":5,"first_name":"Jane","middle_name":"","last_name":"Dennison"},{"task_id":6,"description":"Run Stink & Haas Extraction","user_id_assigned_to":6,"first_name":"Upesh","middle_name":"","last_name":"Vayas"},{"task_id":7,"description":"Do PCM analysis","user_id_assigned_to":7,"first_name":"Rob","middle_name":"","last_name":"Peters"},{"task_id":8,"description":"Do PCM analysis","user_id_assigned_to":8,"first_name":"Sue","middle_name":"","last_name":"Sharples"},{"task_id":9,"description":"Do TEM analysis","user_id_assigned_to":9,"first_name":"Maurice","middle_name":"","last_name":"Coutts"}],"error":""}
