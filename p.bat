REM https://stackoverflow.com/questions/5944180/how-do-you-run-a-command-as-an-administrator-from-the-windows-command-line/18316648#18316648
REM <!-- : --- Self-Elevating Batch Script ---------------------------
REM @whoami /groups | find "S-1-16-12288" > nul && goto :admin
REM set "ELEVATE_CMDLINE=cd /d "%~dp0" & call "%~f0" %*"
REM cscript //nologo "%~f0?.wsf" //job:Elevate & exit /b
REM 
REM -->
REM <job id="Elevate"><script language="VBScript">
REM   Set objShell = CreateObject("Shell.Application")
REM   Set objWshShell = WScript.CreateObject("WScript.Shell")
REM   Set objWshProcessEnv = objWshShell.Environment("PROCESS")
REM   strCommandLine = Trim(objWshProcessEnv("ELEVATE_CMDLINE"))
REM   objShell.ShellExecute "cmd", "/c " & strCommandLine, "", "runas"
REM </script></job>
REM :admin -----------------------------------------------------------
REM 
REM @echo off
REM echo Running as elevated user.
REM echo Script file : %~f0
REM echo Arguments   : %*
REM echo Working dir : %cd%
REM echo.
REM :: administrator commands here
REM :: e.g., run shell as admin
REM cmd /k
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
REM babel-node node_modules\jest\bin\jest.js --watch --no-colors "ObjectivesListComponent.test.js$" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch --no-colors "dbmodels.test.js$" 2>&1 | tee p.out
REM for bash and script -> typescript
REM babel-node node_modules\jest\bin\jest.js --debug --verbose --watch --no-colors "SortButton.test.js" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch --json --outputFile test.json 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --debug --verbose --watch --no-colors "ObjectivesListComponent.test.js$" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --debug --verbose --watch --no-colors "ObjectivesListContainer.test.js" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --debug --verbose --watch --no-colors "SortButton.test.js" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watchAll 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch --no-colors "index.test.js" 2>&1 | tee p.out
REM babel-node node_modules/jest/bin/jest.js --watch --no-colors "dbmodels.test.js$" 2>&1 | tee p.out
REM babel-node node_modules\jest\bin\jest.js --watch --no-colors "ObjectivesFilterForm.test.js$" 2>&1 | tee p.out
babel-node node_modules\jest\bin\jest.js --watch --no-colors "ObjectivesListComponent.test.js" 2>&1 | tee p.out
