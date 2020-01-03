REM Note: You'll need to set environmental variables:
REM PGUSER=<username> PGPASSWORD=<pass>
psql -d scrumi-test -f "%1" 2>&1 | tee psql-run-file-scrumi-test.out
