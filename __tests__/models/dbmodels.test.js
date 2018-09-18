// Testing actual models...connecting to the database...
// ...not using mocks...

import { config } from '../../src/config'
import { Objectives } from '../../src/server/models/objectives'
import { Users } from '../../src/server/models/users'

import { logajohn } from '../../src/lib/logajohn'
import { errorStringify } from '../../src/lib/utils'

const usersModel = new Users(config.TEST_DB_NAME)
const objectivesModel = new Objectives(config.TEST_DB_NAME)

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`__tests__/models/dbmodels.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe('DbModels', () => {

    /* Any setup...? */
    //beforeAll(() => {
    //    const sWho = 'objectives.test.js::beforeAll'
    ///* e.g., clear the test database...possibly stock it with test data... */
    //})

    const testUsersIn = [
        { first_name: 'Joe', middle_name: 'S.', last_name: 'Kovacs' },
        { first_name: 'Jean', middle_name: 'R.', last_name: 'Kovacs' },
        // ,{first_name: "John", middle_name: "D.", last_name: "Aynedjian"}
        // ,{first_name: "Robert", middle_name: "S.", last_name: "Peters"}
    ]

    const testUsersOut = []
    let userCountBefore = null
    let objectiveCountBefore = null

    it('getUsers -- before', (done) => {
        usersModel.getUsers({})
            .then((users) => {
                logajohn.debug('getUsers() -- before...then...users=', users)
                expect(users.length).toBeGreaterThanOrEqual(0)
                userCountBefore = users.length
                done()
            })
    })


    it('addUser...', (done) => {
        const numAdded = 0
        testUsersIn.forEach((user) => {
	        usersModel.addUser(user)
	        .then((newUser) => {
                    const userOutExpected = { ...user, user_id: newUser.user_id }
	            expect(newUser).toEqual(userOutExpected)
                    testUsersOut.push(newUser)
                    if (testUsersOut.length == testUsersIn.length) {
                        done()
                    }
                })
        })
    })

    it('getObjectives -- before', (done) => {
        objectivesModel.getObjectives({})
            .then((objectives) => {
                logajohn.debug('getObjectives() -- before...then: objectives =', objectives)
                expect(objectives.length).toBeGreaterThanOrEqual(0)
                objectiveCountBefore = objectives.length
                done()
            })
    })

    it('getObjectives -- null filter -- error', (done) => {
        let sWho = "getObjectives() -- null filter"
        logajohn.debug(`${sWho}...`)
        objectivesModel.getObjectives(null) // Should reject promise if you supply null filter...
            .then((objectives) => {
                logajohn.debug(`${sWho}...then...objectives=`, objectives)
                done.fail(new Error('Promise should have been rejected'))
            })
            .catch( (err)=> {
                logajohn.debug(`${sWho}...caught err = `, errorStringify(err) )
                expect(err).toEqual(expect.anything()) // Error is not null and not undefined...
                done()
            })
    })

    it('getUsers -- after add', (done) => {
        usersModel.getUsers({})
            .then((users) => {
                logajohn.debug('getUsers() -- after add...then...users=', users)
                expect(users.length).toEqual(userCountBefore + testUsersIn.length)
                done()
            })
    })


    it(`deleteUserById: quantity=${testUsersOut.length}`, (done) => {
        let num_deleted = 0
        // Delete all the users one-by-one...
        testUsersOut.forEach((user) => {
            logajohn.debug(`deleteUserById(${user.user_id})...`)
	        usersModel.deleteUserById(user.user_id)
                .then((deletedId) => {
                    logajohn.debug(`deleteUserById(${user.user_id})...then...deletedId=${deletedId}...`)
	            expect(deletedId).toEqual(user.user_id)
                    num_deleted++
                    if (num_deleted == testUsersOut.length) {
                        done()
                    }
	         })
        })
    })

    it('getUsers -- after delete', (done) => {
        usersModel.getUsers({})
            .then((users) => {
                logajohn.debug('getUsers() -- after delete...then...users=', users, ', userCountBefore=', userCountBefore)
                expect(users.length).toEqual(userCountBefore)
                done()
            })
    })

    //         testUsersOut.forEach( (user)=>{
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

    //        testUsersOut.forEach( (user)=>{
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
    afterAll(() => {
        const sWho = 'objectives.test.js::afterAll'
    /* e.g., clear the test database... */
    })
})
