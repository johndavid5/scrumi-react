del create-and-seed-test.out
call psql-run-file-scrumi-test.bat users.tbl 2>&1 | tee -a create-and-seed-test.out
call psql-run-file-scrumi-test.bat tasks.tbl 2>&1 | tee -a create-and-seed-test.out
call psql-run-file-scrumi-test.bat seed-users.sql 2>&1 | tee -a create-and-seed-test.out
call psql-run-file-scrumi-test.bat seed-tasks.sql 2>&1 | tee -a create-and-seed-test.out
