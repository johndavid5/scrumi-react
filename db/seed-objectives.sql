delete from objectives;

insert into objectives (  description, user_id_assigned_to, begun, completed, comment ) 
values
( 'Make sure Matrix gets on the plane.', (select user_id from users where full_name(first_name,middle_name,last_name)='Sully'), '1985-05-03T13:13:07.000Z', '1985-05-03T13:23:07.000Z', '"Sully''ll make sure you get on the plane..."')
;

insert into objectives (  description, user_id_assigned_to, begun, completed, comment ) 
values
( 'Make sure Matrix gets off the plane.', (select user_id from users where full_name(first_name,middle_name,last_name)='Henriques'), '1985-05-03T13:13:07.000Z', null, '"Henriques will stay with ya...make sure you get off..."')
;

insert into objectives (  description, user_id_assigned_to, begun, completed, comment ) 
values
( 'Rescue Chenny', (select user_id from users where full_name(first_name,middle_name,last_name)='John M. Matrix'), '1985-05-03T13:23:07.000Z', '1985-05-04T01:23:07.000Z', '"All dhat matters to me now is Chenny..."')
;

insert into objectives (  description, user_id_assigned_to, begun, completed, comment  ) 
values
( 'Say ''Au Revoir'' to Bennett', (select user_id from users where full_name(first_name,middle_name,last_name)='John M. Matrix'), '1985-04-01T13:34:12.000Z', '1985-04-01T13:14:14.000Z', '"I''ll be back, Bennett!"')
;

insert into objectives (  description, user_id_assigned_to, begun, completed, comment  ) 
values
( 'Say ''Bienvenu'' to Matrix', (select user_id from users where full_name(first_name,middle_name,last_name)='Bennett'), '1985-04-02T03:13:07.000Z', '1985-04-02T03:13:09.000Z', '"Welcome back, John...so glad you could make it..."')
;

insert into objectives (  description, user_id_assigned_to, begun, completed, comment  ) 
values
( 'Say ''Adieu'' to Bennett', (select user_id from users where full_name(first_name,middle_name,last_name)='John M. Matrix'), '1985-04-02T03:23:07.000Z', '1985-04-02T03:23:09.000Z', '"Let off some steam, Bennett!"')
;


