REM call demos\file-model-demo.bat 2>&1 | tee p.out
REM call demos\objectives-demo.bat 2>&1 | tee p.out
REM npm run test-models 2>&1 | tee p.out
REM npm run test-models-watch 2>&1 | tee p.out
REM npm run test-reducer-watch 2>&1 | tee p.out
REM npm run test-watch 2>&1 | tee p.out
REM npm run test-app-watch 2>&1 | tee p.out
REM yarn run test-objectives-mock-watch 2>&1 | tee p.out
REM yarn run test-models-watch 2>&1 | tee p.out
REM yarn run test-watch-all 2>&1 | tee p.out
REM yarn run test-objectives-reducers-watch 2>&1 | tee p.out
REM yarn run test-actions-watch 2>&1 | tee p.out
REM node MssqlDatabaseTest.js 2>&1 | perl ./scripts/strip-colors.pl -tee n.out | tee
REM yarn run test-actions-watch 2>&1 | py ./scripts/strip-colors.py -tee p.out | tee
REM yarn run test-actions-watch 2>&1 | tee p.out
REM yarn run test-objectives-api-watch 2>&1 | tee p.out
REM yarn run test-objectives-filter-form 2>&1 | tee p.out
REM yarn run test-objectives-filter-form-container 2>&1 | tee p.out
REM yarn run test-watch-all 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch dbmodels.test.js
REM babel-node node_modules\jest\bin\jest.js --watch --no-colors ObjectivesListComponent.test.js 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch --no-colors "ObjectivesListComponent.test.js$" 2>&1 | tee p.out
REM LARRY: What an idea...! Since jest likes to crash so much, why not hook it into nodemon...
REM ...except it doesn't seem to respond to Enter to re-run...but it should still respond
REM to code changes...but re-starting the whole thing takes forever upon code change...
REM ...but keep at it, my good fellow...
REM nodemon -e js --exec babel-node node_modules\jest\bin\jest.js --no-colors --watchAll 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch --no-colors "ObjectivesFilterForm.test.js$" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch "utils.test.js$" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch "actions.test.js$" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch "objectives-api.test.js$" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watchAll 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch 2>&1 | tee p.out
babel-node node_modules\jest\bin\jest.js --watch --no-colors "dbmodels.test.js$" 2>&1 | tee p.out
