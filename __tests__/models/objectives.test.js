import { config } from '../../config'
import { reverseForEach } from '../../src/lib/array-helpers'
import { ObjectiveModel } from '../../src/server/models/objectives'
import { logajohn } from '../../src/lib/logajohn'

//logajohn.setLevel('info')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`objectives.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe("ObjectivesModel", () => {


    /* Any setup...? */
    beforeAll( () => {
        let sWho = 'objectives.test.js::beforeAll'
        /* e.g., clear the test database...possibly stock it with test data... */
    })

    it( "got objectives...", () => {
        ObjectivesModel.getObjectives({filter: {}})
        .
        return ObjectivesModel.getObjectives({filter: {}}).then( objectives => {
            logajohn.debug(`objectives.test.js--"got objectives..."--got back objectives = `, objectives )
            expect(objectives.length).toBeGreaterThan(0);
        });
    });


    /* Any teardown...? */
    afterAll( () => {

        let sWho = 'objectives.test.js::afterAll'
        /* e.g., clear the test database... */
    })

})
