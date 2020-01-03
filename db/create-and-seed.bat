del create-and-seed.out
call psql-run-file-scrumi.bat full_name.fcn 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi.bat users.tbl 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi.bat objectives.tbl 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi.bat seed-users.sql 2>&1 | tee -a create-and-seed.out
call psql-run-file-scrumi.bat seed-objectives.sql 2>&1 | tee -a create-and-seed.out
