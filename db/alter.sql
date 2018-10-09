ALTER TABLE tasks
RENAME TO objectives;

ALTER TABLE objectives
RENAME COLUMN task_id TO objective_id;
