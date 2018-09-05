// const logatim = require('logatim')
import logatim from '../node_modules/logatim/lib/logatim'
// const logatim = require('../node_modules/logatim/lib/logatim')

logatim.setLevel('trace')

const joe = { name: 'joe', number: 10 }

console.log('console.log: joe=', joe)
logatim.green.info('logatim-info: joe=', joe)
logatim.cyan.trace('logatim-trace: joe=', joe)

console.log = function (...args) { logatim.green.info('[LOGATIM.INFO]', ...args) }
// logatim.green.info = function(...args){ args.unshift("[LOGATIM.INFO]"); logatim.green.info(args); }
// logatim.green.info = function(arg){ logatim.green.info(arg); }
const info = function (...args) { logatim.green.info('[LOGATIM.INFO]', ...args) }

console.log('console.log: joe=', joe)
info('logatim: joe=', joe)
