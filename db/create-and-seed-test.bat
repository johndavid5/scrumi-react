del create-and-seed-test.out
call psql-run-file-scrumi-test.bat full_name.fcn 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi-test.bat users.tbl 2>&1 | tee -a create-and-seed-test.out
call psql-run-file-scrumi-test.bat objectives.tbl 2>&1 | tee -a create-and-seed-test.out
call psql-run-file-scrumi-test.bat seed-users.sql 2>&1 | tee -a create-and-seed-test.out
call psql-run-file-scrumi-test.bat seed-objectives.sql 2>&1 | tee -a create-and-seed-test.out
