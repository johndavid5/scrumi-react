'use strict'
import express from 'express'
import path from 'path'
/* Use Express bodyParser middleware to parse incoming
* requests and obtain any variables sent to the routes.
*/
import bodyParser from 'body-parser'
import fs from 'fs'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom' // When we want to render our component tree to a string...
import { renderToString } from 'react-dom/server'

/* Our API's...as middleware... */
import objectives_api from './objectives-api'
import users_api from './users-api'

import user_login_api from './user-login-api'
import user_login_session_api from './user-login-session-api'

import App from '../components/App'
import storeFactory from '../store'


// No, thank you...we're full stackers here, not front-enders, so
// if we're going to fetch an initial state, we'll fetch it from the database,
// not from a JSON file...so later on, figure out how to fetch from
// the database...it's a bit dicie because it's an async op
// and all these ops are synchronous...
//
//import initialState from '../../data/initialState.json'
//import initialState from './initialState'
let initialState = {};

import { logajohn } from '../lib/logajohn'
// import logatim from 'logatim'

import { config } from '../config'

let sWhere = "./src/server/app.js";

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`${sWhere}: logajohn.getLevel() = ${logajohn.getLevel()}...`)
logajohn.debug(`${sWhere}: process.version = ${process.version}...`)

/*
* staticCSS: middleware to handle (and "compile") SCSS gracefully...
*
* To avoid the "flicker" of the page first coming up without stylesheets,
* grab our 'compiled' CSS...and later embed it directly in <head>...</head>...
*/
const staticCSS = fs.readFileSync(path.join(__dirname, '../../dist/assets/bundle.css'))

/* fileAssets: middleware to handle static assets... */
const fileAssets = express.static(path.join(__dirname, '../../dist/assets'))

const serverStore = storeFactory(true, initialState)


/* Save the state to a new JSON file every time the state changes...
* The `serverStore` is now the main source of truth.
* ...NOT!
* Actually, we're not automatically updating the
* store on the server side any more...instead we'll
* write to the database upon update...the database
* will be our "single source of truth" on the server
* side, thank you very much...
*/
serverStore.subscribe(() => fs.writeFile(
    path.join(__dirname, '../../data/initialState.json'),
    JSON.stringify(serverStore.getState()),
    error => ((error) ? console.log('Error saving state!', error) : null),
))

/*
* The `state` and the `html` can be used in the last
* composed function, `buildHTMLPage()`...
*/
//        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />

//        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
//        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>:null

const buildHTMLPage = ({ html, state, css }) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Scrumi-React</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="shortcut icon" href="/scrumi-react/images/favicon-todo.ico" type="image/x-icon">
        <link rel="icon" href="/scrumi-react/images/favicon-todo.ico" type="image/x-icon">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <!-- Link to manifest for PWA -->
        <link rel="manifest" href="/scrumi-react/manifest.json">

        <!-- iOS doesn't support manifest.json yet, so add meta tags and icons -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Scrumi React">
        <link rel="apple-touch-icon" href="/scrumi-react/images/todo-152x152.png">

        <!-- For SEO, add description -->
        <meta name="description" content="A todo list app">

        <!-- theme-color for PWA -- color of address bar -->
        <meta name="theme-color" content="#007BFF" />


        <style>${staticCSS}</style>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/scrumi-react/bundle.js"></script>
        <!-- For Boostrap 4.3.1: jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <!-- Add the install script... -->
        <script src="/scrumi-react/install.js"></script> 

        <script>
        // Check that service workers are supported...
        if( 'serviceWorker' in navigator ){
            // Use the window load event to keep the page load performant...
            window.addEventListener('load', () => {
                console.log("SHEMP: Calling navigator.serviceWorker.register('/scrumi-react/service-worker.js'), Moe...");
                navigator.serviceWorker.register('/scrumi-react/service-worker.js');
            });
        }
        </script>
    </body>
</html>
`

/**
* => The output from the `makeClientStoreFrom()` function
* becomes the input for the `renderComponentToHTML()`
* function.  This function expects that the url and store
* have been packaged into a single argument, hence
* the function signature ({url, store})
*
* => The `renderComponentsToHTML()` returns an
* object with two properties: `state` and `html`.
* The `state` is obtained from the new client store
* and the `html` is generated by the `renderToString()`
* method.
*
* => Since the app still uses Redux in the browser, the
* `Provider` is rendered as the root component, and
* the new client store is passed to it as a property.
*
* => The `StaticRouter` component is used to render the
* UI based upon the location that is being requested.
* The `StaticRouter` requires a `location` and `context`.
* The requested `url` is passed to the `location` property
* and an empty object is passed to `context`.
*
* => When these components are rendered to an HTML string,
* the location will be taken into account, and the
* `StaticRouter` will render the correct routes.
*
* => This function returns the two necessary components
* to build the page: the current state of the organizer,
* and the UI rendered to an HTML string.
*/
const renderComponentsToHTML = ({ url, store }) => ({
    state: store.getState(),
    html: renderToString(
      <Provider store={store}>
          <StaticRouter location={url} context={{}}>
              <App />
            </StaticRouter>
        </Provider>,
    ),
})

/*
* makeClientStoreFrom(store) -- Higher Order Function
*
*  (1) Initially invoked with the serverStore once.
*      (Sealing serverStore into the function scope
*       as `store`...)
*
*  (2) Returns a function that is invoked on every request
*      and will always have access to the serverStore.
*
*  When `htmlResponse()` is invoked, it expects a single
*  argument: the `url` that has been requested by the user.
*  For step one, we will create a higher order function that
*  packages `url` with a new client `store` created using
*  the current state of the `serverStore`(i.e., a clone
*  of 'serverStore').  Both `store` and `url` are passed
*  to the next function, step 2, in a single object:
*/
const makeClientStoreFrom = store => url => ({
    url,
    store: storeFactory(false, store.getState()),
})

/* In order to generate an HTML response, there are three
* steps:
*  1. Create a store that runs on the client using the
*  data from the `serverStore` -- makeClientStoreFrom(serverStore)
*  2. Render the component tree as HTML using the StaticRouter -- renderComponentToHtml()
*  3. Create the HTML page that will be sent to the client -- buildHTMLPage()
*/
const htmlResponse = compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom(serverStore),
)

const respond = ({ url }, res) => res.status(200).send(
    htmlResponse(url),
)

const logger = (req, res, next) => {
    console.log(`app.js::logger(): ${req.method} request for '${req.url}'`)
    next()
}

/* Middleware func: addStoreToRequestPipeline():
* Adds the serverStore to the request pipeline
* so that it can be used by other middleware
* during a request...
*/
const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore
    next()
}

/* Special router to ensure that service-worker.js comes back with a mime type of "text/javascript" */
/* Otherwise, it seems to come back with mime type of text/html and gets slimed:
* "Uncaught (in promise) DOMException: Failed to register a ServiceWorker for scope ('http://localhost:3004/')
*  with script ('http://localhost:3004/service-worker.js'): The script has an unsupported MIME type ('text/html')."
*
*  Actually, this error was due to service-worker.js not being found in the ./assets folder...a build issue...
*/
/*
const serviceWorkerRouter = new express.Router()
serviceWorkerRouter.get("/service-worker.js", (req, res) => {
  console.log("SHEMP: Looks like dha service-worker.js file, Moe...");
  res.sendFile(path.resolve(__dirname, "../../dist/assets", "service-worker.js"));
});
*/

export default express()
    .use(bodyParser.json())
    .use(logger)
    //.use(serviceWorkerRouter)
    .use(fileAssets)
    // Also /scrumi-react prefix for reverse proxy...
    .use('/scrumi-react', fileAssets)
    .use(addStoreToRequestPipeline)
    .use('/objectives_api', objectives_api)
    .use('/user_login_api', user_login_api)
    .use('/user_login_session_api', user_login_session_api)
    // Also /scrumi-react prefix for reverse proxy...
    .use('/scrumi-react/objectives_api', objectives_api)
    .use('/scrumi-react/users_api', users_api)
    .use('/scrumi-react/user_login_api', user_login_api)
    .use('/scrumi-react/user_login_session_api', user_login_session_api)
    .use(respond)
