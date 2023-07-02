-- migrate:up
ALTER TABLE orders
ADD INDEX idx_order_number (order_number);

ALTER TABLE orders
ADD INDEX idx_total_price (total_price);

-- migrate:down

