-- migrate:up
ALTER TABLE users
ADD COLUMN point DECIMAL(10, 2) NULL;

-- migrate:down

