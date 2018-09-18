import C from '../../../src/constants'
import { objectives } from '../../../src/store/reducers'
import { faux_objectives } from '../../../data/fauxObjectives'
import deepFreeze from 'deep-freeze' // deepFreeze: causes test to fail if object is modified...ensures pure functions...

describe("objectives reducers", () => {

    let objectivesList = faux_objectives

    it("OBJECTIVES_GET success", () => {
        const state = {}
        const action = {
            type: C.OBJECTIVES_GET,
            filters: {"description": "build"},
            timestamp: new Date().toString(),
            objectives: objectivesList,
            error: ''
        }
        deepFreeze(state)
        deepFreeze(action)
        const result = objectives(state, action)
        expect(result)
            .toEqual({
                objectives_filters: action.filters,
                objectives_timestamp: action.timestamp,
                objectives_list: action.objectives,
                objectives_error: action.error,
            })
    })

    it("OBJECTIVES_FETCHING true", () => {
        const state = {}
        const action = {
            type: C.OBJECTIVES_FETCHING,
            objectives_is_fetching: true
        }
        deepFreeze(state)
        deepFreeze(action)

        const result = objectives(state, action)

        expect(result)
            .toEqual({
                objectives_fetching: true,
            })
    })

    it("OBJECTIVES_FETCHING false", () => {
        const state = {}
        const action = {
            type: C.OBJECTIVES_FETCHING,
            objectives_is_fetching: false 
        }
        deepFreeze(state)
        deepFreeze(action)

        const result = objectives(state, action)

        expect(result)
            .toEqual({
                objectives_fetching: false,
            })
    })

})
