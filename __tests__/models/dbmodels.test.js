// Testing actual models...connecting to the database...
// ...not using mocks...but if you're smart, you'll
// connect to a test database...
// We do attempt to delete the rows that we've added at the end
// of the tests, but also engineer the tests to work even if
// there are existing rows to begin with...
import { config } from '../../src/config'
import { Objectives } from '../../src/server/models/objectives'
import { Users } from '../../src/server/models/users'

import { logajohn } from '../../src/lib/logajohn'
import { errorStringify, customStringify } from '../../src/lib/utils'
import { utils } from '../../src/lib/utils'

const usersModel = new Users(config.TEST_DB_NAME)
const objectivesModel = new Objectives(config.TEST_DB_NAME)

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`__tests__/models/dbmodels.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

let sWhere = "__tests__/models/dbmodels.test.js"

describe('DbModels', () => {

    /* Any setup...? */
    //beforeAll(() => {
    //    const sWho = 'objectives.test.js::beforeAll'
    ///* e.g., clear the test database...possibly stock it with test data... */
    //})

    const testUsersIn = [
        { first_name: "John", middle_name: "", last_name: "Matrix" },
        { first_name: "Jenny", middle_name: "", last_name: "Matrix" },
        { first_name: "Cindy", middle_name: "", last_name: "" },
        { first_name: "", middle_name: "", last_name: "Bennett" }
    ]

    const testObjectivesIn = [
        { description: 'Say \'Au Revoir\' to Bennett', full_name: 'John Matrix', begun: '1985-04-01T13:34:12.000Z', completed: '1985-04-01T13:34:14.000Z', comment: 'I\'ll be back, Bennett!' }, 
        { description: 'Say \'Adieu\' to Bennett', full_name: 'John Matrix', begun: '1985-04-02T03:23:07.000Z', completed: '1985-04-02T03:23:09.000Z', comment: 'Let off some steam, Bennett!' }
    ]

    const testUsersOut = [] // The newly added users...
    const testUsersOutIdMap = {} // For quick lookup by user_id... 
    const testUsersOutFullNameMap = {} // For quick lookup by full name... 

    const testObjectivesOut = [] // The newly added objectives...
    const testObjectivesOutIdMap = {} // For quick lookup by objective_id...

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

        let sWho = sWhere + '::addUser...'

        const numAdded = 0

        testUsersIn.forEach((user) => {
	        usersModel.addUser(user)
	        .then((newUser) => {
                    logajohn.debug(`${sWho}() -- SHEMP: Moe, got newUser = `, newUser )
                    const userOutExpected = { ...user, user_id: newUser.user_id }
	                expect(newUser).toEqual(userOutExpected)

                    testUsersOut.push(newUser);
                    testUsersOutIdMap[newUser.user_id] = newUser;
                    let fullName = Objectives.fullName( newUser.first_name, newUser.middle_name, newUser.last_name );
                    testUsersOutFullNameMap[fullName] = newUser;

                    if (testUsersOut.length == testUsersIn.length) {
                        logajohn.debug(`${sWho}() -- SHEMP: donezo!  testUsersOut = ${utils.customStringify(testUsersOut, ' ')}...`)
                        //logajohn.debug(`${sWho}() -- SHEMP: donezo!  testUsersOutIdMap = `, testUsersOutIdMap )
                        logajohn.debug(`${sWho}() -- SHEMP: donezo!  testUsersOutIdMap = ${utils.customStringify(testUsersOutIdMap, ' ')}...`)
                        logajohn.debug(`${sWho}() -- SHEMP: donezo!  testUsersOutFullNameMap = ${utils.customStringify(testUsersOutFullNameMap, ' ')}...`)

                        done()
                    }
                })
        })
    })


    it('addObjective()...', (done) => {

        let sWho = sWhere + '::addObjective()'

        const numAdded = 0
        testObjectivesIn.forEach((objective, index) => {

            // Set user_id based on testUsersOut...
            objective.user_id_assigned_to = testUsersOut[objective.user_index].user_id


            logajohn.debug(`${sWho}() -- SHEMP: Calling addObjective(objective), objective = `, objective )

	        objectivesModel.addObjective(objective)
	        .then((newObjective) => {


                    const objectiveOutExpected = { ...objective, objective_id: newObjective.objective_id }

                    // Do away with objective.user_index...it was just used to match 'em up...
                    delete objectiveOutExpected.user_index;

                    // It returns a Date object in the result set...so we should convert our strings to dates...
                    if( objectiveOutExpected.begun ){
                        objectiveOutExpected.begun = new Date(objectiveOutExpected.begun);
                    }

                    if( objectiveOutExpected.completed){
                        objectiveOutExpected.completed= new Date(objectiveOutExpected.completed);
                    }

                    logajohn.debug(`${sWho}() -- SHEMP: objectiveOutExpected = `, objectiveOutExpected )

                    logajohn.debug(`${sWho}() -- SHEMP: newObjective = `, newObjective )
                    logajohn.debug(`${sWho}() -- SHEMP: typeof( newObjective.begun )= `, typeof(newObjective.begun) );
                    logajohn.debug(`${sWho}() -- SHEMP: newObjective.begun = `, newObjective.begun );
                    if( typeof(newObjective.begun) !== 'undefined' && newObjective.begun != null ){
                        logajohn.debug(`${sWho}() -- SHEMP: newObjective.begun.constructor.name = `, newObjective.begun.constructor.name );
                    }

    	            expect(newObjective).toEqual(objectiveOutExpected)

                    testObjectivesOut.push(newObjective)
                    testObjectivesOutIdMap[newObjective.objective_id] = newObjective

                    if (testObjectivesOut.length == testObjectivesIn.length) {
                        //logajohn.debug(`${sWho}() -- SHEMP: donezo!  testObjectivesOut = `, testObjectivesOut )
                        logajohn.debug(`${sWho}() -- SHEMP: donezo!  customStringify(testObjectivesOut) = ${utils.customStringify(testObjectivesOut, ' ')}...`)
                        //logajohn.debug(`${sWho}() -- SHEMP: donezo!  testObjectivesOutIdMap = `, testObjectivesOutIdMap )
                        logajohn.debug(`${sWho}() -- SHEMP: donezo!  customStringify(testObjectivesOutIdMap) = ${utils.customStringify(testObjectivesOutIdMap, ' ')}...`)
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

        let sWho = sWhere + '::getObjectives -- description filter -- case insensitive'

        let filter = { description_filter: 'GlAsSwArE' }  // case insensitive: 'GlAsSwArE' to match 'glassware'...

        logajohn.debug(`${sWho}(): filter = `, filter )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {

                logajohn.debug(`${sWho}(): .then: objectives.length =`, objectives.length)
                logajohn.debug(`${sWho}(): .then: objectives =${utils.customStringify(objectives, ' ')}...`)

                // Get rid of objectives that we didn't add ourselves as part
                // of the test...
                let new_objectives = objectives.filter( objective => testObjectivesOutIdMap.hasOwnProperty(objective.objective_id) )

                logajohn.debug(`${sWho}(): .then: new_objectives.length =`, new_objectives.length)
                logajohn.debug(`${sWho}(): .then: new_objectives =${utils.customStringify(new_objectives, ' ')}...`)

                // Should just be the one of the _new_ test objective with description 'Wash glassware' 
                expect(new_objectives.length).toEqual(1)
                expect(new_objectives[0].description).toEqual("Wash glassware")
                done()
            })
    })

    it('getObjectives -- full name filter -- case insensitive', (done) => {

        let sWho = sWhere + '::getObjectives -- full name filter -- case insensitive'

        let filter = { full_name_filter: 'ArNoLd' }  // case insensitive

        logajohn.debug(`${sWho}(): filter = `, filter )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): .then: objectives.length =`, objectives.length)
                logajohn.debug(`${sWho}(): .then: objectives =${utils.customStringify(objectives, ' ')}...`)

                // Get rid of objectives that we didn't add ourselves as part of the test...
                let new_objectives = objectives.filter( objective => testObjectivesOutIdMap.hasOwnProperty(objective.objective_id) )

                logajohn.debug(`${sWho}(): .then: new_objectives.length =`, new_objectives.length)
                logajohn.debug(`${sWho}(): .then: new_objectives =${utils.customStringify(new_objectives, ' ')}...`)

                // Should just be the one of the _new_ test objective with description 'Wash glassware'...
                expect(new_objectives.length).toEqual(2)
                expect(new_objectives[0].full_name).toEqual("Arnold Schwarzenegger")
                done()
            })
    })


    it('getObjectives -- description filter and full name filter -- case insensitive', (done) => {

        let sWho = sWhere + '::getObjectives -- description filter and full name filter -- case insensitive'

        let filter = { description_filter: 'sTeAm', full_name_filter: 'ArNoLd' }  // case insensitive

        logajohn.debug(`${sWho}(): filter = `, filter )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): .then: objectives =`, objectives)
                logajohn.debug(`${sWho}(): .then: objectives.length =`, objectives.length)

                // Get rid of objectives that we didn't add ourselves as part of the test...
                let new_objectives = objectives.filter( objective => testObjectivesOutIdMap.hasOwnProperty(objective.objective_id) )

                logajohn.debug(`${sWho}(): .then: new_objectives =`, new_objectives)
                logajohn.debug(`${sWho}(): .then: new_objectives.length =`, new_objectives.length)

                // Should just be the one of the _new_ test objective with description 'Wash glassware'...
                expect(new_objectives.length).toEqual(1)
                expect(new_objectives[0].full_name).toEqual('Arnold Schwarzenegger')
                expect(new_objectives[0].description).toEqual('Let off some steam, Bennett!')
                done()
            })
    })

    it('getObjectives -- sort_by description ASC', (done) => {

        let sWho = sWhere + '::getObjectives -- sort_by description ASC'

        let filter = { sort_by_field: 'description', sort_by_asc_desc: 'asc' }

        logajohn.debug(`${sWho}(): filter = `, filter )

        let expected_descriptions_array = testObjectivesIn.map( element => element.description ).sort( (a,b)=>+1*a.localeCompare(b) )
        logajohn.debug(`${sWho}(): expected_descriptions_array = `, expected_descriptions_array )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): after...then: objectives =`, objectives)

                // Get rid of objectives that we didn't add ourselves as part
                // of the test...
                let new_objectives = objectives.filter( objective => testObjectivesOutIdMap.hasOwnProperty(objective.objective_id) )

                logajohn.debug(`${sWho}(): after...then: new_objectives =`, new_objectives)

                // Just the descriptions...
                let output_descriptions_array = new_objectives.map( element => element.description )

                logajohn.debug(`${sWho}(): output_descriptions_array = `, output_descriptions_array )
                expect(output_descriptions_array).toEqual(expected_descriptions_array)

                done()
            })
    })

    it('getObjectives -- sort_by description DESC', (done) => {

        let sWho = sWhere + '::getObjectives -- sort_by description DESC'

        let filter = { sort_by_field: 'description', sort_by_asc_desc: 'desc' }

        logajohn.debug(`${sWho}(): filter = `, filter )

        // Sort descending...-1*a.localeCompare(b)  
        let expected_descriptions_array = testObjectivesIn.map( element => element.description ).sort( (a,b)=>-1*a.localeCompare(b) )
        logajohn.debug(`${sWho}(): expected_descriptions_array = `, expected_descriptions_array )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): after...then: objectives =`, objectives)

                // Get rid of objectives that we didn't add ourselves as part
                // of the test...
                let new_objectives = objectives.filter( objective => testObjectivesOutIdMap.hasOwnProperty(objective.objective_id) )

                logajohn.debug(`${sWho}(): after...then: new_objectives =`, new_objectives)

                // Just the descriptions...
                let output_descriptions_array = new_objectives.map( element => element.description )

                logajohn.debug(`${sWho}(): output_descriptions_array = `, output_descriptions_array )
                expect(output_descriptions_array).toEqual(expected_descriptions_array)

                done()
            })
    })

    it('getObjectives -- sort_by full_name ASC', (done) => {

        let sWho = sWhere + '::getObjectives -- sort_by full_name ASC'

        let filter = { sort_by_field: 'full_name', sort_by_asc_desc: 'asc' }

        logajohn.debug(`${sWho}(): filter = `, filter )

        let expected_full_name_array = testObjectivesOut.map( (testObjectiveOut)=>{
           let user_id = testObjectiveOut.user_id_assigned_to
           let user = testUsersOutIdMap[user_id]
           let full_name = Objectives.fullName( user.first_name, user.middle_name, user.last_name )
           return full_name
        }).sort( (a,b)=>+1*a.localeCompare(b) )

        logajohn.debug(`${sWho}(): expected_full_name_array = `, expected_full_name_array )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): after...then: objectives =`, objectives)

                // Get rid of objectives that we didn't add ourselves as part
                // of the test...
                let new_objectives = objectives.filter( objective => testObjectivesOutIdMap.hasOwnProperty(objective.objective_id) )

                logajohn.debug(`${sWho}(): after...then: new_objectives =`, new_objectives)

                // Just the descriptions...
                let output_full_name_array = new_objectives.map( element => element.full_name )

                logajohn.debug(`${sWho}(): output_full_name_array = `, output_full_name_array )
                expect(output_full_name_array).toEqual(expected_full_name_array)

                done()
            })
    })

    it('getObjectives -- sort_by full_name DESC', (done) => {

        let sWho = sWhere + '::getObjectives -- sort_by full_name DESC'

        let filter = { sort_by_field: 'full_name', sort_by_asc_desc: 'desc' }

        logajohn.debug(`${sWho}(): filter = `, filter )

        let expected_full_name_array = testObjectivesOut.map( (testObjectiveOut)=>{
           let user_id = testObjectiveOut.user_id_assigned_to
           let user = testUsersOutIdMap[user_id]
           let full_name = Objectives.fullName( user.first_name, user.middle_name, user.last_name )
           return full_name
        }).sort( (a,b)=>-1*a.localeCompare(b) )

        logajohn.debug(`${sWho}(): expected_full_name_array = `, expected_full_name_array )

        objectivesModel.getObjectives( filter )
            .then((objectives) => {
                logajohn.debug(`${sWho}(): after...then: objectives =`, objectives)

                // Get rid of objectives that we didn't add ourselves as part
                // of the test...
                let new_objectives = objectives.filter( objective => testObjectivesOutIdMap.hasOwnProperty(objective.objective_id) )

                logajohn.debug(`${sWho}(): after...then: new_objectives =`, new_objectives)

                // Just the descriptions...
                let output_full_name_array = new_objectives.map( element => element.full_name )

                logajohn.debug(`${sWho}(): output_full_name_array = `, output_full_name_array )
                expect(output_full_name_array).toEqual(expected_full_name_array)

                done()
            })
    })

    it('getObjectives -- null filter -- error', (done) => {
        let sWho = sWhere + "::getObjectives() -- null filter"
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

        let sWho = sWhere + `::test deleteObjectiveById`

        let num_deleted = 0

        // Delete all the objectives one-by-one...
        testObjectivesOut.forEach((objective) => {

            logajohn.debug(`${sWho}(): Calling deleteObjectiveById(${objective.objective_id})...`)

	        objectivesModel.deleteObjectiveById(objective.objective_id)
            .then((deletedId) => {
                logajohn.debug(`${sWho}(): After deleteObjectiveById(${objective.objective_id})...then...deletedId=${deletedId}...`)

  	            expect(deletedId).toEqual(objective.objective_id)
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

        let sWho = sWhere + ": getObjectives -- after delete"

        objectivesModel.getObjectives({})
            .then((objectives) => {
                logajohn.debug(`${sWho}...then...objectives=`, objectives, ', objectives.length = ', objectives.length, 'objectiveCountBefore=', objectiveCountBefore)
                expect(objectives.length).toEqual(objectiveCountBefore)
                done()
            })
    })


    it(`deleteUserById()...`, (done) => {

        let sWho = sWhere + ': deleteUserById'

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
        const sWho = sWhere + '::objectives.test.js::afterAll'
    /* e.g., clear the test database... */
    })
})
