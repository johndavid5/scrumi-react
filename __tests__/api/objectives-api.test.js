import { config } from '../../src/config'
import { logajohn } from '../../src/lib/logajohn'
import { errorStringify, customStringify } from '../../src/lib/utils'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`objectives-api.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

//jest.mock('express', () => {
//  return require('../../__mocks__/express');
//});

//import { Router } from 'express';

//const mockGet = jest.fn();
//jest.mock('express', () => {
//  return jest.fn().mockImplementation(() => {
//    return {get: mockGet};
//  })
//})

jest.mock('express')

// Explicitly supply the path to __mocks__/objectives
// Objectives is now a mock constructor...
//jest.mock('../../src/server/models/objectives',() => {
//  return require('../../src/server/models/__mocks__/objectives');
//}); 

jest.mock('../../src/server/models/objectives');

import { Request as RequestMock } from 'request'
import { Response as ResponseMock } from 'response'
//import { router as objectives_mock_api_router, doGet }  from '../../src/server/objectives-api'
import { doGet }  from '../../src/server/objectives-api'
import { Objectives as ObjectivesMockModel, mockGetObjectives } from '../../src/server/models/objectives'

import constants from '../../src/constants'


describe('objectives_api...', () => {

    let mockObjectives = {};
    let mockObjectivesModel = new ObjectivesMockModel()

    beforeAll(async () => {
       const sWho = "objectives-api.test.js: beforeAll()"
       try {
          mockObjectives = await mockObjectivesModel.getObjectives({}) 
          logajohn.debug(`${sWho}(): SHEMP: Moe, my first time usin' async await...got mockObjectives = `, mockObjectives )
       }
       catch( err ){
          logajohn.debug(`${sWho}(): Trouble with mockObjectives: `, errorStringify(err) )
       }
       await mockObjectivesModel.getObjectives.mockClear()
    });

    beforeEach(async () => {
      mockGetObjectives.mockClear()
    })

//    it('get()...', async (done) => {
//        const sWho = "objectives-api.test.js::get"
//        logajohn.debug(`${sWho}(): objectives_mock_api_router.get('/objectives')...`)
//
//        //logajohn.debug(`${sWho}(): SHEMP: Moe, befo' anyting...mockGetObjectives.mock.calls = `, mockGetObjectives.mock.calls )
//        //logajohn.debug(`${sWho}(): SHEMP: Moe, befo' anythin...mockGetObjectives.mock.results = `, mockGetObjectives.mock.results )
//
//        objectives_mock_api_router.get('/objectives')
//        expect(objectives_mock_api_router.get).toBeCalledWith('/objectives');
//
//        //logajohn.debug(`${sWho}(): SHEMP: Moe, after...mockGetObjectives.mock.calls = `, mockGetObjectives.mock.calls )
//        //logajohn.debug(`${sWho}(): SHEMP: Moe, after...mockGetObjectives.mock.results = `, mockGetObjectives.mock.results )
//        logajohn.debug(`${sWho}(): SHEMP: Moe, expect(mockGetObjectives).toHaveBeenCalledTimes(1)...`)
//        expect(mockGetObjectives).toHaveBeenCalledTimes(1)
//        //expect(mockGetObjectives.mock.calls.length).toBe(1)
//
//        expect(objectives_mock_api_router.response.status).toHaveBeenCalledTimes(1)
//        expect(objectives_mock_api_router.response.status).toBeCalledWith(200)
//        expect(objectives_mock_api_router.response.json).toHaveBeenCalledTimes(1)
//        logajohn.debug(`${sWho}(): done()...`)
//        done();
//    })

    test('doGet()...', (done) => {
        const sWho = "objectives-api.test.js::doGet"
        logajohn.debug(`${sWho}()...`)

        let request_mock = new RequestMock();
        let response_mock = new ResponseMock();

        //response_mock.status = jest.fn().mockImplementation( (status_code) => { logajohn.debug("CURLY: response_mock.status: status_code = ", status_code ) } );

        //response_mock.status.mockClear();

        logajohn.debug(`${sWho}(): Here goes, Moe...`)
        doGet(request_mock, response_mock, { callback: ()=>{

            expect(mockGetObjectives).toHaveBeenCalledTimes(1)

            expect(response_mock.status).toHaveBeenCalledTimes(1)
            //expect(response_mock.status).toHaveBeenCalled()
            expect(response_mock.status).toBeCalledWith(200)
            expect(response_mock.json).toHaveBeenCalledTimes(1)
            //expect(response_mock.json).toHaveBeenCalled()
            
            logajohn.debug(`${sWho}() mockGetObjectives.mock.calls = `, mockGetObjectives.mock.calls )
            logajohn.debug(`${sWho}() response_mock.status.mock.calls = `, response_mock.status.mock.calls )
            logajohn.debug(`${sWho}() response_mock.status.mock.calls.length = `, response_mock.status.mock.calls.length )
            //expect(response_mock.status.mock.calls.length).toEqual(1)
            logajohn.debug(`${sWho}() response_mock.json.mock.calls = `, response_mock.json.mock.calls )
            logajohn.debug(`${sWho}() response_mock.json.mock.calls.length = `, response_mock.json.mock.calls.length )

            let payload = response_mock.json.mock.calls[0][0]

            logajohn.debug(`${sWho}() payload = `, payload )
            logajohn.debug(`${sWho}() Does payload.type = `, payload.type, ` equal constants.OBJECTIVES_GET = `, constants.OBJECTIVES_GET, `...?` )

            expect(payload.type).toEqual(constants.OBJECTIVES_GET)

            logajohn.debug(`${sWho}() Does payload.objectives = `, payload.objectives, ` equal mockObjectives = `, mockObjectives, `...?` )

            expect(payload.objectives).toEqual(mockObjectives)

            expect(payload.error).toEqual('')

            done();
          }
        }
        )
    })


    test('doGet() -- null filter -- error', (done) => {
        const sWho = "objectives-api.test.js::doGet() -- null filter -- error"
        logajohn.debug(`${sWho}()...`)

        let request_mock = new RequestMock();
        let response_mock = new ResponseMock();

        logajohn.debug(`${sWho}(): Here goes, Moe...`)
        doGet(request_mock, response_mock, { filters: null, callback: ()=>{

            expect(mockGetObjectives).toHaveBeenCalledTimes(1)

            expect(response_mock.status).toHaveBeenCalledTimes(1)
            //expect(response_mock.status).toHaveBeenCalled()
            expect(response_mock.status).toBeCalledWith(200)
            expect(response_mock.json).toHaveBeenCalledTimes(1)
            //expect(response_mock.json).toHaveBeenCalled()
            
            logajohn.debug(`${sWho}() mockGetObjectives.mock.calls = `, mockGetObjectives.mock.calls )
            logajohn.debug(`${sWho}() response_mock.status.mock.calls = `, response_mock.status.mock.calls )
            logajohn.debug(`${sWho}() response_mock.status.mock.calls.length = `, response_mock.status.mock.calls.length )
            //expect(response_mock.status.mock.calls.length).toEqual(1)
            logajohn.debug(`${sWho}() response_mock.json.mock.calls = `, response_mock.json.mock.calls )
            logajohn.debug(`${sWho}() response_mock.json.mock.calls.length = `, response_mock.json.mock.calls.length )

            let payload = response_mock.json.mock.calls[0][0]

            logajohn.debug(`${sWho}() payload = `, payload )
            logajohn.debug(`${sWho}() Does payload.type = `, payload.type, ` equal constants.OBJECTIVES_GET = `, constants.OBJECTIVES_GET, `...?` )

            expect(payload.type).toEqual(constants.OBJECTIVES_GET)

            logajohn.debug(`${sWho}(): SHEMP: Moe,  payload.error = `, errorStringify(payload.error) )
            //expect(payload.error).toEqual(expect.anything())
            expect(payload.error).toBeDefined()
            expect(payload.error).not.toEqual('')
            expect(payload.error.message).toEqual('You supplied a null filter...')

            done();
            }
          }
        )
    })

})

//test('Should call res.status(200).json() with action object', (done) => {
//  const sWho = 'objectives-api.test.js'
//  const json = jest.fn();
//  const res = {
//    json,
//  };
//  const req = {
//  };
//  router.get('/objectives', (req,res) )
//
//  logajohn.debug(`${sWho}(): json.mock.calls = `, json.mock.calls )
//
//  expect(json.mock.calls).toHaveLength(1);
//  done();
//  //expect(json.mock.calls[0][0]).toBe('Hello World!');
//});

//import { config } from '../../src/config'
//import { logajohn } from '../../src/lib/logajohn'
//
//logajohn.setLevel(config.DEBUG_LEVEL)
//logajohn.debug(`objectives-api.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)
//
////jest.mock('express', () => {
////  return require('../../../jest-express');
////});
//
//import { Express } from '../../../jest-express/lib/express';
//import { server } from '../../src/server/index.js';
// 
//let app;
// 
//describe('Server', () => {
//  beforeEach(() => {
//    app = new Express();
//  });
// 
//  afterEach(() => {
//    app.resetMocked();
//  });
//
//  
//  test('app.get()', () => {
//        
//  });
// 
//  test('should setup server', () => {
//    const options = {
//      port: 3000,
//    };
//   
//    server(app, options);
//   
//    expect(app.set).toBeCalledWith('port', options.port);
//  });
//
//});

//const router = require('../../src/server/objectives-api');
//
//test('Should call res.status(200).json() with action object', (done) => {
//  const sWho = 'objectives-api.test.js'
//  const json = jest.fn();
//  const res = {
//    json,
//  };
//  const req = {
//  };
//  router.get('/objectives', (req,res) )
//
//  logajohn.debug(`${sWho}(): json.mock.calls = `, json.mock.calls )
//
//  expect(json.mock.calls).toHaveLength(1);
//  done();
//  //expect(json.mock.calls[0][0]).toBe('Hello World!');
//});
