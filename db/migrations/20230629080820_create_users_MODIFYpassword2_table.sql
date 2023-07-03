-- migrate:up
ALTER TABLE users MODIFY COLUMN password VARCHAR(200) NOT NULL;

-- migrate:down

