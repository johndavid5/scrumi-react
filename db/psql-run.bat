set PGPASSWORD=pass
psql -U web_user -d scrumi -f "%1" 2>&1 | tee psql-run.out
