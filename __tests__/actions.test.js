/* Test store and action creators together... */
import C from '../src/constants'
import storeFactory from '../src/store'
import { objectivesFilter } from '../src/actions'

describe("Action Creators", () => {

    let store

    describe("objectivesFilter", () => {

    const sampleObjectives = [
	  {
	   "task_id": 1,
	   "description": "Wash glassware",
	   "user_id_assigned_to": 1,
	   "first_name": "Joe",
	   "middle_name": "S.",
	   "last_name": "Kovacs"
	  },
	  {
	   "task_id": 2,
	   "description": "Arrange files",
	   "user_id_assigned_to": 2,
	   "first_name": "Jean",
	   "middle_name": "R.",
	   "last_name": "Kovacs"
	  },
	  {
	   "task_id": 3,
	   "description": "Run Cyanide analysis",
	   "user_id_assigned_to": 3,
	   "first_name": "John",
	   "middle_name": "D.",
	   "last_name": "Aynedjian"
	  }
    ]

        beforeAll(() => {
            store = storeFactory({sampleObjectives})
            store.dispatch(objectivesFilter({}))
        })

        afterAll(() => global.localStorage['redux-store'] = false)

        it("should have objectives", () =>{
            expect(store.getState().objectives_list.length).toBe(3)
            expect(store.getState().objectives_list).toEqual(sampleObjectives)
        })

        it("should have timestamp", () =>
            expect(store.getState().timestamp).toBeDefined())

    })

})
