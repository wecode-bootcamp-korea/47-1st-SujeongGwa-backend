-- migrate:up
ALTER TABLE order_detail
ADD FOREIGN KEY (product_id) REFERENCES products(id);

-- migrate:down

