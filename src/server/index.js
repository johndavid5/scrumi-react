/* Entry point for our Node.js server... */
import React from 'react'
// Use ignoreStyles library so node.js
// doesn't generate errors when it sees
// SCSS import statements...
import ignoreStyles from 'ignore-styles'
import app from './app'
import { config } from '../config'

// Make React globally visible...
global.React = React

const le_port = config.PORT
// app.set('port', process.env.PORT || 3000)
app.set('port', le_port || 3000)

app.listen(
        app.get('port'),
        () => { console.log(`Scrumi-React running at 'http://localhost:${app.get('port')}'`) },
)

module.exports = app
