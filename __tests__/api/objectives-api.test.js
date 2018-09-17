import { config } from '../../src/config'
import { logajohn } from '../../src/lib/logajohn'
import { errorStringify, customStringify } from '../../src/lib/utils'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`objectives-api.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

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
import { router as objectives_mock_api_router, doGet }  from '../../src/server/objectives-api'
import { Objectives as ObjectivesMockModel, mockGetObjectives } from '../../src/server/models/objectives'

import constants from '../../src/constants'


describe('objectives_api...', () => {

    let mockObjectives = {};
    let mockObjectivesModel = new ObjectivesMockModel()

    beforeAll(async () => {
       const sWho = "objectives-api.test.js: beforeAll()"
       try {
          mockObjectives = await mockObjectivesModel.getObjectives({}) 
          logajohn.info(`${sWho}(): SHEMP: Moe, my first time usin' async await...got mockObjectives = `, mockObjectives )
       }
       catch( err ){
          logajohn.info(`${sWho}(): Trouble with mockObjectives: `, errorStringify(err) )
       }
       await mockObjectivesModel.getObjectives.mockClear()
    });

    beforeEach(async () => {
      mockGetObjectives.mockClear()
    })

//    it('get()...', async (done) => {
//        const sWho = "objectives-api.test.js::get"
//        logajohn.info(`${sWho}(): objectives_mock_api_router.get('/objectives')...`)
//
//        //logajohn.info(`${sWho}(): SHEMP: Moe, befo' anyting...mockGetObjectives.mock.calls = `, mockGetObjectives.mock.calls )
//        //logajohn.info(`${sWho}(): SHEMP: Moe, befo' anythin...mockGetObjectives.mock.results = `, mockGetObjectives.mock.results )
//
//        objectives_mock_api_router.get('/objectives')
//        expect(objectives_mock_api_router.get).toBeCalledWith('/objectives');
//
//        //logajohn.info(`${sWho}(): SHEMP: Moe, after...mockGetObjectives.mock.calls = `, mockGetObjectives.mock.calls )
//        //logajohn.info(`${sWho}(): SHEMP: Moe, after...mockGetObjectives.mock.results = `, mockGetObjectives.mock.results )
//        logajohn.info(`${sWho}(): SHEMP: Moe, expect(mockGetObjectives).toHaveBeenCalledTimes(1)...`)
//        expect(mockGetObjectives).toHaveBeenCalledTimes(1)
//        //expect(mockGetObjectives.mock.calls.length).toBe(1)
//
//        expect(objectives_mock_api_router.response.status).toHaveBeenCalledTimes(1)
//        expect(objectives_mock_api_router.response.status).toBeCalledWith(200)
//        expect(objectives_mock_api_router.response.json).toHaveBeenCalledTimes(1)
//        logajohn.info(`${sWho}(): done()...`)
//        done();
//    })

    it('doGet()...', (done) => {
        const sWho = "objectives-api.test.js::doGet"
        logajohn.info(`${sWho}()...`)

        let request_mock = new RequestMock();
        let response_mock = new ResponseMock();

        //response_mock.status = jest.fn().mockImplementation( (status_code) => { logajohn.info("CURLY: response_mock.status: status_code = ", status_code ) } );

        //response_mock.status.mockClear();

        logajohn.info(`${sWho}(): Here goes, Moe...`)
        doGet(request_mock, response_mock, ()=>{

            expect(mockGetObjectives).toHaveBeenCalledTimes(1)

            expect(response_mock.status).toHaveBeenCalledTimes(1)
            //expect(response_mock.status).toHaveBeenCalled()
            expect(response_mock.status).toBeCalledWith(200)
            expect(response_mock.json).toHaveBeenCalledTimes(1)
            //expect(response_mock.json).toHaveBeenCalled()
            
            logajohn.info(`${sWho}() mockGetObjectives.mock.calls = `, mockGetObjectives.mock.calls )
            logajohn.info(`${sWho}() response_mock.status.mock.calls = `, response_mock.status.mock.calls )
            logajohn.info(`${sWho}() response_mock.status.mock.calls.length = `, response_mock.status.mock.calls.length )
            //expect(response_mock.status.mock.calls.length).toEqual(1)
            logajohn.info(`${sWho}() response_mock.json.mock.calls = `, response_mock.json.mock.calls )
            logajohn.info(`${sWho}() response_mock.json.mock.calls.length = `, response_mock.json.mock.calls.length )

            let payload = response_mock.json.mock.calls[0][0]

            logajohn.info(`${sWho}() payload = `, payload )
            logajohn.info(`${sWho}() Does payload.type = `, payload.type, ` equal constants.OBJECTIVES_GET = `, constants.OBJECTIVES_GET, `...?` )

            expect(payload.type).toEqual(constants.OBJECTIVES_GET)

            logajohn.info(`${sWho}() Does payload.objectives = `, payload.objectives, ` equal mockObjectives = `, mockObjectives, `...?` )

            expect(payload.objectives).toEqual(mockObjectives)

            done();
        })
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
//  logajohn.info(`${sWho}(): json.mock.calls = `, json.mock.calls )
//
//  expect(json.mock.calls).toHaveLength(1);
//  done();
//  //expect(json.mock.calls[0][0]).toBe('Hello World!');
//});

//import { config } from '../../src/config'
//import { logajohn } from '../../src/lib/logajohn'
//
//logajohn.setLevel(config.DEBUG_LEVEL)
//logajohn.info(`objectives-api.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)
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
//  logajohn.info(`${sWho}(): json.mock.calls = `, json.mock.calls )
//
//  expect(json.mock.calls).toHaveLength(1);
//  done();
//  //expect(json.mock.calls[0][0]).toBe('Hello World!');
//});
