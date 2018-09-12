"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

import { logajohn } from '../../../lib/logajohn'
logajohn.info('__mocks__/express.js: logajohn.getLevel()=', logajohn.getLevel())

export const mockGet = jest.fn(
    (path)=>{
        logajohn.info('__mocks__/express.js: mockGet(): path=', path)
});
//exports.mockGet = mockGet;
//export mockGet;

class Express {
    constructor() {
        logajohn.info('__mocks__/express.js: Express mock constructor...')

        this.get = mockGet;

        return this;
    }
}
//exports.Express = Express;
//export default Express
exports.Router = Express 
