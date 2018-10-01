SELECT
        t.task_id, t.description, t.user_id_assigned_to,
        u.first_name, u.middle_name, u.last_name  
    FROM 
        tasks t
    LEFT OUTER JOIN
        users u ON t.user_id_assigned_to = u.user_id
    WHERE
    	t.description like '%glassware%'
;

PREPARE foo(text) AS
SELECT
        t.task_id, t.description, t.user_id_assigned_to,
        u.first_name, u.middle_name, u.last_name  
    FROM 
        tasks t
    LEFT OUTER JOIN
        users u ON t.user_id_assigned_to = u.user_id
    WHERE
    	t.description like '%' || $1 || '%' ;
EXECUTE foo('glassware');
DEALLOCATE foo;

PREPARE foo(text,text,text) AS
    SELECT  * 
    FROM    foobar
    WHERE   foo = $1
       AND  bar = $2
        OR  baz = $3  ;
EXECUTE foo('foo','bar','baz');
DEALLOCATE foo;
