SELECT
        t.task_id, t.description, t.user_id_assigned_to,
        u.first_name, u.middle_name, u.last_name  
    FROM 
        tasks t
    LEFT OUTER JOIN
        users u ON t.user_id_assigned_to = u.user_id
    ORDER BY description ASC
;

PREPARE foo(text) AS
SELECT
        t.task_id, t.description, t.user_id_assigned_to,
        u.first_name, u.middle_name, u.last_name  
    FROM 
        tasks t
    LEFT OUTER JOIN
        users u ON t.user_id_assigned_to = u.user_id
    ORDER BY $1 ASC

EXECUTE foo('description');
DEALLOCATE foo;

PREPARE foo(text,text,text) AS
    SELECT  * 
    FROM    foobar
    WHERE   foo = $1
       AND  bar = $2
        OR  baz = $3  ;
EXECUTE foo('foo','bar','baz');
DEALLOCATE foo;
