// Testing out our mock, actually...
import { config } from '../../src/config'
import { logajohn } from '../../src/lib/logajohn'
import { Objectives, mockGetObjectives } from '../../src/server/models/objectives'

// Explicitly supply the path to __mocks__/objectives
// Objectives is now a mock constructor...
jest.mock('../../src/server/models/objectives',() => {
  return require('../../src/server/models/__mocks__/objectives');
}); 


logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`objectives.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe('Objectives mock...', () => {

    const objectivesMockModel = new Objectives(config.TEST_DB_NAME)

    beforeEach(() => {
      //Objectives.mockClear();
      objectivesMockModel.getObjectives.mockClear();
    })

    it('getObjectives()', (done) => {
        objectivesMockModel.getObjectives({})
            .then((objectives) => {
                logajohn.debug('__tests__/models/getObjectives() .then: objectives =', objectives)
                expect(objectives.length).toBeGreaterThanOrEqual(0)
                expect(objectivesMockModel.getObjectives).toHaveBeenCalledTimes(1)
                expect(mockGetObjectives).toHaveBeenCalledTimes(1)
                done()
            })
    })

    it('getObjectives()--exception if null filter', (done) => {
        objectivesMockModel.getObjectives(null)
            .catch((err) => {
                logajohn.debug('__tests__/models/getObjectives()--exception if null filter .catch: err.name =', err.name, ', err.message = ', err.message )
                expect(err).toBeDefined()
                //expect(err).toEqual('You supplied a null filter...')
                expect(err.name).toEqual('Error')
                expect(err.message).toEqual('You supplied a null filter...')
                done()
            })
    })
})
