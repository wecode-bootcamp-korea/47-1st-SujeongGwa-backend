-- migrate:up
ALTER TABLE order_detail
CHANGE COLUMN products_id product_id INT NOT NULL;

-- migrate:down

