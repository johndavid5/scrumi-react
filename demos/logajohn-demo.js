// const logatim = require('logatim')
// import { trace, debug, info, warn, error, dateTimeStamp } from '../src/lib/logajohn'
import { logajohn } from '../src/lib/logajohn'
import { config } from '../config'
// import logajohn from '../src/lib/logajohn'
// import logatim from 'logatim'

// logatim.setLevel('trace')

console.log('logajohn=', logajohn)

console.log(`logajohn.setLevel(${config.DEBUG})...`)
logajohn.setLevel(config.DEBUG)
// console.log("logatim.getLevel()=", logatim.getLevel())
console.log('logajohn.getLevel()=', logajohn.getLevel())
// console.log("dateTimeStamp()=", dateTimeStamp())

const joe = { name: 'Joe', number: 5 }

console.log('This is console.log, joe=', joe)

// trace("This is trace, joe=", joe)
// debug("This is debug, joe=", joe)
// info("This is info, joe=", joe)
// warn("This is warn, joe=", joe)
// error("This is error, joe=", joe)

// logajohn.trace("This is logajohn.trace, joe=", joe)
logajohn.debug('This is logajohn.debug, joe=', joe)
logajohn.info('This is logajohn.info, joe=', joe)
logajohn.warn('This is logajohn.warn, joe=', joe)
logajohn.error('This is logajohn.error, joe=', joe)
