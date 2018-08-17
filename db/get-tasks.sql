SELECT
    t.task_id, t.description, t.user_id_assigned_to,
    u.first_name, u.middle_name, u.last_name  
FROM 
    tasks t
LEFT OUTER JOIN
    users u ON t.user_id_assigned_to = u.user_id
;
