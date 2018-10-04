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
        {first_name: "Arnold", middle_name: "", last_name: "Schwarzenegger"},
        {first_name: "Robert", middle_name: "S.", last_name: "Peters"}
    ]

    // Note: supply index in testUsersIn...we'll use the user_id for the database insert...
    const testObjectivesIn = [
        { description: 'Wash glassware', user_index: 0 },
        { description: 'Arrange files', user_index: 1 },
        { description: 'I\'ll be back, Bennett!', user_index: 2},
        { description: 'Let off some steam, Bennett!', user_index: 2}
    ]

    const testUsersOut = []
    const testObjectivesOut = []
    let userCountBefore = null
    let objectiveCountBefore = null

    it('getObjectives -- before', (done) => {
        objectivesModel.getObjectives({})
            .then((objectives) => {
                logajohn.debug('getObjectives() -- before...then: objectives =', objectives)
                expect(objectives.length).toBeGreaterThanOrEqual(0)
                objectiveCountBefore = objectives.length
                logajohn.debug('getObjectives() -- before...then: objectiveCountBefore =', objectiveCountBefore)
                done()
            })
    })

    it('getUsers -- before', (done) => {
        usersModel.getUsers({})
            .then((users) => {
                logajohn.debug('getUsers() -- before...then...users=', users)
                expect(users.length).toBeGreaterThanOrEqual(0)
                userCountBefore = users.length
                logajohn.debug('getUsers() -- before...then: userCountBefore =', userCountBefore)
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


    it('addObjective()...', (done) => {
        let sWho = 'addObjective'

        const numAdded = 0
        testObjectivesIn.forEach((objective, index) => {

            // Set user_id based on testUsersOut...
            objective.user_id_assigned_to = testUsersOut[objective.user_index].user_id

            // Do away with objective.user_index...it will throw off our expect later...
            delete objective.user_index

            logajohn.debug(`${sWho}() -- SHEMP: Calling addObjective(objective), objective = `, objective )

	        objectivesModel.addObjective(objective)
	        .then((newObjective) => {
                const objectiveOutExpected = { ...objective, task_id: newObjective.task_id }
	            expect(newObjective).toEqual(objectiveOutExpected)
                    testObjectivesOut.push(newObjective)
                    if (testObjectivesOut.length == testObjectivesIn.length) {
                        done()
                    }
                })
        })
    })

    it('getObjectives -- after add -- length', (done) => {
        objectivesModel.getObjectives({})
            .then((objectives) => {
                logajohn.debug('getObjectives() -- after add -- length...then: objectives =', objectives)
                expect(objectives.length).toBeGreaterThanOrEqual(0)
                expect(objectives.length).toEqual(objectiveCountBefore + testObjectivesIn.length)
                done()
            })
    })

    it('getObjectives -- description filter -- case insensitive', (done) => {
        let sWho = 'getObjectives -- description filter -- case insensitive'
        let filter = { description_filter: 'GlAsSwArE' }  // case insensitive: 'GlAsSwArE' to match 'glassware'...

        logajohn.debug(`${sWho}(): filter = `, filter )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): after...then: objectives =`, objectives)
                // Should just be the one of the _new_ test objective with description 'Wash glassware' 
                expect(objectives.length).toEqual(1+objectiveCountBefore)
                done()
            })
    })

    it('getObjectives -- sort_by description', (done) => {

        let sWho = 'getObjectives -- sort_by description'

        let filter = { sort_by_field: 'description', sort_by_asc_desc: 'asc' }

        logajohn.debug(`${sWho}(): filter = `, filter )

        let expected_descriptions_array = testObjectivesIn.map( element => element.description ).sort()
        logajohn.debug(`${sWho}(): expected_descriptions_array = `, expected_descriptions_array )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): after...then: objectives =`, objectives)
                let output_descriptions_array = objectives.map( element => element.description )
                logajohn.debug(`${sWho}(): output_descriptions_array = `, output_descriptions_array )
                expect(output_descriptions_array).toEqual(expected_descriptions_array)
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
                //expect(err).toEqual(expect.anything()) // Error is not null and not undefined...
                expect(err).toBeDefined() // Error is not null and not undefined...
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



    it(`deleteObjectiveById()...`, (done) => {

        let sWho = `test deleteObjectiveById`

        let num_deleted = 0

        // Delete all the objectives one-by-one...
        testObjectivesOut.forEach((objective) => {

            logajohn.debug(`${sWho}(): Calling deleteObjectiveById(${objective.task_id})...`)

	        objectivesModel.deleteObjectiveById(objective.task_id)
            .then((deletedId) => {
                logajohn.debug(`${sWho}(): After deleteObjectiveById(${objective.task_id})...then...deletedId=${deletedId}...`)

  	            expect(deletedId).toEqual(objective.task_id)
                num_deleted++
                if (num_deleted == testObjectivesOut.length) {
                    done()
                }
	         })
             .catch( (err)=> {
                logajohn.debug(`${sWho}...caught err = `, errorStringify(err) )
             })
        })
    })

    it('getObjectives -- after delete', (done) => {
        objectivesModel.getObjectives({})
            .then((objectives) => {
                logajohn.debug('getObjectives() -- after delete...then...objectives=', objectives, ', objectiveCountBefore=', objectiveCountBefore)
                expect(objectives.length).toEqual(objectiveCountBefore)
                done()
            })
    })


    it(`deleteUserById()...`, (done) => {

        let sWho = 'dbmodels.test.js: deleteUserById'

        let num_deleted = 0
        // Delete all the users one-by-one...
        testUsersOut.forEach((user) => {

            logajohn.debug(`${sWho}(${user.user_id})...`)

	        usersModel.deleteUserById(user.user_id)
                .then((deletedId) => {

                    logajohn.debug(`${sWho}(${user.user_id})...then...deletedId=${deletedId}...`)

    	            expect(deletedId).toEqual(user.user_id)

                    num_deleted++

                    if (num_deleted == testUsersOut.length) {
                        done()
                    }
	         })
            .catch( (err)=> {
                logajohn.debug(`${sWho}...caught err = `, errorStringify(err) )
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
