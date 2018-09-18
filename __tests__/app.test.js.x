import { config } from '../src/config'
import { logajohn } from '../src/lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`app.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

//const app = require('../src/server/app.js');
//import { sapp } from '../src/server/app.js';

//const app = require('../src/server/index.js');
//import { sapp } from '../src/server/index.js';
//import { sapp } from '../src/server/jserver';
//var sapp = require('../src/server/jserver');

//function test(t) {
//  if (t === undefined) {
//     return 'Undefined value!';
//  }
//  return t;
//}

//logajohn.info(`5: app.test.js: Moe, sapp = `, test(sapp) )

describe('index route', () => {

  test('/user should respond with a 200', (done) => {
	request(app)
	  .get('/user')
	  .expect('Content-Type', /json/)
	  .expect('Content-Length', '15')
	  .expect(200)
	  .end(function(err, res) {
	    if (err) throw err;
        logajohn.info(`app.test.js: OK, Moe, callin' done()...`)
	    done();
	  });
  });

});

// const request = require('supertest');
//
//
//jest.mock('../../app/photo_model');
//jest.mock('../src/server/models/objectives.js');
//const app = require('../../app/server');
//const app = require('../src/server/app.js');
//const app = require('../src/server/index.js');
//
//describe('index route', () => {
//  afterEach(() => {
//    app.server.close();
//  });
//
//  test('should respond with a 200 with no query parameters', () => {
//    return request(app)
//      .get('/')
//      //.expect('Content-Type', /html/)
//      //.expect(200)
//      .then(response => {
//        expect(response.text).toMatch(
//          /<title>Express App Testing Demo<\/title>/
//        );
//      });
//  });

//  test('should respond with a 200 with valid query parameters', () => {
//    return request(app)
//      .get('/?tags=california&tagmode=all')
//      .expect('Content-Type', /html/)
//      .expect(200)
//      .then(response => {
//        expect(response.text).toMatch(
//          /<div class="panel panel-default search-results">/
//        );
//      });
//  });
//
//  test('should respond with a 200 with invalid query parameters', () => {
//    return request(app)
//      .get('/?tags=california123&tagmode=all')
//      .expect('Content-Type', /html/)
//      .expect(200)
//      .then(response => {
//        expect(response.text).toMatch(/<div class="alert alert-danger">/);
//      });
//  });
//
//  test('should respond with a 500 error due to bad jsonp data', () => {
//    return request(app)
//      .get('/?tags=error&tagmode=all')
//      .expect('Content-Type', /json/)
//      .expect(500)
//      .then(response => {
//        expect(response.body).toEqual({ error: 'Internal server error' });
//      });
//  });
//
//});
