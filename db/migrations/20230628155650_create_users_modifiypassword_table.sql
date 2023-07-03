-- migrate:up
ALTER TABLE users MODIFY COLUMN password VARCHAR(100) NOT NULL;

-- migrate:down

