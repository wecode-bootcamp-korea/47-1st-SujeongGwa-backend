-- migrate:up
ALTER TABLE users ADD COLUMN point INT NULL;

-- migrate:down

