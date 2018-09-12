"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

import { logajohn } from '../../../lib/logajohn'
logajohn.info('__mocks__/objectives.js: logajohn.getLevel()=', logajohn.getLevel())

const faux_objectives = [
    { who: 'Moe', what: 'I\'ll murder you!', when: 'Now.' },
    { who: 'Larry', what: 'No, Moe!', when: 'Later.' },
    { who: 'Shemp', what: 'Meep, Meep, Meep!', when: 'Always.' },
    { who: 'Curly-Joe', what: 'Hey, Moe...!', when: 'After.' },
]

const mockGetObjectives = jest.fn(
    (filter)=>{

        logajohn.info('__mocks__/objectives.js: mockGetObjectives(): filter=', filter )

	    return new Promise((resolve,reject)=>{ 
	        if (filter == null) {
	            reject(new Error('You supplied a null filter...'))
	            //reject('You supplied a null filter...')
	        }
	        resolve(faux_objectives)
	    })
})

exports.mockGetObjectives = mockGetObjectives

class Objectives {
    constructor() {
        logajohn.info('__mocks__/objectives.js: Objectives mock constructor...')
        //this.disable = jest.fn((key) => {
        //    this.setting[key] = false;
        //});
        this.getObjectives = mockGetObjectives;
        return this;
    }
}
exports.Objectives = Objectives;
//# sourceMappingURL=express.js.map


//const mock = jest.fn().mockImplementation(() => {
//  return {getObjectives: mockGetObjectives};
//});

//export default mock;
