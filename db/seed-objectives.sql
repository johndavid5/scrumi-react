insert into objectives (  description, user_id_assigned_to, begun, completed  ) 
values
( 'Rescue Chenny', (select user_id from users where first_name='John' and last_name='Matrix'), '1985-05-03T13:23:07.000Z', '1985-05-04T01:23:07.000Z')
;


