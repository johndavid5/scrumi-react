import { config } from '../../config'
import { reverseForEach } from '../../src/lib/array-helpers'
import { Objectives } from '../../src/server/models/objectives'
import { Users } from '../../src/server/models/users'
import { logajohn } from '../../src/lib/logajohn'

let usersModel = new Users(config.TEST_DB_NAME);
let objectivesModel = new Objectives(config.TEST_DB_NAME);

//logajohn.setLevel('info')
//logajohn.setLevel('debug')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`dbmodels.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)
//delete console.log;

describe("DbModels", () => {

    /* Any setup...? */
    beforeAll( () => {
        let sWho = 'objectives.test.js::beforeAll'
        /* e.g., clear the test database...possibly stock it with test data... */
    })

    let test_users = [
        {first_name: "Joe", middle_name: "S.", last_name: "Kovacs"}
        ,{first_name: "Jean", middle_name: "R.", last_name: "Kovacs"}
        //,{first_name: "John", middle_name: "D.", last_name: "Aynedjian"}
        //,{first_name: "Robert", middle_name: "S.", last_name: "Peters"}
    ];

    test_users.forEach( (user)=>{
	        it( `add user: ${JSON.stringify(user)}`, (done) => {
	            usersModel.addUser(user)
	            .then( (newUser)=>{
                    let userOutExpected = {...user, user_id: newUser.user_id};
	                expect(newUser).toEqual(userOutExpected);
                    done();
	            })
	        })
    })
    


//    it( "got objectives...?", (done) => {
//        let filter = {};
//        let args = {filter};
//        //logajohn.debug(`objectives.test.js--ObjectivesModel.getObjectives(args=`, args, `)...`)
//        //console.log(`objectives.test.js--objectivesModel.getObjectives(args=`, args, `)...`)
//        objectivesModel.getObjectives(args)
//        .then( (objectives) => {
//            logajohn.debug(`objectives.test.js--"got objectives..."--got back objectives = `, objectives )
//            //console.log(`objectives.test.js--"got objectives..."--got back objectives = `, objectives )
//            expect(objectives.length).toBeGreaterThan(0);
//            done();
//        })
//        .catch( (err)=> {
//            logajohn.debug(`objectives.test.js--"caught err..."--got back err = `, err )
//            //console.log(`objectives.test.js--"caught err..."--got back err = `, err )
//        })
//        
//        //return ObjectivesModel.getObjectives({filter: {}}).then( objectives => {
//        //    logajohn.debug(`objectives.test.js--"got objectives..."--got back objectives = `, objectives )
//        //    expect(objectives.length).toBeGreaterThan(0);
//        //});
//
//    });


    /* Any teardown...? */
    afterAll( () => {

        let sWho = 'objectives.test.js::afterAll'
        /* e.g., clear the test database... */
    })

})
