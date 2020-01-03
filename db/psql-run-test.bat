REM Note: set env-vars PGUSER=<username> PGPASSWORD=<pass>
psql -d scrumi-test -f "%1" 2>&1 | tee psql-run.out
