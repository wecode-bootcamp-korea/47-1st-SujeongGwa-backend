-- migrate:up
ALTER TABLE points
MODIFY COLUMN order_order_number VARCHAR(100) NOT NULL;

ALTER TABLE points
MODIFY COLUMN order_total_price DECIMAL NULL;

-- migrate:down

