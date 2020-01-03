REM Note: set env-vars PGUSER=<username> PGPASSWORD=<pass>
psql -d scrumi -f "%1" 2>&1 | tee psql-run-file-scrumi.out
