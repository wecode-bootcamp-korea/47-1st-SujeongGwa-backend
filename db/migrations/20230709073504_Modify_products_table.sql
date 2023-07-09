-- migrate:up
ALTER TABLE products ADD COLUMN rating decimal(10,1) NULL;

-- migrate:down

