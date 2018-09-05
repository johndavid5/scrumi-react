import C from '../../../src/constants'
import { objectives } from '../../../src/store/reducers'
import deepFreeze from 'deep-freeze'

describe("objectives Reducer", () => {

    let objectivesList = [
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
                objectives_loading: false,
                objectives_filters: action.filters,
                objectives_timestamp: action.timestamp,
                objectives_list: action.objectives,
                objectives_error: action.error,
            })
    })

})
