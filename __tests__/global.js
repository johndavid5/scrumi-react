import React from 'react'
import ReactDOM from 'react-dom'
import deepFreeze from 'deep-freeze'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { config } from '../src/config'
import { logajohn } from '../src/lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`__tests__/global.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

Enzyme.configure({ adapter: new Adapter() })

// For testing, add React, ReactDOM, and Enzyme
// to the global scope...
global.React = React
global.ReactDOM = ReactDOM
global.Enzyme = Enzyme

// Add mock isomorphic fetch to the global scope for your pleasure and enjoyment...
// ...see https://github.com/jefflau/jest-fetch-mock....
// ...actually we hacked our own in __mocks__ inspired by
// jefflau's version...
//global.fetch = require('jest-fetch-mock')

window.localStorage = {}
console.groupCollapsed = jest.fn()
console.log = jest.fn()
console.groupEnd = jest.fn()

logajohn.info("__tests__/global.js: Callin' jest.setTimeout(10000)...")
jest.setTimeout(10000)

global._testColors = deepFreeze([
    {
        id: '8658c1d0-9eda-4a90-95e1-8001e8eb6036',
        title: 'lawn',
        color: '#44ef37',
        timestamp: 'Sun Apr 10 2016 12:54:19 GMT-0700 (PDT)',
        rating: 4,
    },
    {
        id: 'f9005b4e-975e-433d-a646-79df172e1dbb',
        title: 'ocean blue',
        color: '#0061ff',
        timestamp: 'Mon Apr 11 2016 12:54:31 GMT-0700 (PDT)',
        rating: 2,
    },
    {
        id: '58d9caee-6ea6-4d7b-9984-65b145031979',
        title: 'tomato',
        color: '#ff4b47',
        timestamp: 'Fri Apr 15 2016 12:54:43 GMT-0700 (PDT)',
        rating: 0,
    },
])
