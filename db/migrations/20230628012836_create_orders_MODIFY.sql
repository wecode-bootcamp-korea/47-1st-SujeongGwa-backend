-- migrate:up
ALTER TABLE orders
MODIFY COLUMN order_number VARCHAR(100) NOT NULL;

-- migrate:down

