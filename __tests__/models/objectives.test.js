import { config } from '../../config'
import { reverseForEach } from '../../src/lib/array-helpers'
import { Objectives } from '../../src/server/models/objectives'
import { logajohn } from '../../src/lib/logajohn'

let objectivesModel = new Objectives();

//logajohn.setLevel('info')
//logajohn.setLevel('debug')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`objectives.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)
//delete console.log;

describe("ObjectivesModel", () => {


    /* Any setup...? */
    beforeAll( () => {
        let sWho = 'objectives.test.js::beforeAll'
        /* e.g., clear the test database...possibly stock it with test data... */
    })

    it( "got objectives...?", (done) => {
        let filter = {};
        let args = {filter};
        //logajohn.debug(`objectives.test.js--ObjectivesModel.getObjectives(args=`, args, `)...`)
        //console.log(`objectives.test.js--objectivesModel.getObjectives(args=`, args, `)...`)
        objectivesModel.getObjectives(args)
        .then( (objectives) => {
            logajohn.debug(`objectives.test.js--"got objectives..."--got back objectives = `, objectives )
            //console.log(`objectives.test.js--"got objectives..."--got back objectives = `, objectives )
            expect(objectives.length).toBeGreaterThan(0);
            done();
        })
        .catch( (err)=> {
            logajohn.debug(`objectives.test.js--"caught err..."--got back err = `, err )
            //console.log(`objectives.test.js--"caught err..."--got back err = `, err )
        })
        
        //return ObjectivesModel.getObjectives({filter: {}}).then( objectives => {
        //    logajohn.debug(`objectives.test.js--"got objectives..."--got back objectives = `, objectives )
        //    expect(objectives.length).toBeGreaterThan(0);
        //});

    });


    /* Any teardown...? */
    afterAll( () => {

        let sWho = 'objectives.test.js::afterAll'
        /* e.g., clear the test database... */
    })

})
