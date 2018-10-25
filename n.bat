REM babel-node ".\db\isql.js" -q "SELECT objective_id from objectives" -d "scrumi" 2>&1 | tee n.out
REM babel-node .\db\isql.js --file ./db/get-objectives.sql --dbname scrumi 2>&1 | tee n.out
REM babel-node .\db\isql.js --query "SELECT objective_id from objectives;"  --dbname scrumi 2>&1 | tee n.out
REM babel-node .\db\isql.js --file q.sql  --dbname scrumi 2>&1 | tee n.out
babel-node .\db\isql.js --file ./db/get-objectives.sql --dbname scrumi 2>&1 | tee n.out
