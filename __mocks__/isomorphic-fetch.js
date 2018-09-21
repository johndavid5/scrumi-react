"use strict";

import { config } from '../src/config'
import { logajohn } from '../src/lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug('__mocks__/isomorphic-fetch.js: logajohn.getLevel()=', logajohn.getLevel())

let faux_objectives = [
    { who: 'Moe', what: 'I\'ll murder you!', when: 'Now.' },
    { who: 'Larry', what: 'No, Moe!', when: 'Later.' },
    { who: 'Shemp', what: 'Meep, Meep, Meep!', when: 'Always.' },
    { who: 'Curly-Joe', what: 'Hey, Moe...!', when: 'After.' },
]

let faux_action = {"type":"OBJECTIVES_GET",
                "filters":{},
                "timestamp":"Thu Sep 20 2018 19:25:00 GMT-0400 (Eastern Daylight Time)",
                "objectives": faux_objectives,
                "error":""}

const mockFetch = jest.fn(
    (url, options)=>{

        logajohn.debug('./__mocks__/isomorphic-fetch.js: mockFetch(): url =', url)
        logajohn.debug('./__mocks__/isomorphic-fetch.js: mockFetch(): options =', options)

	    return new Promise((resolve,reject)=>{ 
	        //if (filter == null) {
	        //    reject(new Error('You supplied a null filter...'))
	        //}
	        resolve({ output: faux_action, json: function(){ return output} })
	    })
})

exports.mockFetch = mockFetch

exports.fetch = mockFetch

const mockFetchSetOutput = (output) => {
    output = output
}

exports.mockFetchSetOutput = mockFetchSetOutput

export default mockFetch


