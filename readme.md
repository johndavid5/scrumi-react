Scrumi-React
============
(1) install PostgreSQL and DB Tables (./db/*.tbl) and Functions (./db/*.fcn), and seed data (./db/seed-users.sql, ./db/seed-objectives.sql)
(2) npm install
- - - - - - - - - 
(1) npm run build-client  /* watch mode */
(2) npm run build-server  /* watch mode */
(3) npm run start-server  /* watch mode */


Create Read Update Delete tasks....
------------------------------------

React ReactRouter Redux 

Node Express

PostgreSQL

PostgreSQL node driver: "pg": "^7.4.3",
https://node-postgres.com/
https://stackoverflow.com/questions/50947066/error-sorry-too-many-clients-already

* https://jestjs.io/docs/en/asynchronous.html
* https://jestjs.io/docs/en/mock-functions

* A comprehensive Jest-Express mock...
    https://github.com/jameswlane/jest-express

* Steps you through express mock hacks and integration tests...
    https://codeburst.io/revisiting-node-js-testing-part-2-14f50f8ddab5

* http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
    npm install --save supertest
    npm install --save superagent

* entire code tree...demo of express app testing with jest and supertest and mocking of models...
    https://github.com/gregjopa/express-app-testing-demo

* supertest:
    https://github.com/visionmedia/supertest

* Use Puppeteer for end-to-end tests:
    https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7

* How to Mock isomorphic-fetch without Really Trying:
    https://github.com/jefflau/jest-fetch-mock
    https://github.com/jefflau/jest-fetch-mock/blob/master/src/index.js

* Mentioning thunks for Redux Store::dispatch()...

    https://redux.js.org/api/store#dispatch-action
    "However, if you wrap createStore with applyMiddleware, the middleware can interpret actions differently, and provide support for dispatching async actions. Async actions are usually asynchronous primitives like Promises, Observables, or thunks."

    https://redux.js.org/recipes/writingtests
    "For async action creators using Redux Thunk or other middleware, it's best to completely mock the Redux store for tests.
     You can apply the middleware to a mock store using redux-mock-store. You can also use fetch-mock to mock the HTTP requests."

    https://github.com/dmitry-zaets/redux-mock-store

* 10/9/2018: After many many annoying Jest crashes...
  To prevent constant crashing of jest because it can't
  lstat .p.swp or some other temp file, run it as admin...
        Error: EPERM: operation not permitted, lstat 'c:\inetpub\wwwroot\scrumi-react\src\components\ui\4913'
        Error: EPERM: operation not permitted, lstat 'D:\reactnative\MyBaby\node_modules \.staging\react-native-vector-icons-2612cf43\Fonts\Zocial.ttf'
 https://github.com/oblador/react-native-vector-icons/issues/354
 REM Self-Elevating Batch Script...
 https://stackoverflow.com/questions/5944180/how-do-you-run-a-command-as-an-administrator-from-the-windows-command-line/18316648#18316648

* Jest -- unit vs. integration testing -- excellent article: 

    The author suggests a special suffix *.ispec.js for integration tests,
    and gives you tips on filtering the Jest tests...

    https://medium.com/coding-stones/separating-unit-and-integration-tests-in-jest-f6dd301f399c

* 10/25/2018 Shall we attempt upgrade from node.js v6.9.0 to v8.12.0 LTS...?
  C:\Program Files\nodejs\node
  I really wouldn't advise it...you can make your own promisify, after all...
