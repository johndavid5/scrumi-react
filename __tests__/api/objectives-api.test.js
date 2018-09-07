
/* https://github.com/jameswlane/jest-express */
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
