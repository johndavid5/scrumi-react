/* Kill two birds with one stone: Test store and action creators together... */
import C from '../src/constants'
import storeFactory from '../src/store'
import { objectivesFilter, objectivesIsFetching } from '../src/actions'

import { faux_objectives } from '../data/fauxObjectives'

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


    describe("objectivesIsFetching()...client-based action...", () => {

        beforeAll(() => store = storeFactory())

        it("can dispatch OBJECTIVES_FETCHING true", () => {
            store.dispatch(objectivesIsFetching(true))
            expect(store.getState().objectives_fetching).toEqual(true)
        })

        it("can dispatch OBJECTIVES_FETCHING false", () => {
            store.dispatch(objectivesIsFetching(true))
            expect(store.getState().objectives_fetching).toEqual(false)
        })

    })


})
