import { config } from '../../src/config'
import { logajohn } from '../../src/lib/logajohn'

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

import objectives_mock_api_router from '../../src/server/objectives-api'
import { Objectives as ObjectivesMockModel, mockGetObjectives } from '../../src/server/models/objectives'

describe('objectives_api...', () => {
    it('get()...', (done) => {
        objectives_mock_api_router.get('/objectives');
        expect(objectives_mock_api_router.get).toBeCalledWith('/objectives');
        expect(mockGetObjectives).toHaveBeenCalledTimes(1)
        done();
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
