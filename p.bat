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
REM yarn run test-watch-all 2>&1 | tee p.out
REM yarn run test-objectives-filter-form 2>&1 | tee p.out
yarn run test-objectives-filter-form-container 2>&1 | tee p.out
