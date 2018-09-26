Scrumi-React
============

Create Read Update Delete tasks....
------------------------------------

React ReactRouter Redux 

Node Express

PostgreSQL

PostgreSQL node driver: "pg": "^7.4.3",
https://node-postgres.com/

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
    "For async action creators using Redux Thunk or other middleware, it's best to completely mock the Redux store for tests. You can apply the middleware to a mock store using redux-mock-store. You can also use fetch-mock to mock the HTTP requests."

    https://github.com/dmitry-zaets/redux-mock-store
