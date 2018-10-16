ALTER TABLE tasks
RENAME TO objectives;

ALTER TABLE objectives
RENAME COLUMN task_id TO objective_id;

ALTER TABLE public.objectives
    ADD COLUMN begun timestamp with time zone;

-- ALTER TABLE public.objectives DROP COLUMN completed;

ALTER TABLE public.objectives
    ADD COLUMN completed timestamp with time zone;

ALTER TABLE public.objectives
    ADD COLUMN comment VARCHAR(100);

update objectives set begun='2018-10-01 16:04:20', completed='2018-10-15 13:01:20', comment='Hello, Joe!' where objective_id=1;

update objectives set begun='2018-10-02 09:04:20', completed='2018-10-10 15:01:20', comment='Jean...Fort Dix!' where objective_id=2;

update objectives set begun='2018-10-03 09:04:20', completed='2018-10-11 15:01:20', comment='John...Fort Dix!' where objective_id=3;

update objectives set begun='2018-10-03 09:04:20', completed='2018-10-11 15:01:20', comment='Zero...Fort Dix!' where objective_id=4;

update objectives set begun='2018-10-03 09:04:20', completed='2018-10-11 15:01:20', comment='Where is dha balloon?' where objective_id=5;

update objectives set begun='2018-10-06 09:04:20', completed=NULL, comment='Do one thing, buddy...' where objective_id=6;

update objectives set description='Do PLM analysis', begun=NULL, completed=NULL, comment='' where objective_id=8;

update objectives set begun='2018-10-06 09:04:20', completed=NULL, comment='Ay, me lads...' where objective_id=9;
