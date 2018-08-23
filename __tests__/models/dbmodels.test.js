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

    let test_users_in = [
        {first_name: "Joe", middle_name: "S.", last_name: "Kovacs"}
        ,{first_name: "Jean", middle_name: "R.", last_name: "Kovacs"}
        //,{first_name: "John", middle_name: "D.", last_name: "Aynedjian"}
        //,{first_name: "Robert", middle_name: "S.", last_name: "Peters"}
    ];

    let test_users_out = [];
    let user_count_before = null;
    let objective_count_before = null;

    it( `getUsers -- before`, (done) => {
        usersModel.getUsers({})
        .then( (users)=> {
            logajohn.debug(`getUsers() -- before...then...users=`, users)
            expect( users.length ).toBeGreaterThanOrEqual( 0 )
            user_count_before = users.length
            done()
        })
    })

    it( `addUser...`, (done) => {
        let num_added = 0
        test_users_in.forEach( (user)=>{
	        usersModel.addUser(user)
	        .then( (newUser)=>{
                let userOutExpected = {...user, user_id: newUser.user_id};
	            expect(newUser).toEqual(userOutExpected);
                test_users_out.push(newUser);
                if( test_users_out.length == test_users_in.length ){
                    done();
                }
            })
        })
    })

    it( `getObjectives -- before`, (done) => {
        objectivesModel.getObjectives({})
        .then( (objectives)=> {
            logajohn.debug(`getObjectives() -- before...then: objectives =`, objectives)
            expect( objectives.length ).toBeGreaterThanOrEqual( 0 )
            objective_count_before = objectives.length
            done()
        })
    })

    it( `getUsers -- after add`, (done) => {
        usersModel.getUsers({})
        .then( (users)=> {
            logajohn.debug(`getUsers() -- after add...then...users=`, users)
            expect( users.length ).toEqual( user_count_before + test_users_in.length )
            done()
        })
    })

    it( `deleteUserById: quantity=${test_users_out.length}`, (done) => {
        let num_deleted = 0
        // Delete all the users one-by-one...
        test_users_out.forEach( (user)=>{
        logajohn.debug(`deleteUserById(${user.user_id})...`)
	        usersModel.deleteUserById(user.user_id)
            .then( (deletedId)=>{
                logajohn.debug(`deleteUserById(${user.user_id})...then...deletedId=${deletedId}...`)
	            expect(deletedId).toEqual(user.user_id);
                num_deleted++
                if( num_deleted == test_users_out.length ){
                  done();
                }
	         })
       })

    })

    it( `getUsers -- after delete`, (done) => {
        usersModel.getUsers({})
        .then( (users)=> {
            logajohn.debug(`getUsers() -- after delete...then...users=`, users, `, user_count_before=`, user_count_before)
            expect( users.length ).toEqual( user_count_before )
            done()
        })
    })

//         test_users_out.forEach( (user)=>{
//	        it( `deleteUserById: ${JSON.stringify(user)}`, (done) => {
//              logajohn.debug(`deleteUserById(${user.user_id})...`)
//	          usersModel.deleteUserById(user.user_id)
//              .then( (deletedId)=>{
//                  logajohn.debug(`deleteUserById(${user.user_id})...then...deletedId=${deletedId}...`)
//	              expect(deletedId).toEqual(user.user_id);
//                  done();
//	          })
//           })
//         })

//        test_users_out.forEach( (user)=>{
//	     it( `deleteUserById: ${JSON.stringify(user)}`, (done) => {
//            logajohn.debug(`deleteUserById(${user.user_id})...`)
//	        usersModel.deleteUserById(user.user_id)
//            .then( (deletedId)=>{
//                    logajohn.debug(`deleteUserById(${user.user_id})...then...deletedId=${deletedId}...`)
//	                expect(deletedId).toEqual(user.user_id);
//                    done();
//	         })
//	        })
//        })
    


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
