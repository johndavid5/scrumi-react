del create-and-seed.out
call psql-run-file-scrumi.bat users.tbl 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi.bat tasks.tbl 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi.bat seed-users.sql 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi.bat seed-tasks.sql 2>&1 | tee -a create-and-seed.out
