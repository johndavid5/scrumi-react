set PGUSER=web_user
set PGPASSWORD=pass
%sct%\node_modules\.bin\babel-node %sct%\demos\objectives-demo.js %1 %2 %3 2>&1 | tee %sct%\demos\objectives-demo.out 
