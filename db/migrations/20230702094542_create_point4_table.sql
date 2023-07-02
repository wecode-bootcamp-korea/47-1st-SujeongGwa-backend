-- migrate:up
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE points
ADD CONSTRAINT FK_points_order_order_number
FOREIGN KEY (order_order_number) REFERENCES orders(order_number);
ALTER TABLE points
ADD CONSTRAINT FK_points_order_total_price
FOREIGN KEY (order_total_price) REFERENCES orders(total_price); 

-- migrate:down

