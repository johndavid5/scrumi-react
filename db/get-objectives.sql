SELECT
    t.objective_id, t.description, t.user_id_assigned_to,
    full_name(u.first_name, u.middle_name, u.last_name),
	t.begun, t.completed, t.comment,
	u.first_name, u.middle_name, u.last_name
FROM 
    objectives t
LEFT OUTER JOIN
    users u ON t.user_id_assigned_to = u.user_id
ORDER BY objective_id
;
